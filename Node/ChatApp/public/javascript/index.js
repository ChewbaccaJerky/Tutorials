const io = require('socket.io-client');


// console.dir(io);

const socket = io.connect('http://localhost:8000');
const chat = new require('./chat')(socket);
const chatUI = new require('./chatUI')(socket);
