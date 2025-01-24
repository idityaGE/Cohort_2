import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export const fetchData = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/')
  return data
}

const WithTQS = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchData,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <div>
      <h1 className="text-2xl font-bold">With TQS</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default WithTQS