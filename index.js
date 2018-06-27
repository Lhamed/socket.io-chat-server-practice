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
