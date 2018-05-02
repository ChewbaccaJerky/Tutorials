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

ChatUI.prototype.processUserInput = function(){
    const input = this.getInput();
    // checks if input starts with '/'<input>
    if(input.match(/^\/w+/).length > 0) {
        this.chat.processCommand(input);
    }
    else {
        this.sendMsg();
        this.addMsg();
    }
};

module.exports = ChatUI;


