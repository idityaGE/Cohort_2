import { z } from 'zod';

const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
});

const signinSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
});

const createTodoSchema = z.object({
  title: z.string().min(3),
  userId: z.number(),
});

export { signupSchema, signinSchema, createTodoSchema }
