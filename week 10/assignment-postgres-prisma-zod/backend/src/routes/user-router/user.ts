import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import { signupSchema, signinSchema } from "../../validation/types";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const userRouter = Router();
const prisma = new PrismaClient();
const jwtPass = process.env.JWT_SECRET as string;

// Helper function for error handling
const handleError = (res: Response, error: any, message: string, statusCode: number = 500) => {
  console.error(error);
  res.status(statusCode).json({ error: message });
};

// Async middleware for error handling
const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

userRouter.post("/signup", asyncHandler(async (req: Request, res: Response) => {
  const { username, password, email } = req.body;
  const { success, error } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ error: error.errors });
  }

  const existingUser = await prisma.user.findUnique({ where: { username } });
  if (existingUser) {
    return res.status(400).json({ error: "Username already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const password_hash = await bcrypt.hash(password, salt);
  const token = jwt.sign({ username }, jwtPass);

  const newUser = await prisma.user.create({
    data: {
      username,
      password_hash,
      email,
    },
  });

  res.status(201).json({ token, user: newUser });
}));

userRouter.post("/signin", asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const { success, error } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ error: error.errors });
  }

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid password" });
  }

  const token = jwt.sign({ username }, jwtPass, { expiresIn: '1h' });
  res.status(200).json({ token, user });
}));

// Global error handler
userRouter.use((error: any, req: Request, res: Response, next: NextFunction) => {
  handleError(res, error, "An unexpected error occurred");
});

export default userRouter;
