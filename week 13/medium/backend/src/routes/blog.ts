import { Hono } from 'hono'
import { Environment } from '../config/types'





//! Blog Routes
const blog = new Hono<Environment>().basePath('/blog')

blog.post('/', async (c) => { })
blog.put('/', async (c) => { })
blog.get('/:id', async (c) => { })
blog.get('/bulk', async (c) => { })

export default blog