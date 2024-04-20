import { useState, useContext } from 'react'
import './App.css'
import countContext from './Context'

function App() {
  const [count, setCount] = useState(0)

  return (
    <countContext.Provider value={{ count, setCount }}>
      <Count />
    </countContext.Provider>
  )
}

function Count() {
  return (
    <div>
      <Counter />
      <Button />
    </div>
  )
}

function Counter() {
  const { count } = useContext(countContext)
  return (
    <div>
      <h1>{count}</h1>
    </div>
  )
}

function Button() {
  const { setCount } = useContext(countContext)
  return (
    <>
      <button onClick={() => setCount(p => p + 1)}>Increment</button>
      <button onClick={() => setCount(p => p - 1)}>Decrement</button>
    </>
  )
}

export default App
