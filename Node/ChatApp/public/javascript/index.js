import io from 'socket.io-client';

// console.dir(io);

var socket = io.connect('http://localhost:8000');

socket.on('connected', (data) => {
    console.log(data);
});

