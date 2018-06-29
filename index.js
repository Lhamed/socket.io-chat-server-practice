var http = require('http');
var server = http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");
});
var port = process.env.PORT || 1337;
server.listen(port);
console.log("Server running at http://localhost:%d", port);
var io = require('socket.io')(server, { transports: ['websocket'], });
io.on('connection', function (client) {
console.log('connection');
    client.on('join', function (data) {
        console.log(data.user + ' : ' + data.roomname);

        client.leave(client.room);
        client.join(data.roomname);
        client.room = data.roomname;
        io.sockets.in(client.room).emit('join', data);
    });

    client.on('chat', function (data) {
        console.log(data.user + ' : ' + data.msg + ' : ' + data.date);

        io.sockets.in(client.room).emit('chat', data);
    });

    client.on('move', function (data) {
        io.sockets.in(client.room).emit('move', data);
    });

    client.on('disconnect', function () {
        io.sockets.in(client.room).emit('dis');
    });
})
