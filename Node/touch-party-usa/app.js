// SET VARIABLES
require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const app = express();
const PORT = process.env.PORT;

// middleware
app.use(morgan('combined'));

app.get('/', (req, res)=>{
    res.end('hey what is good?');
});

app.listen(PORT, function(){
    console.log(`listening on port ${PORT}`);
});