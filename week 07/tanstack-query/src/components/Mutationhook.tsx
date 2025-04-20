import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

interface Todo {
  id?: number
  title: string
  completed: boolean
  userId?: number
  isNew?: boolean // To highlight new items
}

// Function to fetch todos
const fetchTodos = async (): Promise<Todo[]> => {
  const res = await axios.get("https://jsonplaceholder.typicode.com/todos?_limit=5")
  return res.data
}

// Function to create a new todo
const createTodo = async (newTodo: Todo) => {
  console.log("Creating todo:", newTodo) // For debugging
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

  // Fetch existing todos
  const { data: todos, isLoading: todosLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    // Make sure we're not showing stale data
    staleTime: 0
  })

  // Set up mutation
  const mutation = useMutation<Todo, Error, Todo>({
    mutationFn: createTodo,
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ["todos"] })

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]) || []

      // Create optimistic todo with a temporary ID and isNew flag
      const optimisticTodo = {
        ...newTodo,
        id: Date.now(),
        isNew: true // Flag to highlight
      }

      // Optimistically update the UI
      queryClient.setQueryData<Todo[]>(["todos"], [
        ...previousTodos,
        optimisticTodo
      ])

      console.log("Optimistic update - new todos:", [...previousTodos, optimisticTodo])

      return { previousTodos }
    },
    onError: (error, variables, context) => {
      console.error("Mutation error:", error)
      // Roll back to the previous state on error
      if (context?.previousTodos) {
        queryClient.setQueryData<Todo[]>(["todos"], context.previousTodos)
      }
    },
    onSuccess: (data) => {
      console.log("Mutation success, new todo:", data)
      // Update the cache with the actual response data
      const currentTodos = queryClient.getQueryData<Todo[]>(["todos"]) || []
      const updatedTodos = currentTodos.filter(todo => !todo.isNew)

      queryClient.setQueryData<Todo[]>(["todos"], [...updatedTodos, data])

      // Then invalidate to refetch - the API won't actually save the new todo
      // (it's a mock API), but we're showing how it would work in a real app
      queryClient.invalidateQueries({ queryKey: ["todos"] })
    }
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title.trim() === "") return

    mutation.mutate({
      title,
      completed: false,
      userId: 1
    })

    setTitle("")
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        TanStack Query - Mutation Example
      </h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-sm">
        <p className="font-semibold mb-1">How Mutations Work:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Create a mutation with <code className="bg-blue-100 px-1 rounded">useMutation</code></li>
          <li>Call the <code className="bg-blue-100 px-1 rounded">mutate</code> function with your data</li>
          <li>Handle the mutation lifecycle with callbacks</li>
          <li>Update or invalidate queries to reflect changes</li>
        </ol>
      </div>

      {/* Todo Form */}
      <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold mb-4">Add New Todo</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter todo title"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={mutation.isPending}
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className={`px-4 py-2 rounded-lg text-white transition-colors ${mutation.isPending
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
                }`}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Adding...' : 'Add Todo'}
            </button>

            <div className="text-sm">
              {mutation.isError && (
                <span className="text-red-500">Error: {mutation.error.message}</span>
              )}
              {mutation.isSuccess && (
                <span className="text-green-500">Todo added successfully!</span>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Todo List */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Current Todos</h2>
        <p className="text-sm text-gray-500 mb-3">
          Note: JSONPlaceholder doesn't actually save new todos (it's a mock API)
        </p>

        {todosLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : todos && todos.length > 0 ? (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className={`p-3 border rounded-lg flex items-center
                  ${todo.isNew ? 'bg-green-50 border-green-300 animate-pulse' : 'bg-white'}`}
              >
                <span className={`h-3 w-3 rounded-full mr-3 ${todo.completed ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                <span className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.title}
                </span>
                {todo.isNew && (
                  <span className="ml-auto text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    New
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center py-6">No todos found</p>
        )}
      </div>

      {/* Mutation Status */}
      <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded">
        <p className="font-semibold">Current Mutation Status: {mutation.status.toUpperCase()}</p>
        <div className="mt-2">
          <div className="grid grid-cols-4 gap-2">
            <div className={`p-1 text-center rounded ${mutation.isPending ? 'bg-yellow-100' : 'bg-gray-100'}`}>Pending</div>
            <div className={`p-1 text-center rounded ${mutation.isSuccess ? 'bg-green-100' : 'bg-gray-100'}`}>Success</div>
            <div className={`p-1 text-center rounded ${mutation.isError ? 'bg-red-100' : 'bg-gray-100'}`}>Error</div>
            <div className={`p-1 text-center rounded ${mutation.isIdle ? 'bg-blue-100' : 'bg-gray-100'}`}>Idle</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mutationhook
