import axios from 'axios';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
//import { PayPalButtons } from "@paypal/react-paypal-js";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {usePayPalScriptReducer} from "@paypal/react-paypal-js"
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/Layout';
import Stipper from '../../components/payments/Stipper';
import { API_URL } from '../../utils/connectionConfig';
import ReactDOM from "react-dom";




export default function Order({order,pages,errMsg}) {
    //const PayPalButton = window.paypal&&window.paypal.Buttons.driver("react", { React, ReactDOM });
    const router =useRouter();
    //const [{isPending,options},paypalDispatch]=usePayPalScriptReducer();
    const {t}=useTranslation();
    const [errMessage,setErrMessage]=useState('');
    const [pay,setPay]=useState(true);
 
    console.log("paypal",Paypal)

  useEffect(()=>{
        if(window.paypal){
            return;
        }
         const scriptPaypal=document.createElement("script");
         scriptPaypal.src=`https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`
         document.body.appendChild(scriptPaypal);
  },[])

  function Paypal({createOrder,onApprove,onError}){
    const PayPalButton = window.paypal&&window.paypal.Buttons.driver("react", { React, ReactDOM });
    return <PayPalButton 
        createOrder={createOrder}
     onApprove={onApprove}
     onError={onError}
    />;
 }
  /*  useEffect(()=>{
       const getPayPalClitId=async()=>{
          try {
            const {data:clientId}=await axios.get("/api/keys/paypal")
            console.log("clientId",clientId)
            paypalDispatch({type:"resetOptions",value:{
                ...options,
                "client-id":clientId,
                currency:"USD"
            }})

            paypalDispatch({type:"setLoadingStatus",value:"pending"})

          } catch (error) {
            console.log("error",error);
          }
       }
       getPayPalClitId()

    },[])*/

      const handlePayment=async()=>{
       setPay(true);
      }

      // create order
  const createOrder= (data, actions)=>{

    return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value:order.attributes.totalPrice,
                    },
                },
            ],
        })
        
}

//on approve
const onApprove=(data, actions)=> {
    return actions.order.capture()
}

