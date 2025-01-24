import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

interface Todo {
  id?: number
  title: string
  completed: boolean
}

const createTodo = async (newTodo: Todo) => {
  const res = await axios.post("https://jsonplaceholder.typicode.com/todos", JSON.stringify(newTodo), {
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  return res.data
}

const Mutationhook = () => {
  const queryClient = useQueryClient()
  const [title, setTitle] = useState("")

  const { mutate, error, status } = useMutation<Todo, Error, Todo>({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    }
  })

  const handleSummit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title.trim() === "") return;
    mutate({
      title,
      completed: false
    })
    setTitle("")
  }

  return (
    <div>
      <h1>Mutation Hook</h1>
      <form onSubmit={handleSummit}>
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter the Title" className="border" />
        <button type="submit" className="bg-black text-white px-2 py-1 rounded-2xl">
          {status === "pending" ? "Adding..." : "Create Todo"}
        </button>
        {error && (<h1>Error : {error.message}</h1>)}
        {status === "success" && <h1>Todo Added SuccessFully</h1>}
      </form>
    </div>
  )
}

export default Mutationhook