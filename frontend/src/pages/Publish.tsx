import { useState } from "react"
import AppBar from "../components/AppBar"
import axios from "axios";
import { BACKEND_URL } from "../config";

import toast, { Toaster } from "react-hot-toast";

const Publish = () => {
  return (
    <div className="w-full min-h-screen bg-white">
        <AppBar/>
        <Post/>
    </div>
  )
}

function Post(){
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    
        async function handleClick(){
           try {
           if(title=="" && content==''){
            toast("invalid inputs")
            return
           }const res = await axios.post(`${BACKEND_URL}/blog/post`,{
            title,
            content
        },{
            headers:{
                Authorization: localStorage.getItem('token')
            }
           })
            console.log(res)
            console.log("try")
            toast("posted")
           } catch (error) {
             console.log(error)
             console.log("afaga ")
           }
        }
    
    return <div className="flex justify-center">
             <div className="w-[1200px] h-full">   
                <div className="flex justify-normal h-20 m-3">
                    <div className="w-20 h-19 rounded-full bg-gray-200 text-[40px] pt-2 text-center text-gray-600">M</div>
                    <div className="h-25 w-[2px] mx-3 bg-gray-300 rounded-full"></div>
                    <input type="text" placeholder="Title" onChange={(e)=>{
                        setTitle(e.target.value)
                    }} className="hover:bg-gray-100 text-5xl font-thin bg-white input input-ghost input-lg w-full max-w-s h-full text-gray-900" />
                </div>
                <textarea onChange={(e)=>{
                    setContent(e.target.value)
                }} className="relative hover:bg-gray-100 bg-white w-full h-[400px] textarea textarea-ghost text-xl text-gray-700" placeholder="Tell your Story"></textarea>
                <button className="ms-[1050px] w-[150px] btn btn-ghost bg-green-600 border-green-600 text-white hover:text-black" onClick={handleClick}>Publish Post</button>   
                   <Toaster/>
             </div>
           </div>
}

export default Publish