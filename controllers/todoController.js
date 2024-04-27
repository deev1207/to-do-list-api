// todoController.js

// Import todo model
const Todo = require("../models/todo");

// Controller functions
exports.createTodo = async (req, res) => {
  try {
    const { title, done, dueDate } = req.body;

    // Create a new todo item
    const todo = new Todo({
      title,
      done,
      dueDate,
    });

    // Save the todo item to the database
    await todo.save();

    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(err);
  }
};

exports.getTodos = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page) || 1; // Current page (default: 1)
    const limit = parseInt(req.query.limit) || 10; // Number of items per page (default: 10)
    const skip = (page - 1) * limit; // Calculate the number of items to skip

    // Filtering criteria (example)
    const { title, status } = req.query;
    const filters = {};
    if (title) filters.title = { $regex: new RegExp(title, "i") }; // Case-insensitive title search
    if (status) filters.status = status;

    
    // Fetch all todo items from the database
    const todos = await Todo.find({...filters}).limit(limit).skip(skip);

    res.send(todos);
  } catch (error) {
    res.status(400).send(err);
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const task = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the todo item by ID and delete it
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo item not found" });
    }

    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
};
