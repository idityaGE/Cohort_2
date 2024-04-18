import React from 'react'
import Render from './components/Memo'
import Todo from './components/Key'
import CardWrapper from './components/CardWrapper'
import ExampleComponent from './components/UseEffect'
import UseMemo from './components/UseMemo'
import UseCallback from './components/UseCallback'
import UseRef from './components/UseRef'

function App() {
  return (
    <div className='w-full h-full m-10'>
      {/* <Render /> */}
      {/* <Todo /> */}
      {/* <ExampleComponent /> */}
      {/* <UseMemo/> */}
      {/* <UseCallback /> */}
      <CardWrapper className='w-1/2'>
        <UseRef />
      </CardWrapper>
    </div>
  )
}

export default App

