const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const toDoItem = new Schema({
    title: String,
    done: Boolean,
    dueDate: Date,
});


module.exports = mongoose.model("ToDo", toDoItem);
