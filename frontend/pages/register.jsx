import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import {useTranslation} from "next-i18next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '../components/Layout';
import {API_URL} from "../utils/connectionConfig";
export default function Register({pages}) {
  const {t,i18n}= useTranslation();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [username,setUsername]=useState("");
  const [errMsg,setErrMsg]=useState('')
  const handleSubmit=async(e)=>{
      e.preventDefault();
  
        const user={
            username:username,
            email:email,
            password:password
         }

      try{
          const res =await fetch(`${API_URL}/api/auth/local/register`,{
                  method:"POST",
                  headers:{
                      "Accept":"application/json",
                      "Content-type":"application/json"
                  },
                  body:JSON.stringify(user)
              });
              const registerUser=await res.json();
              if(loginUser.error){
                setErrMsg(loginUser.error.message)
              }else{
                dispatch({type:"USER_LOGIN",payload:loginUser})
                setErrMsg("")
              }
      }catch(err){
        setErrMsg("error in server connection")
      }
        

     
  }
  return (
    <Layout title="register page" pages={pages}>
      <div className={`container mx-auto flex justify-center my-8 px-4`} style={{direction:i18n.language==="ar"?"rtl":"ltr"}}>
          <div className=" bg-white text-gray-900 bottom-0 right-0 w-full md:w-1/2 border border-primary px-8">
                <div className="text-gray-900 text-xl md:text-3xl w-full text-center my-6 capitalize">{t('common:register_here')}</div>
                {errMsg&&<div className="text-error text-xl w-full text-center my-4 capitalize">{errMsg}</div>}
                <form className="" onSubmit={handleSubmit}>
                <input type="email" required onChange={(e)=>setEmail(e.target.value)} value={email} className="outline-none border border-gray-400 my-4 w-full px-4 py-2" placeholder={t("common:email")}/>
                <input type="type" required onChange={(e)=>setUsername(e.target.value)} value={username} className="outline-none border border-gray-400 my-4 w-full px-4 py-2" placeholder={t("common:userName")}/>
                <input type="password" required onChange={(e)=>setPassword(e.target.value)} value={password} className="outline-none border border-gray-400 my-4 w-full px-4 py-2" placeholder={t("common:password")}/>
                <button type="submit" className="bg-primary py-2 w-full text-white uppercase">{t("common:register")}</button>
                </form>
                <div className="text-gray-900 my-4"><span>{t("already_have_account")}?</span><Link href="/login"><a><span className="text-secondary cursor-pointer mx-1">{t("common:login")}</span></a></Link></div>
              </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps({locale}) {
  try{
     const pagesRes = await fetch(`${API_URL}/api/pages?populate=*`)
     const pages = await pagesRes.json()
     return {
        props: {
           pages:pages.data||[],
          errMsg:false,
          ...(await serverSideTranslations(locale, ['common']))
        }
      }
  }catch(e){
     return {
        props: {
          errMsg:true,
          ...(await serverSideTranslations(locale, ['common']))
        }
      }
  }
  
}