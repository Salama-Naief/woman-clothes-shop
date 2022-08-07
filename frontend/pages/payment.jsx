import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/Layout';
import Stipper from '../components/payments/Stipper';
import {Store} from '../utils/Store' 
export default function Pyament() {
    const{state,dispatch} =useContext(Store);
    const router =useRouter();
    const{cart:{cartItems,paymanetMethod,shipping}}=state;
    const [paymentMathod,setPaymantMathod]=useState("");


    useEffect(()=>{
      if(!shipping){
        router.push("/shipping")
      }
      if(cartItems<=0){
        router.push("/")
      }
      setPaymantMathod(paymanetMethod)
    },[])
    const handlePaymentMetod=(e)=>{
      e.preventDefault()
      if(paymentMathod!==''){
        dispatch({type:"ADD_PAYMENT_METHOD",payload:paymentMathod})
        router.push("/placeorder")
      }
    }
  return (
    <Layout title="payments">
      <div className='container mx-auto px-2 my-10'>
        <div className="w-full md:w-2/3 mx-auto my-4">
          <Stipper/>
          </div>
        <h1 className='text-2xl md:text-3xl my-4 font-bold w-full text-center '>Payment Method</h1>
        
          <div className='w-full md:w-1/2 mx-auto shadow flex justify-center flex-col my-4 p-4'>
              <div className="my-4 font-semibold text-xl text-left"> Paymant Method</div>
              <form onSubmit={handlePaymentMetod} >
                <label className="block my-2">
                <input type="radio" value="paypal" checked={paymentMathod==="paypal"?paymentMathod:""} name="paypal" onChange={(e)=>setPaymantMathod(e.target.value)} /> <span className='text-lg'>Paypal</span>
                </label>
                <label className=" block my-2">
                <input type="radio" value="stripe" checked={paymentMathod==="stripe"?paymentMathod:""} name="stripe" onChange={(e)=>setPaymantMathod(e.target.value)} /> <span className='text-lg'>Stripe</span>
                </label>
                <label className=" block my-2">
                <input type="radio" value="cash" checked={paymentMathod==="cash"?paymentMathod:""} name="cash"  onChange={(e)=>setPaymantMathod(e.target.value)} /> <span className='text-lg'>Cash</span>
                </label>
              <button type='submit' className='bg-primary text-white uppercase py-2 w-full text-center my-4'>continue</button>
              <Link href={`/shipping`} passHref>
                  <a>
                      <div className='w-full text-center bg-gray-50 text-gray-900 uppercase py-2 border border-secondary'>back</div>
                    </a>
                  </Link>
              </form>
              
          </div>
      </div>
    </Layout>
  )
}
