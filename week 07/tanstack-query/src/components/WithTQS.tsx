import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import axios from 'axios'

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodo = async (id: number) => {
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`)
  return data as Todo
}

const WithTQS = () => {
  const [todoId, setTodoId] = useState(1)

  const { data: todo, isLoading, isError, error } = useQuery({
    queryKey: ['todo', todoId],
    queryFn: () => fetchTodo(todoId),
  })

  const handlePrevious = () => {
    if (todoId > 1) {
      setTodoId(prev => prev - 1)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">With TanStack Query</h1>

      {/* Navigation info */}
      <div className="mb-4 text-center text-sm text-gray-500">
        Viewing Todo #{todoId}
      </div>

      <div className="min-h-[150px]">
        {isLoading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {isError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{(error as Error)?.message || 'An unknown error occurred'}</p>
          </div>
        )}

        {!isLoading && !isError && todo && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-2">{todo.title}</h2>
            <div className="flex items-center mt-3">
              <span className="mr-2">Status:</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {todo.completed ? 'Completed' : 'Not Completed'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-6">
        <button
          className={`px-4 py-2 rounded-md transition-colors ${todoId > 1
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          onClick={handlePrevious}
          disabled={todoId <= 1}
        >
          Previous
        </button>

        <button
          className='bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors'
          onClick={() => setTodoId(prev => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Query status indicator */}
      <div className="mt-4 text-xs text-center text-gray-500">
        <span className={`inline-block w-2 h-2 rounded-full mr-1 ${isLoading ? 'bg-yellow-400' : isError ? 'bg-red-500' : 'bg-green-500'}`}></span>
        Query Status: {isLoading ? 'Loading' : isError ? 'Error' : 'Success'}
      </div>
    </div>
  )
}

export default WithTQS
