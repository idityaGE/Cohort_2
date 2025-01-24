import { useQuery } from "@tanstack/react-query"

const getRandomNum = () => {
  return Math.floor(Math.random() * 100)
}

const Diduplication = () => {
  const { data } = useQuery({
    queryKey: ['RandomNum'],
    queryFn: getRandomNum,
  })

  return (
    <div>
      <h1 className="text-2xl font-bold">Diduplication</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Diduplication