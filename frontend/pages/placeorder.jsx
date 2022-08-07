import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import shortid from 'shortid';
import Stipper from '../components/payments/Stipper';
import { API_URL } from '../utils/connectionConfig';
import {Store} from '../utils/Store' 
export default function Placeorder() {
    const{state,dispatch} =useContext(Store);
    const router =useRouter();
    const{user,cart:{cartItems,shipping,paymanetMethod}}=state;

    const round=(c)=>Math.round(c)
    const price=cartItems?round(cartItems.reduce((a,c)=>a+c.quantity*(c.offer?c.offer:c.price),0)):0;
    const numItems=cartItems?cartItems.reduce((a,c)=>a+c.quantity,0):0;
    const shippingCost=price>=100?0:round(price*(20/100))
    const taxCost=round(price*(20/100));
    const totalCost=parseInt(price)+parseInt(shippingCost)+parseInt(taxCost)
    const [cartData,setCartData]=useState([]);
    const [errMessage,setErrMessage]=useState('');
    useEffect(()=>{
        if(!shipping){
          router.push("/shipping")
        }
        if(cartItems<=0){
          router.push("/")
        }
        const cartItemsData=cartItems?.map(item=>({product:{
            name:item.name,
            id:item.id,
            image:item.productImg.data[0].attributes.url,
            price:item.price,
            offer:item.offer,
            slug:item.slug,
            color:item.color,
            size:item.size,


        }}))
       setCartData(cartItemsData);
    },[])

    
        
      const handleOrder=async()=>{
       const order={
            data:{
                slug:shortid.generate(),
                userName:user.user.username,
                userId:toString(user.user.id),
                cartItems:cartData,
                shippingData:shipping,
                paymentMethod:paymanetMethod,
                price:price,
                shippingCost:shippingCost,
                texCost:taxCost,
                totalPrice:totalCost,
                numOfItems:numItems
            }
        }
        
        const res =await fetch(`${API_URL}/api/orders`,{
            method:"POST",
            headers:{
                "accept":"application/json",
                "Content-type":"application/json"
             },
             body:JSON.stringify(order)
         });
    
         const orderData=await res.json();
         if(orderData.error){
            setErrMessage(orderData.error.message);
         }
         if(orderData.data){
            setErrMessage('');
            dispatch({type:"CLEAR_CARITEMS"})
            dispatch({type:"ORDER_COMPLEATE"})
            router.push(`/order/${orderData.data.attributes.slug}`)
         }
         
      }
  return (
    <div className='container mx-auto px-2 my-10'>
         <div className="w-full ">
        <Stipper/>
        </div>
        <h1 className='text-2xl md:text-3xl my-4 font-bold w-full text-center'>PlaceOrder</h1>
       
        <div className='grid md:grid-cols-4'>
            
            <div className='md:col-span-3'>
            <div className='shadow my-4 px-4'>
                <h1 className='text-2xl'>Shipping Data</h1>
                <div className="py-4 flex">
                    <span className='mx-2'>{shipping.fullname}</span>
                    <span className='mx-2'>{shipping.address}/</span>
                    <span className='mx-2'>{shipping.city}/</span>
                    <span className='mx-2'>{shipping.countary}/</span>
                    <span className='mx-2'>{shipping.postalCode}</span>
                </div>
            </div>
            <div className='shadow my-4 px-4'>
                <h1 className='text-2xl capitalize'>payment method</h1>
                <div className="py-4 flex">
                    <span className='mx-2 capitalize'>{paymanetMethod}</span>
                   
                </div>
            </div>
            <table className="table-auto text-left w-full shadow my-4 px-4">
                <thead className='border-b border-gray-400'>
                    <tr className=''>
                    <th className='py-4'>Name</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Offer</th>
                    </tr>
                </thead>
                <tbody>
                   {cartItems?.map(item=>(<tr className='border-b border-gray-400'>
                    <td className='py-2'>
                        <Link href={`/product/${item.slug}`}>
                        <a>
                            <div className="flex items-center">
                                <img src={`${API_URL}${item.productImg.data[0].attributes.url}`} className="h-20 w-16 object-cover" alt={item.productImg.data[0].attributes.name} />
                                <div className='mx-2 capitalize'>{item.name}</div>
                            </div>
                        </a>
                        </Link>
                    </td>
                    <td>{item.color}</td>
                    <td>{item.size}</td>
                    <td className='text-gray-400 line-through'>${item.price}</td>
                    <td className='text-secondary'>${item.offer?item.offer:0}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <div className="md:col-span-1 shadow-md  px-4 mx-4">
                {errMessage!==""?<div className='my-4 text-red-600'>{errMessage}</div>:null}
                <div className='flex justify-between my-4'>
                    <div className="font-semibold">Items</div>
                    <div className="">({numItems})tems</div>
                </div>
                <div className='flex justify-between my-4'>
                    <div className="font-semibold">price</div>
                    <div className="">${price}</div>
                </div>
                <div className='flex justify-between my-4'>
                    <div className="font-semibold">Tax</div>
                    <div className="">${taxCost}</div>
                </div>
                <div className='flex justify-between my-4'>
                    <div className="font-semibold">Shipping</div>
                    <div className="">${shippingCost}</div>
                </div>
                <div className='flex justify-between my-4'>
                    <div className="font-semibold">TotalCost</div>
                    <div className="text-secondary">${totalCost}</div>
                </div>
                <button onClick={()=>handleOrder()} className='w-full bg-primary text-white uppercase my-4 py-2'>Order</button>
               <Link href={`/payment`} passHref>
                 <a>
                    <div className='w-full text-center bg-gray-50 text-gray-900 uppercase  py-2 border border-secondary'>back</div>
                  </a>
                </Link>
            </div>
        </div>
    </div>
  )
}
