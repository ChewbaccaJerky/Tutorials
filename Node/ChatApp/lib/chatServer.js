const io = require("socket.io");
const PORT = 3000;

let chat;
let guestNum = 1;
const nicknames = {};
const namesUsed = [];

const chatServer = {
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

                    // remove name from nicknames and namesUsed
                    delete nicknames[socket.id];
                    
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
            this.assignTempGuestName(socket);
            this.handleNicknameChangeRequest(socket);

            socket.on("disconnect", ()=>{
                const prevName = nicknames[socket.id];
                const prevIdx = namesUsed.indexOf(prevName);

                delete nicknames[socket.id];
                namesUsed = namesUsed.splice(0, prevIdx-1).concat(namesUsed.split(prevIdx+1));
            });
        });
    },
};

module.exports = chatServer;