import { useNavigate, useParams } from "react-router-dom";
import { Circle } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { usePost } from "../hooks/useBlog"
import AppBar from "../components/AppBar";

// interface Blog {
//   id: string,
//   title: string,
//   content: string,
//   author: {
//       name:string
//   }
// }

// interface BlogHook {
//   loading: boolean,
//   blog:Blog,
// }


const Blog = () => {
  const param = useParams();
  const id = param.id 
  const navigate = useNavigate();
  console.log(id)
  if(!localStorage.getItem('token')){
    navigate('/login')
  }
const {loading,blog} = usePost({
  id
});

  return (
   <div className="w-full min-h-screen bg-white">
    <AppBar/>
    <div>{loading?<div className="bg-white min-h-screen flex justify-center items-center">
    <BlogSkeleton/>
  </div>:<div className="flex justify-around items-center mt-[150px] mx-10  text-gray-900">
    <Post title={blog?.title} content={blog?.content} date="posted on 21 mar 2024" />
    <AuthorDesc authorName={blog?.author.name}/>
   </div>}</div>
   </div>
  )
}
interface Posttypes {
  title?:string,
  content?: string,
  date: string,
}

function Post({title,content,date}:Posttypes){

  return <div className="flex justify-center px-5 ps-[50px]">
     <div className="w-[1000px]">
     <div className="text-4xl font-bold">{title}</div>
     <div>. {date} .</div>
     <div className="py-5 text-lg text-gray-700">{content}</div>
     </div>
  </div>
}
function AuthorDesc({authorName}:{authorName:string | undefined}){
  return <div>
  <div className="text-gray-600 text-xl mx-4">Author</div> 
  <div className="flex justify-between gap-x-4 items-center">
    <Circle/>
    <div className="min-w-40 pe-5">
    <div className="text-2xl font-bold">{authorName}</div>
    <div className="text-gray-700 text-lg p-2">{authorName}'s Blog Post with his bio description</div>
    </div> 
  </div>
  </div>
}

export default Blog