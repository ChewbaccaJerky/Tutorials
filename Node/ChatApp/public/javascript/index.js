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
            const msg = `${data.prevName} new nickname is ${data.name}`;
            socket.emit('message', {message: msg});
            myChatUI.sendMsg(msg);
        }
        else {
            myChatUI.sendMsg(data.message);
        }
    });

    // Listen when message is sent back
    socket.on("addMessage", data=>{
        myChatUI.addMsg(data.message);
    });

    
});