import { Hono } from 'hono'
import { Environment } from '../config/types'



//! Blog Routes
const blog = new Hono<Environment>().basePath('/blog')

blog.post('/', async (c) => {
  const prisma = c.get('prisma')
  const userId = c.get('userId') as string
  try {
    const body = await c.req.json()
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId
      }
    })
    return c.json(post)
  } catch (error) {
    c.status(500)
    return c.json({
      msg: 'error while creating post',
      error: (error as Error).message
    })
  }
})

blog.put('/', async (c) => {
  const prisma = c.get('prisma')
  const userId = c.get('userId') as string
  try {
    const body = await c.req.json()
    const post = await prisma.post.update({
      where: {
        id: body.id,
        authorId: userId
      },
      data: {
        title: body.title,
        content: body.content,
      }
    })
    return c.json(post)
  } catch (error) {
    c.status(500)
    return c.json({
      msg: 'error while updating post',
      error: (error as Error).message
    })
  }
})

blog.get('/get/:id', async (c) => {
  const prisma = c.get('prisma')
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: c.req.param('id')
      }
    })
    return c.json(post)
  } catch (error) {
    c.status(500)
    return c.json({
      msg: 'error while fetching post',
      error: (error as Error).message
    })
  }
})

blog.get('/bulk', async (c) => {
  const userId = c.get('userId') as string
  console.log(userId)
  const prisma = c.get('prisma')
  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: userId
      }
    })
    return c.json(posts)
  } catch (error) {
    c.status(500)
    return c.json({
      msg: 'error while fetching posts',
      error: (error as Error).message
    })
  }
})

export default blog