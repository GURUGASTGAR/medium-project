import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

const AppBar = () => {
  return (
    <div className="flex justify-between bg-gray-50 border-b px-3 py-2 backdrop-blur-md shadow-sm shadow-gray-200">
        <Link to={"/blogs"} className="text-gray-800 font-semibold text-xl mt-2">Medium</Link>
        <div className="">
          <Link to={"/publish"}><button className="w-20 h-3 rounded-full font-semibold  btn btn-accent mx-4 ">Post</button></Link>
          
          <Avatar authorName="A"/>
        </div>

    </div>
  )
}

export default AppBar