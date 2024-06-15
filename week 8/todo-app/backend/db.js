import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://admin:Aditya%404491@cluster0.ym43zx8.mongodb.net/todo");
}
connectDB().then(res => console.log("Connected to db")).catch(err => console.log(err));

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);

export { Todo };

