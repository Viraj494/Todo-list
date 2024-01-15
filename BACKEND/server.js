const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3001 ; 

app.use(express.json());
app.use(cors());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology : true
})
    .then(() => console.log("connected to DB"))
    .catch(console.error);

const Todo = require("./models/Todo");

app.get('/todos', async(req, res) => {
    const todos = await Todo.find();

    res.json(todos);
})

app.post('/todo/new', (req, res) =>{
    const todo = new Todo({
        text: req.body.text
    });

    todo.save();

    res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id);

    res.json(result);
})

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);

    todo.complete = !todo.complete;

    todo.save();

    res.json(todo);
})

app.listen(PORT, () => console.log(`server startted on port ${PORT}`));