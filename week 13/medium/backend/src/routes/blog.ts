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

blog.put('/:id', async (c) => {
  const prisma = c.get('prisma')
  const userId = c.get('userId') as string
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
    console.log(body)
    const post = await prisma.post.update({
      where: {
        id: c.req.param('id'),
        authorId: userId
      },
      data: {
        title: body.title || undefined,
        content: body.content || undefined,
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

blog.delete('/delete/:id', async (c) => {
  const prisma = c.get('prisma')
  const userId = c.get('userId') as string
  try {
    const post = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        posts: {
          deleteMany: {
            id: c.req.param('id')
          }
        }
      }
    })
    return c.json({
      msg: 'post deleted',
    })
  } catch (error) {
    c.status(500)
    return c.json({
      msg: 'error while deleting post',
      error: (error as Error).message
    })
  }
})

blog.put('/publish/:id', async (c) => {
  const prisma = c.get('prisma')
  const userId = c.get('userId') as string
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: c.req.param('id')
      }
    })
    const updatedPost = await prisma.post.update({
      where: {
        id: c.req.param('id'),
        authorId: userId
      },
      data: {
        published: !post?.published
      }
    })
    return c.json(updatedPost)
  } catch (error) {
    c.status(500)
    return c.json({
      msg: 'error while publishing post',
      error: (error as Error).message
    })
  }
})

export default blog