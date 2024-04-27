var express = require('express');
var router = express.Router();
const todoController = require('../controllers/todoController')

/* GET home page. */
router.post('/',  todoController.createTodo);
router.get('/', todoController.getTodos);
router.get('/:id', todoController.getTaskById);
router.patch('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
