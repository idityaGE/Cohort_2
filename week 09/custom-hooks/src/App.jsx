import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import Todos from './components/Todos'
import { Profile } from './custom-hooks/DatafetchingHook'
import IsOnline from './components/IsOnline'
import MousePosition from './components/MousePosition'
import WinDimension from './components/WinDimension'
import Timer from './components/Timer'
import DebounceValue from './components/DebounceValue'


function App() {
  return (
    <>
      {/* <MyComponent /> */}
      {/* <ClassComponent /> */}
      {/* {render ? <UseEffectReturn /> : <div>UseEffectReturn got unmounted</div>} */}
      {/* <Todos /> */}
      {/* <Profile /> */}
      {/* <IsOnline /> */}
      {/* <MousePosition /> */}
      {/* <WinDimension /> */}
      {/* <Timer /> */}
      <DebounceValue />
    </>
  )
}
export default App








// Functional Component
// with hooks
function MyComponent() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>functional Component</h1>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}


// Class Component
// without hooks
class ClassComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  render() {
    return (
      <div>
        <h1>Class Component</h1>
        <h1>{this.state.count}</h1>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>Increment</button>
      </div>
    )
  }
}

const UseEffectReturn = () => {
  const [btnClick, setBtnClick] = useState(false)  // so if somehow component unmounts, then it will call the return cleanUp function of useEffect or If dependecise array state variable state changes, then it will first call the cleanUp function of useEffect and then call the useEffect function
  useEffect(() => {
    console.log('task')
    return () => {
      console.log('CleanUp')
    }
  }, [btnClick])
  return (
    <>
      <h1>UseEffectReturn</h1>
      <button onClick={() => setBtnClick(!btnClick)}>Toggle</button>
    </>
  )
}
