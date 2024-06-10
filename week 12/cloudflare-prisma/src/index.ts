import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient({
  datasourceUrl: "prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMjg4MzU1YTEtMjFhYi00Mzc4LTk0NjAtOTQ4YmQzZDhmODRhIiwidGVuYW50X2lkIjoiNjdmY2E4YWJiMGYxNGE3MTBhMTA0Yzg0OThmYmQ1OTY3MTYxYWFmYzc2MTg5MDhkMjZhMjFiMGE3MzQyNzNkZSIsImludGVybmFsX3NlY3JldCI6ImQ1ZDk5YzAyLTQ2OWYtNDU2My04NzgzLWUzYzAwODJkMzgwNSJ9.z-oJBQXbgqR4725W1CUBhj25vxC31mxIadQbQb89lXw",
}).$extends(withAccelerate())

const app = new Hono()

app.get('/', async (c) => {
  await prisma.log.create({
    data: {
      level: 'INFO',
      message: 'Hello World',
      metadata: {
        header: 'Auth',
      }
    }
  })
  return c.text('Hello World')
})

export default app
