import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

// Fetch todos with pagination parameters
const fetchTodos = async (currentPage: number = 1, pageSize: number = 10) => {
  const response = await axios.get<Todo[]>(
    `https://jsonplaceholder.typicode.com/todos?_page=${currentPage}&_limit=${pageSize}`
  )

  // Extract total count from headers
  const totalCount = parseInt(response.headers['x-total-count'] || '0', 10)

  return {
    todos: response.data,
    totalCount
  }
}

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [prefetchedPages, setPrefetchedPages] = useState<number[]>([])

  const { data, error, isLoading, isPlaceholderData, isFetching } = useQuery({
    queryKey: ['todos', currentPage, pageSize],
    queryFn: () => fetchTodos(currentPage, pageSize),
    staleTime: 5000, // Data stays fresh for 5 seconds
  })

  // Calculate total pages
  const totalPages = data ? Math.ceil(data.totalCount / pageSize) : 0

  // Handle prefetching next page
  const prefetchNextPage = async (page: number) => {
    if (page <= totalPages && !prefetchedPages.includes(page)) {
      await fetchTodos(page, pageSize)
      setPrefetchedPages(prev => [...prev, page])
    }
  }

  // Handle page changes
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)

      // Prefetch next page if available
      if (page + 1 <= totalPages) {
        prefetchNextPage(page + 1)
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        TanStack Query Pagination
      </h1>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h2 className="font-semibold mb-2">How Pagination Works with TanStack Query:</h2>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Include page parameters in your <code className="bg-blue-100 px-1 rounded">queryKey</code> to cache each page separately</li>
          <li>Use <code className="bg-blue-100 px-1 rounded">keepPreviousData</code> to prevent layout shifts during page transitions</li>
          <li>Prefetch adjacent pages for instant navigation</li>
          <li>Display loading indicators while new data is being fetched</li>
        </ul>
      </div>

      {/* Controls and status */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          {isFetching ? (
            <span className="text-blue-500">Fetching data...</span>
          ) : (
            <span>Page {currentPage} of {totalPages}</span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <label className="text-sm">
            Page Size:
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="ml-2 border rounded p-1"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p className="font-bold">Error</p>
          <p>{(error as Error).message}</p>
        </div>
      ) : (
        <>
          {/* Todo items */}
          <div className="mb-8">
            <div className="grid grid-cols-1 gap-3">
              {data?.todos.map(todo => (
                <div
                  key={todo.id}
                  className={`p-4 rounded-lg border ${todo.completed ? 'bg-green-50' : 'bg-white'
                    }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 h-4 w-4 rounded-full flex-shrink-0 ${todo.completed ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    <div>
                      <h3 className={`font-medium ${todo.completed ? 'line-through text-gray-500' : ''
                        }`}>
                        {todo.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        User ID: {todo.userId} | Todo ID: {todo.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination controls */}
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded text-sm ${currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
            >
              First
            </button>

            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded text-sm ${currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
            >
              Previous
            </button>

            {/* Page numbers */}
            <div className="flex space-x-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = currentPage <= 3
                  ? i + 1
                  : currentPage >= totalPages - 2
                    ? totalPages - 4 + i
                    : currentPage - 2 + i;

                if (pageNum <= 0 || pageNum > totalPages) return null;

                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-8 h-8 rounded-full ${currentPage === pageNum
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 rounded text-sm ${currentPage === totalPages || totalPages === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
            >
              Next
            </button>

            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`px-3 py-1 rounded text-sm ${currentPage === totalPages || totalPages === 0
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
            >
              Last
            </button>
          </div>

          {/* Prefetch status */}
          <div className="mt-4 text-center text-xs text-gray-500">
            {prefetchedPages.length > 0 && (
              <p>
                Prefetched pages: {prefetchedPages.join(', ')}
                <span className="ml-1 text-green-500">(will load instantly)</span>
              </p>
            )}
          </div>
        </>
      )}

      {/* Query info */}
      <div className="mt-6 text-xs bg-gray-50 p-3 rounded">
        <p><strong>Query Key:</strong> ['todos', {currentPage}, {pageSize}]</p>
        <p><strong>keepPreviousData:</strong> true (prevents loading flashes during page transitions)</p>
        <p><strong>isPreviousData:</strong> {isPlaceholderData ? 'true' : 'false'} (shows if we're viewing cached data)</p>
      </div>
    </div>
  )
}

export default Pagination
