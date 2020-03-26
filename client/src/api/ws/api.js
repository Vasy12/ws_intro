import {chatSocket} from './index.js';

export const emitTest = (data) => chatSocket.emit('test', data);
export const emitMessage = (room, message) => chatSocket.emit('message', room,
		message);
export const emitJoinToRoom = (room) => chatSocket.emit('join-to-room', room);


