import { useState } from "react"
import {motion} from "framer-motion"; 

const CardBox=({name})=>{
  
   const[imgStyle,setImgStyle]=useState({});
   const[btnStyle,setBtnStyle]=useState({});
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
     <div className="p-4 font-serif my-6">
         <div className="bg-red-100 flex items-center justify-center ">
            <div className="text-gray-900 text-xl md:text-3xl relative h-64 md:h-96 overflow-hidden">
                <img src="https://cdn.shopify.com/s/files/1/1825/4753/files/banner-collection.jpg?v=1605179956" alt=""  className={` ${imgStyle.scale} ${imgStyle.opacity} w-full transition ease-in-out delay-100 duration-500 h-full object-cover`}/>
                <div onMouseOver={()=>handleEnterStyle()} onMouseLeave={()=>handleLeaveStyle()} className="absolute top-0 left-0 w-full h-full  flex justify-center">
                    <motion.button   className="absolute z-10 bottom-1/4 border text-gray-900 bg-white border-primary py-4 px-6 uppercase"
                      whileHover={{x:0,backgroundColor:"rgb(0, 0, 102)",color:"white"}}
                    >{name?name:""}</motion.button>
                </div>

            </div>
         
         </div>
     </div>
    )
}

export default CardBox