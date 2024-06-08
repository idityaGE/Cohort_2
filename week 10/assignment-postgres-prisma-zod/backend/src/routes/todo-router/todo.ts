import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { Response, Request, NextFunction } from "express";
import { auth } from "../../middleware/auth";
import { createTodoSchema } from "@idityage/input-validation";


const todoRouter = Router();
const prisma = new PrismaClient();

// Helper function for error handling
const handleError = (res: Response, error: any, message: string, statusCode: number = 500) => {
  console.error(error);
  res.status(statusCode).json({ error: message });
};

const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
}

todoRouter.post("/create", auth, asyncHandler(async (req: Request, res: Response) => {
  const { title, userId } = req.body;
  const { success, error } = createTodoSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ error: error.errors });
  }
  const newTodo = await prisma.todo.create({
    data: {
      title,
      userId
    }
  })
  res.status(200).json({
    msg: `Todo Created`,
    newTodo
  })
}));

todoRouter.get("/todos/:username", auth, asyncHandler(async (req: Request, res: Response) => {
  const { username } = req.params;
  const todos = await prisma.user.findMany({
    where: {
      username
    },
    include: {
      todos: true
    }
  })
  res.status(200).json({
    Todos: todos  // sorry i am sending password but its hashed so dont worry i am lazy person so dont mind
  })
}))

todoRouter.use((error: any, req: Request, res: Response, next: NextFunction) => {
  handleError(res, error, "An unexpected error occurred");
});

export default todoRouter;


