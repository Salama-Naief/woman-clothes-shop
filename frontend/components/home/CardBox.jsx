import { useState } from "react"
import {motion} from "framer-motion"; 
import { API_URL } from "../../utils/connectionConfig";
import Link from "next/link";

const CardBox=({collection,hight})=>{
  
   const[imgStyle,setImgStyle]=useState({});


    const handleEnterStyle=()=>{
      setImgStyle({
        scale:"scale-125",
        opacity:"opacity-50"
      })
    }
    const handleLeaveStyle=()=>{
        setImgStyle({
          scale:"",
          opacity:""
        })
      }
  return(
     <div className="p-4 font-serif my-4 w-full">
         <div className="flex items-center justify-center ">
            <div className={`text-primary text-xl  relative  h-64 ${hight} overflow-hidden w-full`}>
                <img src={`${API_URL}${collection.img.data.attributes.url}`} alt=""  className={` ${imgStyle.scale} ${imgStyle.opacity} w-full transition ease-in-out delay-100 duration-500 h-full object-cover`}/>
                <div onMouseOver={()=>handleEnterStyle()} onMouseLeave={()=>handleLeaveStyle()} className="absolute top-0 left-0 w-full h-full  flex justify-center">
                   <div className="absolute w-full z-10 bottom-10 text-center">
                  
                    <Link href={`/products/${collection.category}-products`}><button className="w-3/4 transition ease-in-out delay-100 text-gray-900 duration-400 hover:bg-secondary hover:text-white  border bg-gray-100 border-primary py-2 px-6 capitalize">{collection.subTitle}</button></Link>
                   </div>
            </div>

            </div>
         
         </div>
     </div>
    )
}

export default CardBox