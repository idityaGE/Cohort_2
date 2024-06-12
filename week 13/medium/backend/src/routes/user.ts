import { Hono } from "hono"
import { sign } from "hono/jwt"
import { Environment } from '../config/types'
import { PrismaClient } from "@prisma/client"


const user = new Hono<Environment>().basePath('/user')
//! Signup Route
user.post('/signup', async (c) => {
  const prisma = c.get('prisma') as PrismaClient
  try {
    const { email, password, name } = await c.req.json()
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
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
  } finally {
    await prisma.$disconnect()
  }
})

//! Signin Route
user.post('/signin', async (c) => {
  const prisma = c.get('prisma') as PrismaClient
  try {
    const { email, password } = await c.req.json()
    const user = await prisma.user.findFirst({
      where: {
        email,
        password
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
  } finally {
    await prisma.$disconnect()
  }
})

export default user