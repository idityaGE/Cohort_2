import express from 'express';
import { createTodo, updateTodo } from './types';
import mongoose from 'mongoose';
import { Todo } from './db';
import cors from 'cors';


// server
const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
    {
        origin: "http://localhost:5173" // this will allow only this frontend to make requests to this backend server
    }
)); // cors middleware allows us to make requests from frontend to backend otherwise we will get cors error

// Routes
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.post('/todo', async (req, res) => {
    const todo = createTodo.safeParse(req.body);
    console.log(todo);
    if (!todo.success) {
        res.status(400).json({ error: "Your sent the wrong input" });
        return;
    }
    const { data } = todo;
    // res.json({ data });
    // save this todo to database
    try {
        await Todo.create({
            title: data.title,
            description: data.description
        });
        res.json({ message: "Todo saved to db" })
    } catch (error) {
        return res.status(500).json({ error: "Todo saving to db failed" });
    }
})

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find()
        res.json({ data: todos });
    } catch (error) {
        res.status(500).json({ error: "Fetching todos failed" });
    }
})

app.put('/completed', async (req, res) => {
    const todo = updateTodo.safeParse(req.body);
    console.log(todo);
    if (!todo.success) {
        res.status(400).json({ error: "Your sent the wrong input" });
        return;
    }
    const { data } = todo;
    // res.json({ data });
    // update this todo to database
    try {
        await Todo.updateOne({
            _id: data.id
        }, {
            completed: true
        });
        res.json({ message: "Todo updated to db" })
    } catch (error) {
        return res.status(500).json({ error: "Todo updating to db failed" });
    }
})


