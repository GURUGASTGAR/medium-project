import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Blog from "./pages/Blog"
import Blogs from "./pages/Blogs"
import Publish from "./pages/Publish"


function App() {


  return (
   <div>
   <BrowserRouter>
   <Routes>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/blog/:id" element={<Blog />}/>
    <Route path="/" element={<Blogs/>}/>
    <Route path="/publish" element={<Publish/>}/>
   </Routes>
   </BrowserRouter>
   </div>
  )
}

export default App
