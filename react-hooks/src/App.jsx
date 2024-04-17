import React from 'react'
import Render from './components/Memo'
import Todo from './components/Key'
import CardWrapper from './components/CardWrapper'
import ExampleComponent from './components/UseEffect'
import UseMemo from './components/UseMemo'
import UseCallback from './components/UseCallback'

function App() {
  return (
    <div className='w-full h-full m-10'>
      {/* <Render /> */}
      {/* <Todo /> */}
      {/* <ExampleComponent /> */}
      {/* <UseMemo/> */}
      <CardWrapper className='w-1/2'>
        <UseCallback />
      </CardWrapper>
    </div>
  )
}

export default App

