
function Chat(socket) {
    this.socket = socket;
    this.nickname = "";
}

Chat.prototype.sendMessage = function(message) {
    this.socket.emit('message', {message: message});
};

Chat.prototype.processCommand = function(command) {
    // parse command
    const words = command.split(" ");
    let parseCMD = "";
    if(words[0].match(/^\/\w+/).length > 0){
        parseCMD = words[0].substring(1);
    }
    
    let msg = false;
    switch(parseCMD) {
        case "nick":
            words.shift();
            this.socket.emit("nameAttempt", words.join(" "));
            break;
        default:
            msg = "Unrecognized command!";
    }

    return msg;
};

module.exports = Chat;