import socket from './index.js';

export const emitTest = (data) => socket.emit('test', data);
export const emitMessage = (room, message) => socket.emit('message', room,
		message);
export const emitJoinToRoom = (room) => socket.emit('join-to-room', room);


