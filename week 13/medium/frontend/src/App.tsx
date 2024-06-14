import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Create from './pages/Create'
import Blogs from './pages/Blogs'
import Update from './pages/Update'
import Landing from './pages/Landing'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/create" element={<Create />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
