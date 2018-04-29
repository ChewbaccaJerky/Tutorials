const io = require("socket.io");
const PORT = 3000;

const chatServer = {
    listen(server){
        const chat = io(server);

        chat.on('connection', (socket)=>{
            console.log("connected!");
        });
    },
};

module.exports = chatServer;