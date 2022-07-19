
import { useState } from "react"
import {MdOutlineShoppingBasket} from "react-icons/md"
import ProductSliders from "./ProductSliders"
export default function ProductCard(){
    const [productHover,setProductHover]= useState(false)
    return(
        <div className="relative h-fit border mx-4 font-serif" onMouseEnter={()=>setProductHover(true)} onMouseLeave={()=>setProductHover(false)}>
           <ProductSliders productHover={productHover}/>
            <div className="px-4">
                <div className="absolute left-1 top-1">
                    <div className=" bg-secondary  rounded px-2 py-0.5  text-white">-11%</div>
                    <div className=" bg-primary my-1 rounded px-2 py-0.5  text-white">new</div>
                </div>
                
                <div className="py-2"> small dseisctription</div>
                <div className=" flex justify-between">
                <div className="font-bold pb-2 text-gray-500 line-through "> $156.0</div>
                <div className="font-bold pb-2 text-secondary"> $156.0</div>
                </div>
            </div>
        </div>
    )
}