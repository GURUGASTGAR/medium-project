/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignupInput } from "@yorichi/medium-common"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import toast, { Toaster } from "react-hot-toast"




function Auth({ type }: { type: 'signup' | 'login'} ) {
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false);
  const [postInputs,setPostInputs]= useState<SignupInput>({
    email:"",
    password:"",
    name:""
  })
  async function sendRequest() {
       try {
        setLoading(true)
        const response = await axios.post(`${BACKEND_URL}/user/${type === 'signup'?'signup':'signin'}`,postInputs);
        const jwt = response.data;
        console.log(jwt)
        localStorage.setItem('token',jwt.token);
        navigate("/blogs");
       } catch (error:any){
        console.log(error.response.data.msg);
        toast(error.response.data.msg)
       }finally{
        setLoading(false)
       }
  }
  console.log(postInputs)
  return (
    <div className="h-screen flex justify-center bg-white">
      <div className=" flex flex-col justify-center">
        <div className="text-gray-900 text-4xl font-extrabold text-center ">
          Create an account
        </div>
        <div className="text-gray-500 font-semibold text-center pt-2 text-lg ">
               {type === 'signup'?"Already have an account?":"Don't have an account"}
               <Link to={type === 'signup'?'/login':'/signup'} className="underline mx-1 hover:text-blue-500">
                {type ==="signup"?"Login":"SignUp"}</Link>
        </div>
        <div>{type==='signup'?<InputLabel label={"Username"} placeHolder={"enter your name"} type={"text"} onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            name:e.target.value,
          })
        }} />:<div></div>}</div>
        <InputLabel label={"Email"} placeHolder={"m@example.com"} type={"text"}onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            email: e.target.value
          })
        }} />
        <InputLabel label={"Password"} placeHolder={"********"} type={"password"} onChange={(e)=>{
          setPostInputs({
            ...postInputs,
            password:e.target.value
          })
        }} />
       <div>
       <button className="bg-gray-950 text-white w-[400px] h-[50px] my-5 rounded-lg hover:scale-105
         hover:bg-gray-800" onClick={sendRequest}>{loading?<span className="loading loading-bars"></span>:(type === 'signup'?'SignUp':'Login')}</button>
         <Toaster/>
       </div>
      </div>
    </div>
  )
}

interface LabledInputType {
  label?: string,
  placeHolder?: string,
  onChange?: (e: ChangeEvent<HTMLInputElement>)=> void,
  type?: string
}

function InputLabel({ label, placeHolder, onChange, type}:LabledInputType){
    return <div className="my-1">
        <div className="py-2 text-[19px] font-semibold">{label}</div>
        <input  className="w-[400px] h-15 border-2 bg-white border-gray-300 rounded-lg p-2 text-gray-500 font-semibold 
         hover:scale-105 hover:bg-slate-50" type={type || "text"} placeholder={placeHolder} onChange={onChange}/>
    </div>
}

 
        
  

export default Auth