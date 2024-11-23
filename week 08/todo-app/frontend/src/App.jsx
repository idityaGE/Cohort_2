import CreateTodo from "./components/CreateTodo"
import Todos from "./components/Todos"
import { useState } from "react"
import { useEffect } from "react"

function App() {
  const [todos, settodos] = useState([])

  useEffect(() => {
    const todosData = async () => {
      const res = await fetch('http://localhost:3000/todos')
      const data = await res.json()
      // console.log(data.data)
      settodos(data.data)
    }
    todosData()
  }, [todos])

  // console.log(todos)

  return (
    <>
      <div className="flex items-center flex-col space-y-4">
        
        <h1 className="text-5xl font-extrabold font-mono pt-3">Todo App</h1>
        
        <div className="flex justify-center items-center w-full">
          <CreateTodo />
        </div>

        <div className="w-1/2">
          <Todos todos={todos} />
        </div>
      </div>
    </>
  )
}

export default App
