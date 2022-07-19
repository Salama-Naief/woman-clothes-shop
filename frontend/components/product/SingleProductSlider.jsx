import React, { useState } from "react";
import Slider from "react-slick";
import {motion} from "framer-motion"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineFavoriteBorder } from "react-icons/md";
export default function ProductSliders({productHover,type}) {

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
           <div className="relative flex h-full justify-center  overflow-hidden bg-gray-100">
            <div className="absolute left-1 top-1">
                  <div className=" bg-secondary  rounded px-2 py-0.5  text-white">-11%</div>
                  <div className=" bg-primary my-1 rounded px-2 py-0.5  text-white">new</div>
                </div>
                <img src={img} alt="" className={`w-full h-full object-contain `} />
                
            </div>

        </Slider>
        <Slider
          asNavFor={nav1}
          ref={slider => setNav2(slider)}
          slidesToShow={1}
          swipeToSlide={true}
          focusOnSelect={true}
          className="px-10 my-6 "
        >
            <div className="flex justify-center ">
                
                <div className="relative bg-gray-100 w-16 h-16 overflow-hidden rounded-full border border-secondary p-0.5">
                    <img src="https://cdn.shopify.com/s/files/1/1825/4753/products/product-clothes-15_ccda53b5-213e-4168-82fd-6d02c77dac26.jpg?v=1606028545" className="h-full w-full rounded-full object-contain" alt="" />
                </div>
            </div>
        </Slider>
      </motion.div>
    );
  
}