const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const io = socketIO(server);

const router = require('./router');

app.use(router);

const rooms = ['room1', 'room2'];

const joinToRooms = socket => {
	rooms.forEach(room => {
		socket.join(room);
	});
};

io.on('connection', function connectionHandler(socket) {

	joinToRooms(socket);

	socket.on('message', (room, message) => {
		io.in(room).emit('new-message', room, message);
	});

	socket.on('join-to-room', (room) => {

	});

});

const PORT = process.env.PORT || 3000;

server.listen(PORT,
		() => console.log(`Example app listening on port ${ PORT }!`));