//on Error
const onError =(err)=> {
   console.log("paypal error",err)
}


  return (
    <Layout title={"order page"} pages={pages}>
        {errMsg?(<div className='w-full h-full flex justify-center items-center text-xl text-error'>{t("common:beckend_error")}</div>):
            <div className='container mx-auto px-2 my-10'>
                <div className="w-full ">
                <Stipper/>
                </div>
                <h1 className='text-2xl md:text-3xl my-4 font-bold w-full text-center'>{t("placeorder:order")}</h1>
                
                <div className='grid md:grid-cols-4'>
                    
                    <div className='md:col-span-3'>
                        <div className='text-2xl font-semibold'>{t("placeorder:order")}:{order.id}</div>
                    <div className='shadow my-4 px-4'>
                        <h1 className='text-2xl'>{t("placeorder:shipping_data")}</h1>
                        <div className="py-4 flex">
                            <span className='mx-2'>{order.attributes.shippingData.fullname},</span>
                            <span className='mx-2'>{order.attributes.shippingData.address},</span>
                            <span className='mx-2'>{order.attributes.shippingData.city},</span>
                            <span className='mx-2'>{order.attributes.shippingData.postalCode},</span>
                            <span className='mx-2'>{order.attributes.shippingData.countary}</span>
                        </div>
                        <div className="py-2 text-sm">{t("placeorder:status")}:<span className='text-error capitalize'>{t("placeorder:not_delevers_yet")}</span></div>
                        <div className="py-2 text-sm">{t("placeorder:orderedAt")}:<span className=' capitalize'>1/2/2023</span></div>
                    </div>
                    <div className='shadow my-4 px-4'>
                        <h1 className='text-2xl capitalize'>{t("placeorder:payment_method")}</h1>
                        <div className="py-4">
                            <span className='mx-2 capitalize font-semibold'>{order.attributes.paymentMethod}</span>
                        <div className="my-4 text-sm">{t("placeorder:status")}:<span className='text-error capitalize'>{t("placeorder:not_payed_yet")}</span></div>
                        </div>
                    </div>
                    <table className="table-auto text-left w-full shadow my-4 px-4">
                        <thead className='border-b border-gray-400'>
                            <tr className=''>
                            <th className='py-4 text-center'>{t("placeorder:name")}</th>
                            <th>{t("placeorder:color")}</th>
                            <th>{t("placeorder:size")}</th>
                            <th>{t("placeorder:price")}</th>
                            <th>{t("placeorder:offer")}</th>
                            </tr>
                        </thead>
                        <tbody>
                        {order.attributes.cartItems?.map((item,index)=>(<tr key={index} className='border-b border-gray-400'>
                            <td className='py-2'>
                                <Link href={`/product/${'item.slug'}`}>
                                <a>
                                    <div className="flex items-center">
                                        <div className="w-1/3 h-24 overflow-hidden relative bg-gray-100">
                                            <Image src={`${API_URL}${item.product.image}`} layout="fill" loading='eager'  alt={item.product.name}/>      
                                        </div>
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
                            <div className="font-semibold">{t("placeorder:items")}</div>
                            <div className="">({order.attributes.numOfItems}){t("placeorder:items")}</div>
                        </div>
                        <div className='flex justify-between my-4'>
                            <div className="font-semibold">{t("placeorder:price")}</div>
                            <div className="">${order.attributes.price}</div>
                        </div>
                        <div className='flex justify-between my-4'>
                            <div className="font-semibold">{t("placeorder:tax")}</div>
                            <div className="">${order.attributes.texCost}</div>
                        </div>
                        <div className='flex justify-between my-4'>
                            <div className="font-semibold">{t("placeorder:shipping")}</div>
                            <div className="">${order.attributes.shippingCost}</div>
                        </div>
                        <div className='flex justify-between my-4'>
                            <div className="font-semibold">{t("placeorder:total_cost")}</div>
                            <div className="text-secondary">${order.attributes.totalPrice}</div>
                        </div>
                     {
                       !pay?(<div>
                        <button onClick={()=>handlePayment()} className='w-full bg-primary text-white uppercase my-4 py-2'>{t("placeorder:pay")}</button>
                        <Link href={`/payment`} passHref>
                            <a>
                                <div className='w-full text-center bg-gray-50 text-gray-900 uppercase  py-2 border border-secondary'>{t("placeorder:back")}</div>
                              </a>
                        </Link>
                     </div>):(
                         /* <PayPalButtons
                          createOrder={(data, actions) => createOrder(data, actions)}
                          onApprove={(data, actions) => onApprove(data, actions)}
                          onError={(err)=>onError(err)}
                        />*/
                        <div><Paypal 
                             createOrder={(data, actions) => createOrder(data, actions)}  
                             onApprove={(data, actions) => onApprove(data, actions)}
                             onError={(err)=>onError(err)}/></div>
                     )
                    }
                    </div>
                </div>
            </div>
            }
    </Layout>

  )
}

export async function getStaticPaths ({locales}){
    const res = await fetch(`${API_URL}/api/orders`)
    const data = await res.json()
    
    const paths=[]
   data.data.map(order=>{
    locales.map(locale=>{
         paths.push({params:{id:`${order.id}`},locale})
    })
       
    })

    return{
        paths,
        fallback:false
    }
}
export async function getStaticProps(ctx) {
    const {id} =ctx.params;
    console.group("id",id)
    const locale=ctx.locale;
    try{
        
         const res = await fetch(`${API_URL}/api/orders/${parseInt(id)}`)
        const order = await res.json()
        const pagesRes = await fetch(`${API_URL}/api/pages?populate=*`)
        const pages = await pagesRes.json();  

    return {
      props: {
        order:order.data,
        pages:pages.data||[],
        errMsg:false,
        ...(await serverSideTranslations(locale, ['common',"placeorder"]))
      },
    }
    }catch(err){
        return {
            props: {
                errMsg:true,
                ...(await serverSideTranslations(locale, ['common',"placeorder"]))
            },
          }
    }
   
  }