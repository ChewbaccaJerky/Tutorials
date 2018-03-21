'use strict';

module.exports = function(app) {
    const TodosController = require('../controllers/TodosController');

    // todo routes
    app.route('/api/todo')
        .get(TodosController.list_all_todos)
        .post(TodosController.create_a_todo);

    app.route('/api/todo/:todoId')
        .get(TodosController.read_a_todo)
        .put(TodosController.update_a_todo)
        .delete(TodosController.delete_a_todo);
};