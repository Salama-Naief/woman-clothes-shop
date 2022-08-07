import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import Stipper from '../components/payments/Stipper';
import { Store } from '../utils/Store'

export default function Shipping() {
  const {state,dispatch}=useContext(Store);
  const router=useRouter();
  const [fullname,setFullname]=useState(state.cart.shipping?state.cart.shipping.fullname:"")
  const [address,setAddress]=useState(state.cart.shipping?state.cart.shipping.address:"")
  const [city,setCity]=useState(state.cart.shipping?state.cart.shipping.city:"")
  const [postalCode,setPostalCode]=useState(state.cart.shipping?state.cart.shipping.postalCode:"")
  const [countary,setCountary]=useState(state.cart.shipping?state.cart.shipping.countary:"")

  useEffect(()=>{
    
     if(!state.user){
       router.push("/login?redirect=/shipping")
     }
     if(state.cart.cartItems.length<=0){
      router.push("/")
    }
  },[])

  const handeSubmit=(e)=>{
    e.preventDefault();
    if(fullname!==''&&address!==''&&city!==''&&postalCode!==''&&countary!==''){
      dispatch({type:"ADD_SHIPPING",payload:{fullname,address,city,postalCode,countary}});
      router.push("/payment")
    }
  }
  return (
    <div className='container mx-auto my-10 text-center '>
       <div className="w-full md:w-2/3 mx-auto my-4">
        <Stipper/>
      </div>
      <h1 className='text-2xl md:text-3xl font-bold my-4'>Shipping</h1>
     
      <div className="flex justify-center">
        <div className=" w-full md:w-1/2 p-4 ">
          <form action="" onSubmit={handeSubmit}>
            <div className='my-4'>
                <div className='text-sm text-gray-900 text-left'>Full Name</div>
                <input type="text" onChange={(e)=>setFullname(e.target.value)} value={fullname} className='text-gray-900 transition ease-in-out delay-0 duration-500 outline-none border focus:border-secondary border-gray-400 w-full px-4 py-1.5' required min={3} placeholder='FullName' />
              </div>
              <div className='my-4'>
                <div className='text-sm text-gray-900 text-left'>Addres</div>
                <input type="text" onChange={(e)=>setAddress(e.target.value)} value={address} className='text-gray-900 transition ease-in-out delay-0 duration-500 outline-none border focus:border-secondary border-gray-400 w-full px-4 py-1.5' required min={3} placeholder='address' />
              </div>
              <div className='my-4'>
                <div className='text-sm text-gray-900 text-left'>City</div>
                <input type="text" onChange={(e)=>setCity(e.target.value)} value={city} className='text-gray-900 transition ease-in-out delay-0 duration-500 outline-none border focus:border-secondary border-gray-400 w-full px-4 py-1.5' required min={3} placeholder='city' />
              </div>
              <div className='my-4'>
                <div className='text-sm text-gray-900 text-left'>PostalCode</div>
                <input type="text" onChange={(e)=>setPostalCode(e.target.value)} value={postalCode} className='text-gray-900 transition ease-in-out delay-0 duration-500 outline-none border focus:border-secondary border-gray-400 w-full px-4 py-1.5' required min={3} placeholder='postalCode' />
              </div>
              <div className='my-4'>
                <div className='text-sm text-gray-900 text-left'>Countary</div>
                <input type="text" onChange={(e)=>setCountary(e.target.value)} value={countary} className='text-gray-900 transition ease-in-out delay-0 duration-500 outline-none border focus:border-secondary border-gray-400 w-full px-4 py-1.5' required min={3} placeholder='countary' />
              </div>
              <button type='submit' className='bg-primary py-2 w-full text-center uppercase text-white my-2'>Continue</button>
          </form>
        </div>
      </div>
    </div>
  )
}
