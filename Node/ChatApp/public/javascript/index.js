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

    // Listen to when a input is submitted
    const button = document.getElementsByTagName("button")[0];
    button.addEventListener("click", e => {
        e.preventDefault();
        myChatUI.processUserInput();
    });


    // Listen to when temp name is assigned
    socket.on("assignedTempName", data=>{
        myChatUI.addMsg(data);
    });

    // Listen when name is attempted to change
    socket.on("nameResult", data=>{
        if(data.success) {
            myChatUI.addMsg(`new nickname is ${data.name}`);
        }
        else {
            myChatUI.addMsg(data.message);
        }
    });

    // Listen when message is sent back
    socket.on("addMessage", data=>{
        myChatUI.addMsg(data.message);
    });
});