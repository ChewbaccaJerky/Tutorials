const express = require("express"),
      app = express(),
      port = process.env.PORT || 3000,
      mongoose = require("mongoose"),
      Todo = require("./api/models/Todo"),
      bodyParser = require("body-parser");

// Mongoose instance url connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/TodoDB");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./api/routes/TodosRoute');
routes(app);
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found!'});
});
app.listen(port);

console.log("Todo List Restful API is on PORT 3000");