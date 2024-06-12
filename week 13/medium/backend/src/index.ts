import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import user from './routes/user'
import blog from './routes/blog'
import { Environment } from './config/types'

const app = new Hono<Environment>().basePath('/api/v1')

//! Middlewares
app.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    log: ['query', 'info', 'warn'],
  }).$extends(withAccelerate())
  c.set("prisma", prisma as any);
  await next()
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

app.route('/', blog)
app.route('/', user)

export default app