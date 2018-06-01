// environmental variables
require('dotenv').config();

// dependecy import
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// internal import
const config = require('./config/config.js');
const createRoutes = require('./routes/root.js');

// database setup
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', (err) => { console.error(err); });
db.once('open', function () {
console.log('connected to Database');
});

// set config
config(app, express);

//create routes
createRoutes(app);

const PORT = process.env.PORT;
app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`);
});