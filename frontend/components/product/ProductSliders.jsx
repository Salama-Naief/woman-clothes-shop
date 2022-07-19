import React, { useState } from "react";
import Slider from "react-slick";
import {motion} from "framer-motion"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineFavoriteBorder } from "react-icons/md";
export default function ProductSliders({productHover}) {

    const[nav1,setNav1]=useState(null)
    const[nav2,setNav2]=useState(null)
    const[img,setImg]=useState("https://cdn.shopify.com/s/files/1/1825/4753/products/product-clothes-15_ccda53b5-213e-4168-82fd-6d02c77dac26.jpg?v=1606028545")
    
   const hoverdImg="https://cdn.shopify.com/s/files/1/1825/4753/products/product-clothes-12_e0fc0985-0f1b-4f08-a37c-c471b512c733.jpg?v=1606361165";
   const unHoverdImg="https://cdn.shopify.com/s/files/1/1825/4753/products/product-clothes-15_ccda53b5-213e-4168-82fd-6d02c77dac26.jpg?v=1606028545";
  
    return (
      <motion.div className="w-full"
       
      >
        <Slider
          asNavFor={nav2}
          ref={slider => setNav1(slider)}
        >
           <div className="relative flex justify-center  overflow-hidden bg-gray-100">
                <img src={img} alt="" className={`w-full h-80 object-contain `} />
                <button  className={`left-0 right-0 mx-8 absolute z-20 bottom-8  transition ease-in-out delay-100 duration-500 border border-primary bg-white text-primary hover:bg-primary py-2 px-6 hover:text-white uppercase ${productHover?"hover:block":"hidden"}`}>add to card </button>
            </div>

        </Slider>
        <div className="flex justify-between items-center px-4 my-4">
            <div className="font-semibold uppercase text-sm text-third"> name</div>
            <MdOutlineFavoriteBorder className="cursor-pointer"/>
        </div>
        <Slider
          asNavFor={nav1}
          ref={slider => setNav2(slider)}
          slidesToShow={1}
          swipeToSlide={true}
          focusOnSelect={true}
          className="px-4"
        >
            <div className="flex justify-center ">
                
                <div className="relative bg-gray-100 w-7 h-7 overflow-hidden rounded-full border border-secondary p-0.5">
                    <img src="https://cdn.shopify.com/s/files/1/1825/4753/products/product-clothes-15_ccda53b5-213e-4168-82fd-6d02c77dac26.jpg?v=1606028545" className="h-full w-full rounded-full object-cover" alt="" />
                </div>
            </div>
        </Slider>
      </motion.div>
    );
  
}