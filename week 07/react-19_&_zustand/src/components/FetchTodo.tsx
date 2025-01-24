import axios from 'axios'
import { use } from 'react'

const url = 'https://jsonplaceholder.typicode.com/todos/1'
const getTodo = async (url: string) => {
  const res = await axios.get(url)
  return res.data
}

const FetchTodo = () => {
  const data = use(getTodo(url))
  console.log(data)
  return (
    <div>
      <h1>Fetch Todo</h1>
      <p>{data.title}</p>
    </div>
  )
}

export default FetchTodo