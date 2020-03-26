const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const io = socketIO(server);

const router = require('./router');

app.use(router);

io.on('connection', function connectionHandler(socket) {

	socket.broadcast.emit('new-user', socket.id);

	socket.on('send-message', (to, message) => {

		message.author = socket.id;

		socket.to(to).emit('private-message', message);

	});

	socket.on('get-users', () => {
		io.clients((error, clients) => {
			if (error) {
				throw error;
			}
			const users = [...clients];
			console.log(users);
			users.splice(users.indexOf(socket.id), 1);

			socket.emit('get-users', users);
		});
	});

	socket.on('disconnect', () => {

		io.emit('user-leave', socket.id);

	});

});

const PORT = process.env.PORT || 3000;

server.listen(PORT,
		() => console.log(`Example app listening on port ${ PORT }!`));


