import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'


type Bindings = {
  JWT_SECRET: string
  DATABASE_URL: string
}
type Variables = {
  userId: string
  prisma: PrismaClient;
}

const app = new Hono<{ Bindings: Bindings, Variables: Variables }>().basePath('/api/v1')

app.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  c.set("prisma", prisma as unknown as PrismaClient);
  await next();
});

app.use("/blog/*", async (c, next) => {
  const jwt = c.req.header('Authorization')
  if (!jwt) {
    c.status(401)
    return c.json({ msg: 'Unauthorized' })
  }
  try {
    const token = jwt.split(' ')[1]
    const payload = await verify(token, c.env.JWT_SECRET)
    if (!payload) {
      c.status(401)
      return c.json({ msg: 'unauthorized' })
    }
    c.set('userId', payload.id as string);
    await next()
  } catch (error) {
    c.status(401)
    return c.json({ msg: 'unauthorized' })
  }
})


app.post('/blog', async (c) => { })
app.put('/blog', async (c) => { })
app.get('/blog/:id', async (c) => { })
app.get('/blog/bulk', async (c) => { })


const user = new Hono<{ Bindings: Bindings }>().basePath('/user')

//! Signup Route
user.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn'],
  }).$extends(withAccelerate())
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
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn'],
  }).$extends(withAccelerate())
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

app.route('/', user)

export default app