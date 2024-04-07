
import AppBar from "../components/AppBar"
import BlogCard from "../components/BlogCard"
import useBlog from "../hooks/useBlog"
import { BlogSkeleton } from "../components/BlogSkeleton";






function Blogs(){
  const { loading , blogs}  = useBlog();
  if(loading){
    return <div>
      <AppBar/>
      <div className="flex justify-center bg-white">
        <div>
          <BlogSkeleton/>
          <BlogSkeleton/>
          <BlogSkeleton/>
          <BlogSkeleton/>
          <BlogSkeleton/>
        </div>
      </div>
    </div>
  }
  return (
    <div>
      <div> 
        <AppBar/>
      </div>
      <div className="flex flex-col justify-start bg-white min-w-full min-h-screen gap-2">
        {blogs.map(function (blog: { author: { name: string; }; title: string; content: string; id: string; }){
          return <BlogCard authorName={blog.author.name} title={blog.title} content={blog.content} id={blog.id} key={blog.id} date="20 mar 2024"/>
       })}
        </div>
    </div>
  )
}

export default Blogs