import socket from './index.js';

export const emitTest = (data, options) => socket.emit('test', data, options);
export const emitMessage = (room, message) => socket.emit('message', room, message);
