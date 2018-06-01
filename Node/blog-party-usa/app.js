// environmental variables
require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();

// internal import
const config = require('./config/config.js');
const createRoutes = require('./routes/root.js');
const Blog = require('./model/blog.js');
const seedDB = require('./seeds/seed.js');

// database setup
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on('error', (err) => { console.error(err); });
db.once('open', function () {
    console.log('connected to Database');
});

// seed database if blogs are empty
Blog.find({}, (err, doc) => {
    if(doc.length === 0) {
        seedDB();
    }
});

// set config
config(app, express);

//create routes
createRoutes(app);

const PORT = process.env.PORT;
app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`);
});