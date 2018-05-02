const Chat = require("./chat");

function ChatUI(socket){
    this.chat = new Chat(socket);
    this.input = document.getElementsByTagName('input')[0];
    this.msgList = document.getElementById('messages');
    this.roomList = document.getElementById('rooms');
    this.room = document.getElementById('room');
}

// getInput
ChatUI.prototype.getInput = function(){
    return this.input.value;
};

// sendMsg
ChatUI.prototype.sendMsg = function(){
    this.chat.sendMessage(this.getInput(), this.room.textContent);
};

// addMsg
ChatUI.prototype.addMsg = function(msg) {
    const el = document.createElement('li');
    el.innerText = `${msg}`;
    this.msgList.appendChild(el);
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
