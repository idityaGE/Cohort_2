import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import './App.css'
import { countState } from './store/atoms/count'

function App() {
  return (
    <RecoilRoot>
      <Count />
    </RecoilRoot>
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
  const setCount = useSetRecoilState(countState)
  return (
    <>
      <button onClick={() => setCount(p => p + 1)}>Increment</button>
      <button onClick={() => setCount(p => p - 1)}>Decrement</button>
    </>
  )
}

export default App
