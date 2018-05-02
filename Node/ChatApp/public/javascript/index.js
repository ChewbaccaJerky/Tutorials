const io = require('socket.io-client');


// console.dir(io);

const socket = io.connect('http://localhost:8000');
const Chat = new require('./chat');
const ChatUI = new require('./chatUI');

// When all elements are loaded
document.addEventListener("DOMContentLoaded", ()=>{
    const myChat = new Chat(socket);
    const myChatUI = new ChatUI(socket);
    
    // TODO: for testing only
    window.myChat = myChat;
    window.myChatUI = myChatUI;
    
    // Add Event Listeners
    const button = document.getElementsByTagName("button")[0];
    button.addEventListener("click", e => {
        e.preventDefault();
        myChatUI.processUserInput();
    });

    socket.on("nameResult", data=>{
        if(data.success) {
            myChatUI.addMsg(`>: new nickname is ${data.name}`);
        }
        else {
            myChatUI.addMsg(data.message);
        }
    });
});