import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup} from "./pages/Signup.js"
import { Signin } from "./pages/Signin.js"
import { Blog } from "./pages/Blog.js"
import { Blogs } from './pages/Blogs.js'
import { Home } from './pages/Home.js'
import { Post } from './pages/Posts.js'
import MyPost from './pages/MyPost.js'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/post" element={<Post />} />
          <Route path="/mypost" element={<MyPost />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App