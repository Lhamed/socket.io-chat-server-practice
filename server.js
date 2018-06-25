'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);

var io = require('socket.io');
var socket = io.listen(server);
1  io.on('connection', function (client) {
    client.on('join', function (data) {
        console.log(data.user + ' : ' + data.roomname);

        client.leave(client.room);
        client.join(data.roomname);
        client.room = data.roomname;
        console.log('己傍利栏肺 立加');
    });

    client.on('chat', function (data) {
        console.log(data.user + ' : ' + data.msg + ' : ' + data.date);

        socket.sockets.in(client.room).emit('chat', data);
    });

    client.on('disconnect', function () {
    });
})