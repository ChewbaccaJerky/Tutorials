const io = require("socket.io");
const PORT = 3000;

let chat;
let guestNum = 0;
const nicknames = {};
const currentRoom = {};
let namesUsed = [];


const chatServer = {
    joinRoom(socket, room="Lobby"){
        socket.join(room);
        currentRoom[socket.id] = room;
    },
    handleChangeRoom(socket, room){
        socket.leave(currentRoom[socket.id]);
        socket.join(room);
    },
    assignTempGuestName(socket){
        const tempName = `guest_${guestNum}`;
        nicknames[socket.id] = tempName;
        namesUsed.push(tempName);
        socket.emit("assignedTempName", `Name has been assigned to ${tempName}`);
    },
    handleNicknameChangeRequest(socket) {
        socket.on("nameAttempt", (name) => {
            console.log("nameAttempt");
            // if name starts with guest return false
            if(name.toLowerCase().startsWith("guest")){
                socket.emit("nameResult", 
                    { success: false,
                      message: "Names cannot start with 'guest'"
                    });
            }
            else {
                // if name is not in usedNames return success
                if(!namesUsed.includes(name)) {
                    const prevName = nicknames[socket.id];
                    const prevIdxName = namesUsed.indexOf(prevName);

                    // change nickname
                    nicknames[socket.id] = name;
                    
                    socket.emit("nameResult", 
                        {
                            success: true,
                            name
                        });
                }
                // else name is in usedNames return false
            }
        });
    },

    listen(server){
        
        chat = io(server);

        chat.on('connection', (socket)=>{
            socket.emit('connected', "Connected!!!");
            guestNum += 1;
            this.assignTempGuestName(socket);
            this.handleNicknameChangeRequest(socket);

            socket.on('message', data=>{
                // emit message to everyone
                socket.to(currentRoom[socket.id]).emit('addMessage', {message: `${nicknames[socket.id]}: ${data.message}`});
            });

            socket.on("disconnect", ()=>{
                const prevName = nicknames[socket.id];
                const prevIdx = namesUsed.indexOf(prevName);

                delete nicknames[socket.id];
                namesUsed = namesUsed.splice(0, prevIdx-1).concat(namesUsed.splice(prevIdx+1));
            });
        });
    },
};

module.exports = chatServer;