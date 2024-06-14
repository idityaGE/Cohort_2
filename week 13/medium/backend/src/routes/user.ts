import { Hono } from "hono"
import { sign } from "hono/jwt"
import { Environment } from '../config/envirorment'
import { PrismaClient } from "@prisma/client/edge"
import { signupSchema, signinSchema } from "@idityage/medium-types"

const user = new Hono<Environment>().basePath('/user')
//! Signup Route
user.post('/signup', async (c) => {
  const prisma = c.get('prisma') as PrismaClient
  try {
    const body = await c.req.json()
    const { success, error } = signupSchema.safeParse(body)
    if (!success) {
      c.status(400)
      return c.json({
        msg: 'invalid request body',
        error: error
      })
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name || undefined,
      },
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ token })
  } catch (error) {
    c.status(500)
    return c.json({
      msg: "error while signup",
      error: (error as Error).message
    })
  }
})

//! Signin Route
user.post('/signin', async (c) => {
  const prisma = c.get('prisma') as PrismaClient
  try {
    const body = await c.req.json()
    const { success, error } = signinSchema.safeParse(body)
    if (!success) {
      c.status(400)
      return c.json({
        msg: 'invalid request body',
        error: error
      })
    }
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
        password: body.password
      },
    })
    if (!user) {
      c.status(401)
      return c.json({ msg: 'Invalid credentials' })
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({ token })
  } catch (error) {
    c.status(500)
    return c.json({
      msg: "error while signin",
      error: (error as Error).message
    })
  }
})

export default user