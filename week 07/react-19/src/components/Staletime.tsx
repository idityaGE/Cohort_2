import { useQuery } from "@tanstack/react-query"
import { fetchData } from "./WithTQS"

const Staletime = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["staleTime"],
    queryFn: fetchData,
    staleTime: 5000,
    // refetchInterval: 10000,
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <h2>Stale Time Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Staletime