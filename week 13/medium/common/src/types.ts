import { z } from 'zod';

//! user types
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(3).optional(),
});

const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

//! post types
const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

const updatePostSchema = z.object({
  id: z.string(),
  title: z.string().min(3).optional(),
  content: z.string().min(10).optional(),
});

type SignupSchema = z.infer<typeof signupSchema>;
type SigninSchema = z.infer<typeof signinSchema>;
type CreatePostSchema = z.infer<typeof createPostSchema>;
type UpdatePostSchema = z.infer<typeof updatePostSchema>;

export {
  SignupSchema,
  SigninSchema,
  CreatePostSchema,
  UpdatePostSchema,
  signupSchema,
  signinSchema,
  createPostSchema,
  updatePostSchema,
}