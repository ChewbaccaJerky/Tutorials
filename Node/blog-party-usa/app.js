// SET VARIABLES
require('dotenv').config();
const express = require('express');
const app = express();

const config = require('./config/config.js');

const createRoutes = require('./routes/root.js');
const PORT = process.env.PORT;

// set config
config(app, express);

//create routes
createRoutes(app);

app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`);
});