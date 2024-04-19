import React from "react"
import { BrowserRouter, Link, Routes, useNavigate } from "react-router-dom"
//carefull with Routes and Router
import { Route } from "react-router-dom"
import Landing from "./components/Landing"
const Dashboard = React.lazy(() => import("./components/Dashboard")) // lazy loading used to load the component only when it is needed
import { Suspense } from "react" // used to show a loading message while the component is being loaded

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={
            <Suspense fallback=
              {<div>Dashboard is loading please wait...</div>}>
              <Dashboard />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


function Navbar() {
  const navigate = useNavigate() // it can only be used inside a component that is inside a BrowserRouter
  return (
    <div>
      <h1>Navbar</h1>
      <button onClick={() => { navigate('/') }}>Landing</button>
      <button onClick={() => { navigate('/dashboard') }}>DashBoard</button>
    </div>
  )
}


export default App
