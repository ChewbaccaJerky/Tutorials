// environmental variables
require('dotenv').config();
// imports
const mongoose = require('mongoose');
const express = require('express');
const app = express();


const config = require('./config/config.js');

// database setup
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', (err) => { console.error(err); });
db.once('open', function () {
    console.log('connected to Database');
});

// set config
config(app, express);

const PORT = process.env.PORT;
app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`);
});