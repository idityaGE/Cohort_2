import { Router } from "express";
import { createTodoSchema } from "../../validation/types";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { auth } from "../../middleware/auth";


const todoRouter = Router();
const prisma = new PrismaClient();
const jwtPass = process.env.JWT_SECRET as string;

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
    Todos: todos
  })
}))

todoRouter.use((error: any, req: Request, res: Response, next: NextFunction) => {
  handleError(res, error, "An unexpected error occurred");
});

export default todoRouter;


