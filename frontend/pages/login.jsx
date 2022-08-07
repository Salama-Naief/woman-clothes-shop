import Layout from '../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { API_URL } from '../utils/connectionConfig';
import { Store } from '../utils/Store';

export default function Login() {
  const router=useRouter();
  const {redirect}= router.query
  const {state,dispatch}=useContext(Store);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [errMsg,setErrMsg]=useState('')

 useEffect(()=>{
    if(state.user){
       router.push(redirect?redirect:"/")
    }
 },[state.user])

  const handleSubmit=async(e)=>{
      e.preventDefault();
      const user={
        identifier:email,
        password
     }
     
     const res =await fetch(`${API_URL}/api/auth/local`,{
        method:"POST",
        headers:{
            "accept":"application/json",
            "Content-type":"application/json"
         },
         body:JSON.stringify(user)
     });

     const loginUser=await res.json();
     if(loginUser.error){
      setErrMsg(loginUser.error.message)
     }else{
      dispatch({type:"USER_LOGIN",payload:loginUser})
      setErrMsg("")
     }

  }
  return (
   <Layout title="login">
      <div className='container mx-auto flex justify-center my-8 px-4 '>
         <div className=" bg-white text-gray-900 bottom-0 right-0 w-full md:w-1/2 border border-primary px-4 md:px-8">
               <div className="text-gray-900 text-2xl md:text-3xl w-full text-center my-6 font-semibold">Login here</div>
               {errMsg&&<div className="text-red-600 text-xl w-full text-center my-4">{errMsg}</div>}
               <form className="" onSubmit={handleSubmit}>
               <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} required className="outline-none border border-gray-400 my-4 w-full px-4 py-2" placeholder="Email"/>
               <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} required className="outline-none border border-gray-400 my-4 w-full px-4 py-2" placeholder="Password"/>
               <button type="submit" className="bg-primary py-2 w-full text-white ">LOGIN</button>
               </form>
               <div className="text-gray-900 my-4"><span>don't have account?</span><Link href='/register'><a><span className="text-secondary cursor-pointer mx-1">Register</span></a></Link></div>
               </div>
      </div>
    </Layout>
  )
}
