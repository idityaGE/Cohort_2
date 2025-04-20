import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

// Simulating a data-fetching function that logs when it runs
const fetchRandomNumber = (): Promise<number> => {
  console.log("🔄 Fetching random number...")
  return new Promise(resolve => {
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 100)
      console.log(`✅ Fetched random number: ${randomNum}`)
      resolve(randomNum)
    }, 1000) // Adding delay to simulate API call
  })
}

const Deduplication = () => {
  const [counter, setCounter] = useState(1)
  const [queryKey, setQueryKey] = useState("randomNumber")

  // First component instance with same query key
  const query1 = useQuery({
    queryKey: [queryKey],
    queryFn: fetchRandomNumber,
    staleTime: 5000, // Data remains fresh for 5 seconds
  })

  // Second component instance with same query key - will be deduplicated!
  const query2 = useQuery({
    queryKey: [queryKey],
    queryFn: fetchRandomNumber,
    staleTime: 5000,
  })

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        TanStack Query Deduplication
      </h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-sm">
        <p className="font-semibold mb-1">How This Works:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Both components use the same query key</li>
          <li>TanStack Query only calls fetchRandomNumber <strong>once</strong></li>
          <li>Both components receive the same result</li>
          <li>Check the console to see it only fetches once!</li>
        </ol>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="p-4 border rounded-lg bg-gray-50">
          <h2 className="font-semibold mb-2">Query Instance 1</h2>
          <div className="flex items-center space-x-2">
            <span className={`h-3 w-3 rounded-full ${query1.isLoading ? 'bg-yellow-400' : 'bg-green-500'}`}></span>
            <span className="text-sm text-gray-600">{query1.isLoading ? 'Loading...' : 'Ready'}</span>
          </div>
          <div className="mt-4 p-3 bg-white border rounded text-center">
            <span className="text-3xl font-bold">{query1.data !== undefined ? query1.data : '...'}</span>
          </div>
        </div>

        <div className="p-4 border rounded-lg bg-gray-50">
          <h2 className="font-semibold mb-2">Query Instance 2</h2>
          <div className="flex items-center space-x-2">
            <span className={`h-3 w-3 rounded-full ${query2.isLoading ? 'bg-yellow-400' : 'bg-green-500'}`}></span>
            <span className="text-sm text-gray-600">{query2.isLoading ? 'Loading...' : 'Ready'}</span>
          </div>
          <div className="mt-4 p-3 bg-white border rounded text-center">
            <span className="text-3xl font-bold">{query2.data !== undefined ? query2.data : '...'}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-4">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
          onClick={() => setCounter(prev => prev + 1)}
        >
          Trigger Re-render (Counter: {counter})
        </button>

        <button
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded transition-colors"
          onClick={() => setQueryKey(`randomNumber-${Date.now()}`)}
        >
          Change Query Key (Force New Fetch)
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-3 rounded">
        <p className="font-semibold">Current State:</p>
        <p>Query Key: <code className="bg-gray-200 px-1 rounded">{queryKey}</code></p>
        <p>Component Renders: {counter}</p>
        <p>Status: {query1.isLoading ? 'Loading' : 'Success'}</p>
      </div>
    </div>
  )
}

export default Deduplication
