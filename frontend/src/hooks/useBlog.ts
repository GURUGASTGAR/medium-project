/* eslint-disable react-hooks/rules-of-hooks */

import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
//import toast from "react-hot-toast";
interface Blog {
    id: string,
    title: string,
    content: string,
    author: {
        name:string
    }

}

export const usePost = ({id}:{id:string | undefined}):{loading:boolean; blog:Blog | null}=>{

    const [loading, setLoading]= useState(true)
    const [blog, setBlog]= useState<Blog | null>(null);
    useEffect(()=>{
       axios.get(`${BACKEND_URL}/blog/get/${id}`,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
       })
         .then(response => {
           setBlog(response.data.post);
           console.log(loading)
           console.log(response.data.post)
           setLoading(false)
       })
  },[id,loading]);

  return {
    loading,
    blog,
  }
  
}


const useBlog = ():{ loading:boolean; blogs: Blog[]} => {
  
    const [loading, setLoading]= useState(true);
    const [blogs, setBlogs]= useState([]);
    useEffect(()=>{
       axios.get(`${BACKEND_URL}/blog/bulk`,{
        headers:{
            Authorization: localStorage.getItem('token')
        }
       })
         .then(response => {
           setBlogs(response.data.blogs);
           setLoading(false)
       })
  },[]);

  return {
    loading,
    blogs
  }
 
}

export default useBlog