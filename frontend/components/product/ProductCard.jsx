
import { useContext, useState } from "react"
import Link from 'next/link';
import ProductSliders from "./ProductSliders"
import { Offer } from "../../utils/Calc";
import { Store } from "../../utils/Store";
 function ProductCard({product,id}){
    const {state,dispatch}=useContext(Store);
    const [productHover,setProductHover]= useState(false)
 
    const newItem=new Date().getMonth()-new Date(product.createdAt).getMonth()
    const handleViewedCart=()=>{
        dispatch({type:"ADD_VIEWED_CARD",payload:product});
    }
    return(
        <div className="">
           {!product?( <div className="bg-gray-100 h-80  flex justify-center items-center border border-gray-400">
                <div className="text-secondary">Looding..</div>
            </div>):(
             <div onClick={()=>handleViewedCart()} className="relative h-fit border mx-4 font-serif" onMouseEnter={()=>setProductHover(true)} onMouseLeave={()=>setProductHover(false)}>
                <ProductSliders productHover={productHover} id={id} product={product}/>
                    <div className="px-4">
                        <div className="absolute left-1 top-1">
                            {product.offer!==0&&<div className=" bg-secondary  rounded px-2 py-0.5  text-white">-{Offer(product.price,product.offer)}%</div>}
                            <div className={`${newItem>=-1?"bg-primary":"bg-gray-900"}  my-1 rounded px-2 py-0.5  text-white`}>{newItem>=-1?"new":"bundle"}</div>
                        </div>
                    <Link href={`/product/${product.slug}`}>
                            <a>
                                <div className="py-2"> {product.smDisc}</div>
                                <div className=" flex justify-between">
                                <div className={`font-bold pb-2 ${product.offer===0?"text-gray-900":"text-gray-500 line-through"}  `}>$ {product.price}</div>
                               { product.offer!==0&&<div className="font-bold pb-2 text-secondary"> ${product.offer}</div>}
                                </div>
                            </a>
                        </Link> 
                    </div>
                </div>
            )
           }
        </div>
           
        
    )
}


  export default ProductCard;