// SET VARIABLES
require('dotenv').config();
const morgan = require('morgan');
const pug = require('pug');
const express = require('express');
const app = express();

const createRoutes = require('./routes/root.js');
const PORT = process.env.PORT;

// middleware
app.use(morgan('combined'));
app.use(express.static('public'));

// set engine
app.set('views', 'views');
app.set('view engine', 'pug');

//create routes
createRoutes(app);

app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`);
});