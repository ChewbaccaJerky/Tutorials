const Chat = require("./chat");

function ChatUI(socket){
    this.chat = new Chat(socket);
    this.input = document.getElementsByTagName('input')[0];
    this.msgList = document.getElementById('messages');
}

// getInput
ChatUI.prototype.getInput = function(){
    return this.input.value;
};

// sendMsg
ChatUI.prototype.sendMsg = function(){
    this.chat.sendMsg(this.getInput());
};

// addMsg
ChatUI.prototype.addMsg = function() {
    const el = document.createElement('li');
    el.innerText = `<li>${this.getInput()}</li>`;
    this.msgList.appendChild(el);
};




