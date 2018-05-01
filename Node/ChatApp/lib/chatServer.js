const io = require("socket.io");
const PORT = 3000;

let chat;

const chatServer = {
    listen(server){
        
        chat = io(server);

        chat.on('connection', (socket)=>{
            // socket.emit('connected', "Connected!!!");
            // console.log(socket);
        });
    },
};

module.exports = chatServer;