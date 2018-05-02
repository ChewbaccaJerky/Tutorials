const io = require('socket.io-client');


// console.dir(io);

const socket = io.connect('http://localhost:8000');
const Chat = new require('./chat');
const ChatUI = new require('./chatUI');

// When all elements are loaded
document.addEventListener("DOMContentLoaded", ()=>{
    const myChat = new Chat(socket);
    const myChatUI = new ChatUI(socket);
    window.myChat = myChat;
    window.myChatUI = myChatUI;
    
    // Add Event Listeners
    const button = document.getElementsByTagName("button")[0];
    button.addEventListener("click", e => {
        e.preventDefault();
        myChatUI.processUserInput();
    });
});