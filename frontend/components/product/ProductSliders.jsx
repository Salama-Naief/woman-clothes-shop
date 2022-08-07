import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import {FlatTree, motion} from "framer-motion"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import Link from "next/link";
import {API_URL} from "../../utils/connectionConfig";
import { Store } from "../../utils/Store";
import { useRouter } from "next/router";


export default function ProductSliders({productHover,product,id}) {
    const router =useRouter();
    const {state,dispatch} =useContext(Store);
    const[nav1,setNav1]=useState(null)
    const[nav2,setNav2]=useState(null)
    const[productId,setProductId]=useState(product.productImg.data[0].attributes.name)
    const [imgHover,setImgHover]=useState(false);
    const [productRate,setProductRate]=useState(product.rate)
    const [waitRes,setWaitRes]=useState(false)
    const [errMsg,setErrMsg]=useState("")
    const handleAddToCart=()=>{
      const item=state.cart.cartItems.find(item=>item.slug===product.slug)
      const qty=item?item.quantity+1:1;
      dispatch({type:"ADD_TO_CART",payload:{...product,quantity:qty}})
      
    }

    useEffect(()=>{
       console.log("router",router)
    },[])
 

  
  const handleLike=async()=>{
     console.log("product",product);
     console.log("product",state.user);
     
      let rate={};
    if(!waitRes&&state.user.user){
      if(product.userLiked){
        if(product.userLiked.filter(a=>a.userId===state.user.user.id).length<0){
          rate={
            data:{
              rate:product.rate+1,
              userLiked:[...product.userLiked,{userId:state.user.user.id}]
            }
         }
        }else{
          rate={
            data:{
              rate:product.rate-1,
              userLiked:product.userLiked.filter(a=>a.userId!==state.user.user.id)
            }
         }
        }
     
      }else{
        rate={
          data:{
            rate:product.rate+1,
            userLiked:[{userId:state.user.user.id}]
          }
       }
      } 
    setWaitRes(true);
     const res =await fetch(`${API_URL}/api/products/${id}`,{
        method:"PUT",
        headers:{
            "accept":"application/json",
            "Content-type":"application/json",
            "authorization":`Bearer ${state.user.jwt}`
         },
         body:JSON.stringify(rate)
     });

     const productRate=await res.json();
     if(productRate.error){
      setWaitRes(false)
      setErrMsg(productRate.error.message)
     }else{
      setProductRate(productRate.data.attributes.rate)
      setErrMsg("")
      setWaitRes(false)
      router.push(router.asPath)
     }
     console.log("rate",productRate)
    }
    }
    return (
      <motion.div className="w-full"
       
      >
        <Slider
          asNavFor={nav2}
          ref={slider => setNav1(slider)}
        >{product.productImg.data.length&&product.productImg.data.map(productImg=>(
          <div key={productImg.attributes.name} className="relative flex justify-center  overflow-hidden ">
          <Link href={`/product/${product?.slug}`}>
            <a onMouseEnter={()=>setImgHover(true)} onMouseLeave={()=>setImgHover(false)}>
             {!imgHover&&<motion.img initial={{opacity:0}}  animate={{opacity:1}} transition={{duration:0.1,ease:"easeInOut"}} src={`${API_URL}${productImg.attributes.url}`} alt="" className={`w-full h-80 object-contain `} />}
            { imgHover&&<motion.img initial={{opacity:0}}  animate={{opacity:1}} transition={{duration:0.1,ease:"easeInOut"}} src={`${API_URL}${product.hoverImg.data.attributes.url}`} alt="" className={`w-full h-80 object-contain `} />}
            </a>
          </Link>
           {productHover&&<motion.button initial={{opacity:0}}  animate={{opacity:1}} transition={{duration:0.2,ease:"easeInOut"}} onClick={()=>handleAddToCart()}  className={`left-0 right-0 mx-8 absolute z-20 bottom-8  transition ease-in-out delay-0 duration-500 border border-primary bg-white text-primary hover:bg-primary py-2 hover:text-white uppercase `}>add to card </motion.button>}
        </div>
        ))
          
         }
        </Slider>
        <div className="flex justify-between items-center px-4 my-4">
            <div className="font-semibold uppercase text-sm text-third"> {product?.name}</div>
            <div className="flex items-center">
              <div className="text-primary px-2">{productRate}</div>
            <MdOutlineFavoriteBorder onClick={()=>handleLike()} className="cursor-pointer"/>
            </div>
        </div>
        <Slider
          asNavFor={nav1}
          ref={slider => setNav2(slider)}
          slidesToShow={product.productImg.data.length}
          swipeToSlide={true}
          focusOnSelect={true}
          className="px-4"
        >
          {product.productImg.data.length&&product.productImg.data.map(productImg=>(
            <div key={productImg.id} className="flex justify-center ">
                
                <div onClick={()=>setProductId(productImg.attributes.name)} className={`relative cursor-pointer w-7 h-7 overflow-hidden rounded-full border ${productId===productImg.attributes.name?"border-secondary":"border-gray-400"} p-0.5`}>
                    <img src={`${API_URL}${productImg.attributes.url}`} className="h-full w-full rounded-full object-cover" alt="" />
                </div>
            </div>
            ))
           }
        </Slider>
      </motion.div>
    );
  
}