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
    this.chat.sendMessage(this.getInput());
};

// addMsg
ChatUI.prototype.addMsg = function() {
    const el = document.createElement('li');
    el.innerText = `${this.getInput()}`;
    this.msgList.appendChild(el);
};

// processUserInput
ChatUI.prototype.processUserInput = function(){
    const input = this.getInput();
    
    // checks if input starts with '/'<input>
    if(input.match(/^\/w+/)) {
        this.chat.processCommand(input);
    }
    else {
        this.sendMsg();
        this.addMsg();
        this.input.value = "";
        this.input.focus();
    }
};

module.exports = ChatUI;


