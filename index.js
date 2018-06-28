<<<<<<< HEAD
 var http = require('http');
  var io = require('socket.io');
  var port = process.env.port || 1337;
  var server = http.createServer(function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Hello World 2n');
  }).listen(port);

  var socket = io.listen(server); 
  socket.on('connection', function (client) {
      client.on('join', function (data) {
          console.log(data.user + ' : ' + data.roomname);
          client.leave(client.room);
          client.join(data.roomname);
          client.room = data.roomname;

      });

      client.on('chat', function (data) {
          console.log(data.user + ' : ' + data.msg + ' : ' + data.date);

          socket.sockets.in(client.room).emit('chat', data);
      });

      client.on('disconnect', function () {
      });
  })
=======
var http = require('http');

var server = http.createServer(function(request, response) {

    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World!");

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);
var io = require('socket.io')(server, { transports: ['websocket'] });

//io.attach(server, {
//    pingInterval: 10000,
//    pingTimeout: 5000,
//    cookie: false
//});


io.on('connection', function (client) {
    console.log('己傍利栏肺 目池记');
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
>>>>>>> 9cb9606... Ha..
