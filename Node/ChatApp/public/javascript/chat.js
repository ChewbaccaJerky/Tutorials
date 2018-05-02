
function Chat(socket) {
    this.socket = socket;
}

Chat.prototype.sendMessage = function(message) {
    this.socket.emit('message', {message: message});
};

Chat.prototype.processCommand = function(command) {
    // parse command
    const words = command.split(" ");
    let parseCMD = "";
    if(words[0].includes("/")){
        parseCMD = words[0].splice(1);
    }
    
    switch(parseCMD) {
        case "nick":
            this.socket.emit("nameAttempt", words[2]);
            this.socket.on("nameResult", data=>{
                if(data.success){
                    // change UI nickname
                    console.log(data);
                }
                else {
                    // send error
                    console.log(data);
                }
            });
            break;
        default:
            break;
    }
};

module.exports = Chat;