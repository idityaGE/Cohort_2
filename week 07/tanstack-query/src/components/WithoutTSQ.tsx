import { useState, useEffect } from 'react'

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const WithoutTSQ = () => {
  const [todo, setTodo] = useState<Todo | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)
  const [id, setId] = useState<number>(1)

  const url = 'https://jsonplaceholder.typicode.com/todos/'

  useEffect(() => {
    let raceCondition = false // Race Condition means that the fetch request is still running even after the component is unmounted

    // The component starts a fetch request
    // The user navigates away or the component unmounts for another reason
    // The fetch request completes
    // The code attempts to set state on an unmounted component(causing memory leaks or errors)

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(url + id)
        if (raceCondition) return;
        if (!response.ok) {
          throw new Error("Failed to fetch data")
        }
        const data = await response.json()
        setTodo(data)
      } catch (error) {
        setError(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()

    return () => {
      raceCondition = true
    }
  }, [id])

  const handlePrevious = () => {
    if (id > 1) {
      setId(prev => prev - 1)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Without TSQ</h1>

      {/* Navigation info */}
      <div className="mb-4 text-center text-sm text-gray-500">
        Viewing Todo #{id}
      </div>

      <div className="min-h-[150px]">
        {isLoading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{error.message}</p>
          </div>
        )}

        {!isLoading && !error && todo && (
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
          className={`px-4 py-2 rounded-md transition-colors ${id > 1
            ? 'bg-gray-800 text-white hover:bg-gray-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          onClick={handlePrevious}
          disabled={id <= 1}
        >
          Previous
        </button>

        <button
          className='bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors'
          onClick={() => setId(prev => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default WithoutTSQ
