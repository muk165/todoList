const router = require('express').Router();
const Todo = require('../models/todo');


router.get('/', function (req, res) {

    Todo.find({}).then(function (results) {
        console.log(results);

        let todos = results.filter(function (todo) { return !todo.done })
        let donetodos = results.filter(function (todo) { return todo.done })

        res.render('index', { todos: todos, donetodos: donetodos });
    })


});


router.post('/todos', function (req, res) {

    let new_todo = new Todo({ description: req.body.description });

    new_todo.save()
        .then(function (result) { console.log(result); res.redirect('/') })
        .catch(function (err) { console.log(err); res.redirect('/') });

});


router.post('/todos/:id/completed', function (req, res) {

    let todoId = req.params.id;

    Todo.findById(todoId)
        .exec()
        .then(function (result) { result.done = !result.done; return result.save(); })
        .then(function (result) { res.redirect('/'); })

})

module.exports = router; 