const io = require("socket.io");
const PORT = 3000;

let chat;
let guestNum = 0;
const nicknames = {};
const currentRoom = {};
let namesUsed = [];


const chatServer = {
    getRooms(socket){
        const rooms = {};

        for (let room in currentRoom) {
            rooms[currentRoom[room]] = 1;
        }

        const roomNames = Object.keys(rooms);

        socket.emit("roomResult", { rooms: roomNames, currentRoom: currentRoom[socket.id] });
    },
    joinRoom(socket, room="Lobby"){
        socket.join(room);
        currentRoom[socket.id] = room;
    },
    leaveRoom(socket){
        const room = currentRoom[socket.id];
        socket.to(room).emit('addMessage', {message: `${nicknames[socket.id]} has left`});
        socket.leave(room);
        delete currentRoom[socket.id];
    },
    handleChangeRoom(socket){
        socket.on('joinRoom', room => {
            this.leaveRoom(socket);
            this.joinRoom(socket, room);
            socket.to(room).emit("addMessage", {message: `${nicknames[socket.id]} has joined`});
        });
    },
    assignTempGuestName(socket){
        const tempName = `guest_${guestNum}`;
        nicknames[socket.id] = tempName;
        namesUsed.push(tempName);
        socket.emit("assignedTempName", `You have been assigned to ${tempName}`);
    },
    handleNicknameChangeRequest(socket) {
        socket.on("nameAttempt", (name) => {
            // if name starts with guest return false
            const room = currentRoom[socket.id];
            if(name.toLowerCase().startsWith("guest")){ 
                socket.to(room).emit("nameResult", 
                    { 
                        success: false,
                        message: "Names cannot start with 'guest'"
                    });
            }
            else {
                // if name is not in usedNames return success
                if(!namesUsed.includes(name)) {
                    const prevName = nicknames[socket.id];
                    const prevIdxName = namesUsed.indexOf(prevName);
                    
                    // change nickname
                    delete nicknames[socket.id];
                    nicknames[socket.id] = name;
                    namesUsed.push(name);

                    // remove old nickname from names used and nicknames
                    const idx = namesUsed.indexOf(prevName);
                    namesUsed = namesUsed.splice(0, idx - 1).concat(namesUsed.splice(idx+1));

                    socket.to(room).emit("nameResult", 
                        {
                            success: true,
                            name,
                            prevName
                        });
                }
            }
        });
    },

    listen(server){
        
        chat = io(server);

        chat.on('connection', (socket) => {
            socket.emit('connected', "Connected!!!");

            guestNum++;

            this.assignTempGuestName(socket);
            this.handleNicknameChangeRequest(socket);
            this.handleChangeRoom(socket);
            this.joinRoom(socket);
            this.getRooms(socket);

            socket.on('message', (data) => {
                const room = currentRoom[socket.id];
                socket.to(room).emit('addMessage', { message: data.message, from: nicknames[socket.id]});
            });

            socket.on('rooms', ()=>{
                this.getRooms(socket);
            });
            
            
            socket.on("disconnecting", () => {
                this.leaveRoom(socket);

                const prevName = nicknames[socket.id];
                const prevIdx = namesUsed.indexOf(prevName);

                delete nicknames[socket.id];
                namesUsed = namesUsed.splice(0, prevIdx-1).concat(namesUsed.splice(prevIdx+1));
            });
        });
    },
};

module.exports = chatServer;