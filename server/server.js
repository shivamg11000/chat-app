const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const moment = require('moment');


io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
        io.emit('chat message', {
            nickname: data.nickname,
            msg: data.msg,
            timestamp: moment().format("LT")
        });
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});