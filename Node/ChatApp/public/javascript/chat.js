

class Chat {
    constructor(socket){
        this.socket = socket;
    }

    sendMessage(message){
        this.socket.emit('message', message);
    }
}

export default Chat;