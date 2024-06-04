import { Router } from "express";
import { auth } from "../../middleware/auth";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { signupSchema, signinSchema } from "../../validation/types";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';




const userRouter = Router();
const jwtPass = process.env.JWT_SECRET as string;

userRouter.post("/signup", async (req:Request, res: Response) => {
  const { username, password, email } = req.body;
  const { success, data, error } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ error: error.errors });
  }
  // check if user already exists
  const prisma = new PrismaClient();
  try {
    const exitingUser = await prisma.user.findUnique({ where: { username } });
    if (exitingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to find user" });
  }
  try {
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    // code to create a new user
    const token = jwt.sign({ username }, jwtPass);
    const newUser = await prisma.user.create({
      data: {
        username,
        password_hash,
        email,
      },
    });
    res.status(201).json({ token, user: newUser });
  } catch (error) {
    return res.status(500).json({ error: "Unable to create user" });
  } finally {
    await prisma.$disconnect();
  }
})