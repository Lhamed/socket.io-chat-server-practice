
var http = require('http');
var port = process.env.PORT || 80;
var io = require('socket.io')({
    transports: ['websocket'],
});

const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);



io.attach(server, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});


io.on('connection', function (client) {
    client.on('join', function (data) {
        console.log(data.user + ' : ' + data.roomname);

        client.leave(client.room);
        client.join(data.roomname);
        client.room = data.roomname;
        console.log('己傍利栏肺 立加');
    });

    client.on('chat', function (data) {
        console.log(data.user + ' : ' + data.msg + ' : ' + data.date);

        io.sockets.in(client.room).emit('chat', data);
    });

    client.on('disconnect', function () {
    });
})