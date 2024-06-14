const express = require('express')
const app = express()
const server = require('http').Server(app)
const IO = require('socket.io')(server);
const { getIO, initIO } = require('./video')
const host = '192.168.1.36'


IO.use((socket, next) => {
    if (socket.handshake.query) {
        let callerId = socket.handshake.query.callerId;
        socket.user = callerId;
        next();
    }
});

IO.on("connection", (socket) => {
    console.log(socket.user, "Connected");
    socket.join(socket.user);

    socket.on("call", (data) => {
        let calleeId = data.calleeId;
        let rtcMessage = data.rtcMessage;
        console.log('test---->',rtcMessage)

        socket.to(calleeId).emit("newCall", {
            callerId: socket.user,
            rtcMessage: rtcMessage,
        });
    });

    socket.on("answerCall", (data) => {
        let callerId = data.callerId;
        rtcMessage = data.rtcMessage;

        socket.to(callerId).emit("callAnswered", {
            callee: socket.user,
            rtcMessage: rtcMessage,
        });
    });

    socket.on("ICEcandidate", (data) => {
        console.log("ICEcandidate data.calleeId", data.calleeId);
        let calleeId = data.calleeId;
        let rtcMessage = data.rtcMessage;
        console.log("socket.user emit", socket.user);

        socket.to(calleeId).emit("ICEcandidate", {
            sender: socket.user,
            rtcMessage: rtcMessage,
        });
    });
    socket.on('chat-message', function (msg) {
        console.log('message is :', msg);
        IO.emit('chat-message', msg)
    })
});



server.listen(9000, () => console.log('listening at 9000'))