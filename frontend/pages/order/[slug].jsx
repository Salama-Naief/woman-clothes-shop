import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import Stipper from '../../components/payments/Stipper';
import { API_URL } from '../../utils/connectionConfig';
 
export default function Order({order}) {
    const router =useRouter();

    const [errMessage,setErrMessage]=useState('');
    useEffect(()=>{
       
    },[])

    
        
      const handleOrder=async()=>{
       
      }
  return (
    <>
    {!order?(<div className='w-full h-full flex justify-center items-center text-xl'>Looding..</div>):
    <div className='container mx-auto px-2 my-10'>
        <div className="w-full ">
        <Stipper/>
        </div>
        <h1 className='text-2xl md:text-3xl my-4 font-bold w-full text-center'>Order</h1>
        
        <div className='grid md:grid-cols-4'>
            
            <div className='md:col-span-3'>
                <div className='text-2xl font-semibold'>Order:{order.slug}</div>
            <div className='shadow my-4 px-4'>
                <h1 className='text-2xl'>Shipping Data</h1>
                <div className="py-4 flex">
                    <span className='mx-2'>{order.shippingData.fullname},</span>
                    <span className='mx-2'>{order.shippingData.address},</span>
                    <span className='mx-2'>{order.shippingData.city},</span>
                    <span className='mx-2'>{order.shippingData.postalCode},</span>
                    <span className='mx-2'>{order.shippingData.countary}</span>
                </div>
                <div className="py-2 text-sm">delevered:<span className='text-red-600 capitalize'>not delevers yet</span></div>
                <div className="py-2 text-sm">orderedAt:<span className=' capitalize'>1/2/2023</span></div>
            </div>
            <div className='shadow my-4 px-4'>
                <h1 className='text-2xl capitalize'>payment method</h1>
                <div className="py-4">
                    <span className='mx-2 capitalize font-semibold'>{order.paymentMethod}</span>
                   <div className="my-4 text-sm">Payed:<span className='text-red-600 capitalize'>not payed yet</span></div>
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
                   {order.cartItems?.map(item=>(<tr className='border-b border-gray-400'>
                    <td className='py-2'>
                        <Link href={`/product/${'item.slug'}`}>
                        <a>
                            <div className="flex items-center">
                                <img src={`${API_URL}${item.product.image}`} className="h-20 w-16 object-cover" alt={item.product.name} />
                                <div className='mx-2 capitalize'>{item.product.name}</div>
                            </div>
                        </a>
                        </Link>
                    </td>
                    <td>{item.product.color}</td>
                    <td>{item.product.size}</td>
                    <td className='text-gray-400 line-through'>${item.product.price}</td>
                    <td className='text-secondary'>${item.product.offer?item.product.offer:0}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            <div className="md:col-span-1 shadow-md  px-4 mx-4">
                <div className='flex justify-between my-4'>
                    <div className="font-semibold">Items</div>
                    <div className="">({order.numOfItems})tems</div>
                </div>
                <div className='flex justify-between my-4'>
                    <div className="font-semibold">price</div>
                    <div className="">${order.price}</div>
                </div>
                <div className='flex justify-between my-4'>
                    <div className="font-semibold">Tax</div>
                    <div className="">${order.texCost}</div>
                </div>
                <div className='flex justify-between my-4'>
                    <div className="font-semibold">Shipping</div>
                    <div className="">${order.shippingCost}</div>
                </div>
                <div className='flex justify-between my-4'>
                    <div className="font-semibold">TotalCost</div>
                    <div className="text-secondary">${order.totalPrice}</div>
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
    }
    </>
  )
}

export async function getStaticPaths (){
    const res = await fetch(`${API_URL}/api/orders`)
    const data = await res.json()
   
   const paths=data.data.map(order=>{
        return{
            params:{slug:order.attributes.slug}
        }
    })

    return{
        paths,
        fallback:false
    }
}
export async function getStaticProps(ctx) {
    const {slug} =ctx.params;
    const res = await fetch(`${API_URL}/api/orders?filters[slug][$eq]=${slug}&&populate=*`)
    const order = await res.json()

    return {
      props: {
        order:order.data[0].attributes,
      },
    }
  }