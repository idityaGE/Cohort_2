import { RecoilRoot, selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import './App.css'
import { countState, evenState } from './store/atoms/count'

function App() {
  return (
    <RecoilRoot>
      <Count />
      < IsEvenCount />
    </RecoilRoot>
  )
}

function IsEvenCount() {
  const isEven = useRecoilValue(evenState)
  return(
    <div>
      {isEven ? "It's an even number" : "It's an odd number" }
    </div>
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
  const count = useRecoilValue(countState)
  return (
    <div>
      <h1>{count}</h1>
    </div>
  )
}

function Button() {
  // const [count, setCount ] = useRecoilState(countState)
  const setCount = useSetRecoilState(countState)
  return (
    <>
      <button onClick={() => setCount(p => p + 1)}>Increment</button>
      <button onClick={() => setCount(p => p - 1)}>Decrement</button>
    </>
  )
}

export default App
