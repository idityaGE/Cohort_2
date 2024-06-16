import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import Contact from './components/Contact/Contact.jsx'
import About from './components/About/About.jsx'
import Github,{githubInfoLoader} from './components/Github/Github.jsx'
import User from './components/User/User.jsx'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children:[
//       {
//         path: '',
//         element: <Home/>,
//       },
//       {
//         path: 'contact',
//         element: <Contact/>,
//       },
//       {
//         path: 'about',
//         element: <About/>,
//       },
//       {
//         path: 'github',
//         element: <Github/>,
//       },
//     ]
//   },
// ])

//better Way

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="contact" element={<Contact />} />
      <Route path="about" element={<About />} />
      <Route path="user/:id" element={<User />} />
      <Route
        loader={githubInfoLoader}
        path="github"
        element={<Github />}
      />
    </Route>
  )
)



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
