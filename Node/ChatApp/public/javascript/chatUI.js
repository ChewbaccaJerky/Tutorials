const Chat = require("./chat");

function ChatUI(socket){
    this.chat = new Chat(socket);
    // this.input = document.getElementsByTagName('textarea')[0];
    this.input = document.getElementsByTagName('input')[0];
    this.msgList = document.getElementById('messages');
    this.roomList = document.getElementById('rooms');
    this.userList = document.getElementById('users');
    this.room = document.getElementById('room');
}


ChatUI.prototype.clearMsgList = function() {
    this.msgList.innerHTML = "";
};

ChatUI.prototype.showUsers = function(users) {
    this.userList.innerHTML = "";
    for(let name in users) {
        const li = document.createElement('li');
        li.innerHTML = `<span>${name}</span>`;
        li.setAttribute('data-id', users[name]);
        this.userList.appendChild(li);
    }
};

ChatUI.prototype.showRooms = function(rooms, currentRoom) {
    this.roomList.innerHTML = "";
    for(let i = 0; i < rooms.length; i++) {
        const li = document.createElement("li");
        li.innerHTML = `<span>${rooms[i]}</span>`;
        if(rooms[i] === currentRoom) {
            li.className = "active";
        }
        this.roomList.appendChild(li);
    }
};

// getInput
ChatUI.prototype.getInput = function(){
    return this.input.value;
};

// sendMsg
ChatUI.prototype.sendMsg = function(){
    this.chat.sendMessage(this.getInput());
};

// addMsg
ChatUI.prototype.addMsg = function(msg, from) {
    const el = document.createElement('li');
    if(from) {
        el.innerHTML = `<span>${from}: ${msg}</span>`;
        el.className = "from";
    }
    else {
        el.innerHTML = `<span>${msg}</span>`;
    }
    
    this.msgList.appendChild(el);
    el.scrollIntoView(false);
};

// processUserInput
ChatUI.prototype.processUserInput = function(){
    const input = this.getInput();
    
    let response;

    // checks if input starts with '/'<input>
    if(input[0] === "/") {
        response = this.chat.processCommand(input);
        if(response) this.addMsg(response);
    }
    else {
        this.sendMsg();
        this.addMsg(input);
    }

    this.input.value = "";
    this.input.focus();
};

module.exports = ChatUI;
