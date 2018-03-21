const mongoose = require('mongoose'),
      Todo = mongoose.model('Todo');

exports.list_all_todos = function(req, res) {
    Todo.find({}, function(err, todo){
        if(err) res.send(err);

        res.json(todo);
    });
};

exports.create_a_todo = function(req, res) {
    const newTodo = new Todo(req.body);

    newTodo.save(function(err, todo){
        if(err) res.send(err);

        res.json(todo);
    });
};

exports.read_a_todo = function(req, res) {
    Todo.findById(req.params.todoId, function(err, todo){
        if(err) res.send(err);

        res.json(todo);
    });
};

exports.update_a_todo = function(req, res) {
    Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true}, function(err, todo){
        if(err) res.send(err);

        res.json(todo);
    });
};

exports.delete_a_todo = function(req, res) {
    Todo.remove({
        _id: req.params.todoId
    }, function(err, todo){
        if(err) res.send(err);

        res.json({message: 'Todo was successfully removed'});
    });
};