import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

const fetchTodo = async (currentPage: number = 1, pageSize: number = 10) => {
  const data = await axios.get(`
    https://jsonplaceholder.typicode.com/todos?_page=${currentPage}&_limit=${pageSize}
  `)
  return data.data
}

const Pagination = () => {
  const [currPage, setCurrPage] = useState(1)
  const pagesize = 10

  const { data, error, isLoading } = useQuery({
    queryKey: ['todos', currPage],
    queryFn: () => fetchTodo(currPage, pagesize)
  })

  if (isLoading) return <h1>Loading...</h1>
  if (error) return <h1>Error : {error.message}</h1>

  return (
    <div>
      <h1>Pagination Demo</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => setCurrPage(p => p - 1)}>Previous</button>
      <br />
      <button onClick={() => setCurrPage(p => p + 1)}>Next</button>
    </div>
  )
}

export default Pagination