import { useState } from 'react'
import { MdOutlineFavoriteBorder ,MdOutlineWifiCalling3} from 'react-icons/md'
import SingleProductSliders from '../components/product/SingleProductSlider'
import {TbTruckReturn,TbTruckDelivery} from 'react-icons/tb'

import Slider from "../components/home/Slider"

export default function (){
   const [qty,setQty]= useState(1);
   const [overlay,setOverlay]= useState(false);
    return(
        <div className="container relative  mx-auto my-4 h-fit font-serif">

            <div className="grid md:grid-cols-2">
                <div className="col-span-1 h-full text-center">
                    <SingleProductSliders type="product"/>
                    <button className='my-4 border border-gray-400 w-1/2 py-4 font-semibold '><div className='flex items-center justify-center'><MdOutlineWifiCalling3 className='text-3xl '/><span className='mx-2'>Ask Experts</span></div></button>
                </div>
                <div className='col-span-1  py-4 mx-4  md:mx-8'>
                    <div className='flex text-gray-400'>
                        <span>/Home </span>
                        <span>/Collection name </span>
                        <span>/Product name </span>
                    </div>
                    <div className="text-3xl py-4 font-bold">
                        Product Name
                    </div>
                    <div className='py-2 text-gray-400'>avilabletiy: <span className='text-gray-900'>2 in stock</span></div>
                    <div className='py-2 text-gray-400'>product type: <span className='text-gray-900'>Dincidunteros</span></div>
                    <div className='py-4 text-3xl font-bold'>$188.0</div>
                    <div className='text-gray-700'>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </div>
                    <div className="text-gray-400 mt-8">Color : <span className='text-gray-900'>White</span></div>
                    <div className="w-20 h-32">
                      <img src="https://cdn.shopify.com/s/files/1/1825/4753/products/product-clothes-15_ccda53b5-213e-4168-82fd-6d02c77dac26.jpg?v=1606028545" className="h-full w-full object-contain" alt="" />
                    </div>
                    <div className="text-gray-400 mt-8 py-2">Size : <span className='text-gray-900'>S</span></div>
                    <div className="border border-gray-400 py-2 px-8 w-fit">S</div>
                    <div className="py-8 text-red-600">Harry up! only 2 left </div>
                    <div className="md:flex ">
                       <div className="flex justify-between my-4 md:my-0">
                        <div className="border border-gray-400 p-4 w-fit flex justify-center mx-4">
                            <input type="number" onChange={(e)=>setQty(e.target.value)} className='text-xl outline-none w-12' value={qty} min={1} />
                        </div>
                         <button className="border border-gray-400 p-4 w-fit mx-4 flex md:hidden justify-center ">
                            <MdOutlineFavoriteBorder className='text-2xl'/>
                        </button>
                        </div>
                        <button className="border border-primary bg-primary md:flex-grow text-white p-4 w-full flex justify-center text-xl ">
                            Add To Card
                        </button>
                        <button className="border border-gray-400 p-4 w-fit mx-4 md:flex hidden justify-center ">
                            <MdOutlineFavoriteBorder className='text-2xl'/>
                        </button>
                    </div>
                    <button className="my-8 md:mx-4 border border-primary bg-white  text-gray-900 p-4 w-full flex justify-center text-xl ">
                           Buy Now
                    </button>
                    <div className="text-gray-400 my-4 py-2 text-xl font-semibold">total: <span className='text-gray-900 mx-1'>$188.0</span></div>
                    <div className="text-gray-500 my-4 py-2 text-sm"> 
                        <div className="flex items-center cursor-pointer">
                            <TbTruckDelivery className='text-3xl'/>
                            <span className='text-gray-900 font-semibold mx-2'>Free Shipping</span>
                        </div>
                        <div className='text-gray-400 mx-4 mt-2 cursor-pointer'onClick={()=>{setOverlay(true)}}>Free standard shipping on orders over $99</div>
                        <div className='text-gray-400 mx-4 my-2 cursor-pointer'onClick={()=>{setOverlay(true)}}>Estimated to be delivered on 12/01/2022 - 15/10/2022.Estimated to be delivered on 12/01/2022 - 15/10/2022.</div>
                    </div>
                    <div className="text-gray-500 my-4 py-2 text-sm"> 
                        <div className="flex items-center cursor-pointer">
                            <TbTruckReturn className='text-3xl'/>
                            <span className='text-gray-900 font-semibold mx-2'onClick={()=>{setOverlay(true)}}>Free Return</span>
                        </div>
                        <div className='text-gray-400 mx-4 mt-2 cursor-pointer'onClick={()=>{setOverlay(true)}}>Learn more</div>
                    </div>
                </div>
            </div>
           <div className="flex justify-center w-full px-4">
                <div className="md:text-center my-4 md:w-2/3">
                        <div className='text-3xl text-gray-900'>Discription</div>
                        <div className='text-gray-700 my-8'>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                        </div>
                </div>
           </div>
           <div className=''>
              <div className='my-8'><hr/></div>
             <Slider title={`Related Product`}/>
             <Slider title={`Recent Viewed`}/>
           </div>
           {
            overlay&&<div onClick={()=>setOverlay(false)} className='fixed opacity-90 w-screen z-30 h-screen top-0 left-0 flex justify-center items-center bg-stone-400'>
                <div className="bg-white md:w-1/2 h-fit p-8  ">
                    <div className="text-3xl text-center ">Policy of Shipping&&Return </div>
                    <div className='text-gray-700 my-8'>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
                    </div>
                </div>
            </div>
           }
        </div>
    )
}