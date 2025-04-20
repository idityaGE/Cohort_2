import { useQueries } from "@tanstack/react-query"
import { useState } from "react"
import axios from "axios"

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

const fetchTodo = async (id: number): Promise<Todo> => {
  const { data } = await axios(`https://jsonplaceholder.typicode.com/todos/${id}`)
  return data
}

const fetchUser = async (userId: number): Promise<User> => {
  const { data } = await axios(`https://jsonplaceholder.typicode.com/users/${userId}`)
  return data
}

const MultipleQueries = () => {
  const [idToFetch, setIdToFetch] = useState(1)

  const [todoResult, userResult] = useQueries({
    queries: [
      {
        queryKey: ["todo", idToFetch],
        queryFn: () => fetchTodo(idToFetch)
      },
      {
        queryKey: ["user", idToFetch],
        queryFn: () => fetchUser(idToFetch)
      }
    ]
  })

  const isError = todoResult.isError || userResult.isError

  const handleNextId = () => {
    setIdToFetch(prev => prev + 1)
  }

  const handlePreviousId = () => {
    if (idToFetch > 1) {
      setIdToFetch(prev => prev - 1)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        TanStack Query - Multiple Queries Example
      </h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <p className="font-semibold mb-2">How useQueries Works:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Fetches multiple resources in parallel</li>
          <li>Each query has its own loading, error, and data states</li>
          <li>All queries share the same caching and stale-time benefits</li>
          <li>Perfect for related data that needs to be fetched simultaneously</li>
        </ul>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <span className="text-lg font-medium">Current ID: {idToFetch}</span>
        <div className="flex space-x-3">
          <button
            onClick={handlePreviousId}
            disabled={idToFetch <= 1}
            className={`px-4 py-2 rounded ${idToFetch <= 1
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextId}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Next
          </button>
        </div>
      </div>

      {isError && (
        <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p className="font-bold">Error</p>
          <p>{todoResult.error?.toString() || userResult.error?.toString()}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Todo Card */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Todo</h2>
            <span className={`px-2 py-1 text-xs rounded-full ${todoResult.isLoading
                ? 'bg-yellow-100 text-yellow-800'
                : todoResult.isError
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }`}>
              {todoResult.isLoading ? 'Loading...' : todoResult.isError ? 'Error' : 'Success'}
            </span>
          </div>

          <div className="p-4">
            {todoResult.isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : todoResult.isError ? (
              <div className="text-red-500">Failed to load todo</div>
            ) : todoResult.data ? (
              <div>
                <h3 className="text-lg font-medium mb-2">{todoResult.data.title}</h3>
                <div className="flex items-center mt-2">
                  <span className="mr-2">Status:</span>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${todoResult.data.completed
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {todoResult.data.completed ? 'Completed' : 'Pending'}
                  </span>
                </div>
                <div className="mt-3 text-sm text-gray-500">
                  Todo ID: {todoResult.data.id}<br />
                  User ID: {todoResult.data.userId}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* User Card */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">User</h2>
            <span className={`px-2 py-1 text-xs rounded-full ${userResult.isLoading
                ? 'bg-yellow-100 text-yellow-800'
                : userResult.isError
                  ? 'bg-red-100 text-red-800'
                  : 'bg-green-100 text-green-800'
              }`}>
              {userResult.isLoading ? 'Loading...' : userResult.isError ? 'Error' : 'Success'}
            </span>
          </div>

          <div className="p-4">
            {userResult.isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : userResult.isError ? (
              <div className="text-red-500">Failed to load user</div>
            ) : userResult.data ? (
              <div>
                <h3 className="text-lg font-medium mb-2">{userResult.data.name}</h3>
                <div className="text-sm">
                  <p><span className="font-medium">Username:</span> {userResult.data.username}</p>
                  <p><span className="font-medium">Email:</span> {userResult.data.email}</p>
                  <p className="mt-2 font-medium">Address:</p>
                  <p className="pl-2">
                    {userResult.data.address.street}, {userResult.data.address.suite}<br />
                    {userResult.data.address.city}, {userResult.data.address.zipcode}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded">
        <p className="mb-1"><span className="font-semibold">Note:</span> Both queries run in parallel, but each has its own independent state.</p>
        <p>Try navigating between IDs and notice how the cache works for previously fetched IDs.</p>
      </div>
    </div>
  )
}

export default MultipleQueries
