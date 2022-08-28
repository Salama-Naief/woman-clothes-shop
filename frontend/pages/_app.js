import '../styles/globals.css'
import { appWithTranslation, useTranslation } from 'next-i18next';
import StoreProvider from '../utils/Store'
import { useEffect, useState } from 'react';
import Loading from '../components/loading/Loading';
import NextNProgress from "nextjs-progressbar";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import axios from 'axios';



function MyApp({ Component, pageProps }) {

  const {i18n}=useTranslation();
  const [loading,setLoading]=useState(true)
  const [initoptions,setOptions]=useState({})

  useEffect(()=>{
    if(window.paypal){
        return;
    }
     const scriptPaypal=document.createElement("script");
     scriptPaypal.src=`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`
     document.body.appendChild(scriptPaypal);
},[])

 /* useEffect(()=>{
    const getPayPalClitId=async()=>{
       try {
         const {data:clientId}=await axios.get("/api/keys/paypal")
         console.log("clientId",clientId)
         setOptions({
          "client-id":clientId,
          currency: "USD",
         })


       } catch (error) {
         console.log("error",error);
       }
    }
    getPayPalClitId()

 },[])*/

console.log("optios",initoptions)
  useEffect(()=>{
   setLoading(false)
  },[loading])
  //loading
  if(loading){
    
    return(
        <Loading/>
    )
  }
  return(
    <>
  {/*<PayPalScriptProvider options={{"client-id":process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}}>*/}
            <StoreProvider>
            <div className={`font-serif `} style={{direction:i18n.language==="ar"?"rtl":"ltr"}}>
              <NextNProgress color="#ff8700"/>
              <Component {...pageProps} />
            </div>


            </StoreProvider>
        {/*</PayPalScriptProvider>*/}
        </>
    )
}



export default appWithTranslation(MyApp)
