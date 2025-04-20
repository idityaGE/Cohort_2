import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchTodo } from "./WithTQS"
import { useEffect, useState } from "react"

const Staletime = () => {
  const [refreshCount, setRefreshCount] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const queryClient = useQueryClient()

  const STALE_TIME = 5000 // 5 seconds

  const { data, isLoading, isStale, dataUpdatedAt, refetch } = useQuery({
    queryKey: ["staleTime-example"],
    queryFn: () => fetchTodo(1),
    staleTime: STALE_TIME,
    // refetchInterval: 6000
  })

  // Timer to show time elapsed since last fetch
  useEffect(() => {
    if (!dataUpdatedAt) return

    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - dataUpdatedAt) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [dataUpdatedAt])

  // Force component re-render without triggering new query
  const handleRefreshUI = () => {
    setRefreshCount(prev => prev + 1)
  }

  // Manually force a refetch
  const handleForceRefetch = () => {
    refetch()
  }

  // Clear cache and fetch fresh data
  const handleClearCache = () => {
    queryClient.removeQueries({ queryKey: ["staleTime-example"] })
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        TanStack Query Stale Time
      </h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-sm">
        <p className="font-semibold mb-1">How Stale Time Works:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Data is considered <b>fresh</b> for {STALE_TIME / 1000} seconds after fetching</li>
          <li>During this time, no new network requests will be made</li>
          <li>After {STALE_TIME / 1000} seconds, data becomes <b>stale</b></li>
          <li>When stale, TanStack Query will refetch when:
            <ul className="list-disc pl-5 mt-1">
              <li>A new component instance mounts</li>
              <li>Window is refocused</li>
              <li>Network is reconnected</li>
              <li>Refetch interval is defined (if enabled)</li>
            </ul>
          </li>
        </ol>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Todo Data</h2>
            <span className={`px-2 py-1 text-xs rounded-full ${isStale
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
              }`}>
              {isStale ? 'STALE' : 'FRESH'}
            </span>
          </div>

          <div className="bg-white p-3 rounded border">
            <h3 className="text-xl mb-2 font-medium">{data?.title}</h3>
            <div className="flex items-center">
              <span className="mr-2">Status:</span>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${data?.completed
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
                }`}>
                {data?.completed ? 'Completed' : 'Not Completed'}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-3 rounded border text-center">
          <div className="text-sm text-gray-500">Time Since Fetch</div>
          <div className="text-2xl font-bold">{timeElapsed}s</div>
          <div className="text-xs mt-1 text-gray-500">
            {timeElapsed < STALE_TIME / 1000
              ? `Becomes stale in ${Math.max(0, Math.floor(STALE_TIME / 1000 - timeElapsed))}s`
              : 'Data is now stale'}
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded border text-center">
          <div className="text-sm text-gray-500">Component Refreshes</div>
          <div className="text-2xl font-bold">{refreshCount}</div>
          <div className="text-xs mt-1 text-gray-500">
            Refreshes without refetching
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
          onClick={handleRefreshUI}
        >
          Refresh UI (No Fetch)
        </button>

        <button
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded transition-colors"
          onClick={handleForceRefetch}
        >
          Force Refetch
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
          onClick={handleClearCache}
        >
          Clear Cache
        </button>
      </div>

      <div className="mt-6 text-xs text-gray-500 bg-gray-50 p-3 rounded">
        <p>
          <span className="font-semibold">Tip:</span> Watch the network tab in your
          browser's developer tools to see when actual fetches occur.
        </p>
      </div>
    </div>
  )
}

export default Staletime
