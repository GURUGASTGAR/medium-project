import { Link } from "react-router-dom"

interface BlogsProps {
    authorName: string,
    title: string,
    content: string ,
    date: string
    id: string 
}



const BlogCard = ({authorName,title,content,date,id}:BlogsProps) => {
  return (
 <Link to={`/blog/${id}`}>
    <div className="flex justify-center hover:cursor-pointer">
    <div className="p-2 w-[1000px]">
      <div className="text-gray-900">
        <Avatar authorName={authorName}/> {authorName} . <span className="text-gray-500">{date}</span>
      </div>
      <div className="text-gray-900 font-bold text-3xl">{title}</div>
      <div className="text-gray-500 font-semibold text-xl">{content.length > 200 ? `${content.slice(0,200)}...`: content}</div>
      <div className="text-gray-400">
             {content.length > 60 ? `${Math.ceil(content.length/120)} min read `:"0 min read"}
      </div>
      <div className="mt-3 h-[1px] bg-gray-200"></div>
    </div>
    </div>
 </Link>
  )
}


export function Circle() {
  return <div className="h-8 w-8 rounded-full bg-slate-500">

  </div>
}
export function Avatar({authorName}:{authorName:string}){

  const char = authorName[0];
  return <div className="avatar placeholder">
  <div className="bg-neutral text-neutral-content rounded-full w-8 h-8">
      <span className="text-xs text-white">{char}</span>
  </div>
</div>
}

export default BlogCard