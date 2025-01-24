import { useQueries } from "@tanstack/react-query"
import axios from "axios"

const fetchTodo = async (id: number) => {
  const { data } = await axios(`https://jsonplaceholder.typicode.com/todos/${id}`)
  return data
}

const fetchUser = async (userId: number) => {
  const { data } = await axios(`https://jsonplaceholder.typicode.com/users/${userId}`)
  return data
}

const MultipleQueries = () => {
  const [todo, user] = useQueries({
    queries: [
      {
        queryKey: ["todo"],
        queryFn: () => fetchTodo(1)
      },
      {
        queryKey: ["user"],
        queryFn: () => fetchUser(1)
      }
    ]
  })

  // you can handle them independatnly
  if (todo.isLoading || user.isLoading) return <div>Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold">Multiple Queries</h1>
      <div>
        <h2>Todo</h2>
        <pre>{JSON.stringify(todo.data, null, 2)}</pre>
      </div>
      <div>
        <h2>User</h2>
        <pre>{JSON.stringify(user.data, null, 2)}</pre>
      </div>
    </div>
  )
}

export default MultipleQueries