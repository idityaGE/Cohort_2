import { Suspense } from "react"
import FetchTodo from "./components/FetchTodo"
import { useCounter } from "./components/contextwithuse"
import { useCounterStore } from "./store/store"

function App() {
  const { cnt, setCnt } = useCounter()

  const { count, increment, decrement } = useCounterStore()

  
  return (
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <FetchTodo />
        </Suspense>
        <div>
          <h1>Count : {cnt}</h1>
          <button onClick={() => setCnt(cnt + 1)}>Increment</button>
        </div>

        <div>
          <h1>Zustand Count : {count}</h1>
          <button onClick={increment}>Increment</button>
          <button onClick={decrement}>Decrement</button>
        </div>
      </div>
    </>
  )
}

export default App
