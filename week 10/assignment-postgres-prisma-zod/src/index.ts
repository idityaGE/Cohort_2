import express from 'express';
import { userRouter } from './routes/user-router/user';
import { todoRouter } from './routes/todo-router/todo';

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRouter);
app.use('/todo', todoRouter);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});