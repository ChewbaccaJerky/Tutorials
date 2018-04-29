const path = require('path');
const express = require('express');
const app = express();
const http = require("http").Server(app);

const PORT = 8000;
const chatServer = require("./lib/chatServer");


// create Create Chat Server
chatServer.listen(http);

// homepage
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, './public/index.html')));

// serving static files
app.use(express.static(path.join(__dirname,'/public')));

http.listen(PORT, ()=>{
    console.log(`Chat App listening on port ${8000}!`);
});
