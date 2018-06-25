var io = require('socket.io')({
    transports: ['websocket'],
});



io.attach( 1337);

io.on('connection', function (socket) {
    socket.on('join', function (data) {
        console.log(data.user + ' : ' + data.roomname);

        socket.leave(socket.room);
        socket.join(data.roomname);
        socket.room = data.roomname;
        console.log('���������� ����');
    });

    socket.on('chat', function (data) {
        console.log(data.user + ' : ' + data.msg + ' : ' + data.date);

        io.sockets.in(socket.room).emit('chat', data);
    });

    socket.on('disconnect', function () {
    });
})