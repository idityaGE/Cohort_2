import { useState, useEffect } from 'react'

const WithoutTSQ = () => {
  const [todo, setTodo] = useState<any>(null)
  const [isloading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<any>(null)
  const [id, setId] = useState<number>(1)

  const url = 'https://jsonplaceholder.typicode.com/todos/'

  useEffect(() => {
    let raceCondition = false // Race Condition means that the fetch request is still running even after the component is unmounted

    const fetchData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(url+id)
        if(raceCondition) return;
        if(!response.ok) {
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

  return (
    <div>
      <h1 className="text-2xl font-bold">Without TSQ</h1>
      <div>
        {isloading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {todo && (
          <div>
            <h2>{todo.title}</h2>
            <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
          </div>
        )}
        <button className='bg-black text-white px-2 py-1 rounded-md' onClick={() => setId(prev => prev + 1)}>Next</button>
      </div>
    </div>
  )
}

export default WithoutTSQ