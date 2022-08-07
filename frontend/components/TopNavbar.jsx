import Link from "next/link"
import {useContext, useEffect,useState } from "react"
import {motion} from 'framer-motion'
import { API_URL } from "../utils/connectionConfig"
import { Store } from "../utils/Store"
import { MdOutlineShoppingBasket,MdOutlineClear } from "react-icons/md"
import {TbHeart} from "react-icons/tb";

const varient={
  hidden:{
    y:100,
    opacity:0
  },
  visable:{
    y:0,
    opacity:1,
    transition:{
      duration:0.5,
      ease:"easeInOut"
    }
  }
}


function TopNavbar({pages}){  
  const {state,dispatch}=useContext(Store);
  const [hoverPage,setHoverPage]=useState(null);
  const [cartProduct,setCartProduct]=useState([]);
  const [user,setUser]=useState(null);
  const pagesContent=pages.length>0?pages:state.pages
  const [menuCart,setMenuCart]=useState(false);
  useEffect(()=>{
     if(pages.length>0){
      dispatch({type:"ADD_PAGES",payload:pages})
     }
      setCartProduct(state.cart.cartItems)
      setUser(state.user);
  },[state])


  const handleUpdate=(qty,product)=>{
    const quantity= parseInt(qty);
    dispatch({type:"ADD_TO_CART",payload:{...product,quantity:quantity}})
  }
  
  const handleRemoceCart=(product)=>{
    dispatch({type:"REMOVE_FROM_CART",payload:{...product}})
  }

  return(
    <div className={`w-full z-20  top-0 font-serif sticky shadow-xl border-t md:block hidden `} >
      
      <div className={`px-2 z-10 flex justify-between  bg-white w-full text-gray-900 py-2.5`}>
        <div className="container flex justify-between mx-auto text-base">
          <div className="flex">
              {
              pagesContent.map(page=>(
                <div key={page.id} className="relative">

                      <motion.div whileHover={()=>setHoverPage(page.attributes.name)} onMouseLeave={()=>setHoverPage(null)} className="relative transition ease-in-out delay-100 duration-400 hover:bg-secondary hover:text-white mx-1 md:mx-4 px-1 md:px-3 py-1 capitalize">
                      <Link href={`${page.attributes.name=="home"?"/":`/products/all-${page.attributes.slug}`}`}><a><span className="font-bold cursor-pointer">{page.attributes.name}</span></a></Link>
                        { page.attributes.name===hoverPage&&page.attributes.name!=="home"&&<motion.div
                            variants={varient}
                            initial="hidden"
                            animate="visable"
                            className="absolute top-8 h-40 flex  left-0 bg-white w-fit z-30 border border-primary">
                              <div className="flex">
                                {
                                  page.attributes.categories.data.length>0&&<div className="capitalize text-gray-900 p-4 mx-2">
                                    <div className="text-xl  font-md">categoy</div>
                                    {
                                    page.attributes.categories.data.map(category=>(
                                      <Link key={category.id} href={`/products/category-${category.attributes.slug}`}><a><div className="text-gray-600 px-2 test-sm  py-1 transition ease-in-out  duration-600 hover:bg-secondary hover:text-white">{category.attributes.name}</div></a></Link>
                                    ))

                                    }
                                  </div>
                                  }
                                {page.attributes.collections.data.length>0&&<div className="capitalize text-gray-900 p-4 w-fit mx-2">
                                <div className="text-xl  font-md">collections</div>
                                  {
                                    page.attributes.collections.data.map(collection=>(
                                      <Link key={collection.id} href={`/products/collections-${collection.attributes.slug}`}><a><div className="text-gray-600 text-sm px-2 w-fit py-1 transition ease-in-out delay-100 duration-400 hover:bg-secondary hover:text-white">{collection.attributes.name}</div></a></Link>
                                      ))  
                                  }
                                    </div>
                                }
                          </div>
                            <div className="p-4 flex justify-center ">
                            { page.attributes.newImg.data&&<Link href={`/products/new-${page.attributes.slug}`}><a><div className="h-full w-28 mx-2 relative">
                                <img src={`${API_URL}${page.attributes.newImg.data.attributes.url}`} className="w-full h-full object-cover" alt="ss" />
                                <div className="font-semibold bg-gray-100 text-sm text-gray-900 absolute bottom-0 left-0 z-20 w-full text-center border border-secondary">{page.attributes.newText}</div>
                              </div>
                              </a></Link>
                            }
                            {page.attributes.offerImg.data&&<Link href={`/products/sales-${page.attributes.slug}`}><a> <div className="h-full w-28 mx-2 relative">
                                <img src={`${API_URL}${page.attributes.offerImg.data.attributes.url}`} className="w-full h-full object-cover" alt="ss" />
                                <div className="font-semibold bg-gray-100 text-sm text-gray-900 absolute bottom-0 left-0 z-20 w-full text-center border border-secondary">{page.attributes.offerText}</div>
                              </div>
                              </a></Link>
                            }
                            {page.attributes.popularImg.data&&<Link href={`/products/popular-${page.attributes.slug}`}><a> <div className="h-full w-28 mx-2 relative">
                                <img src={`${API_URL}${page.attributes.popularImg.data.attributes.url}`} className="w-full h-full object-cover" alt="ss" />
                                <div className="font-semibold bg-gray-100 text-sm text-gray-900 absolute bottom-0 left-0 z-20 w-full text-center border border-secondary">{page.attributes.popularText}</div>
                              </div>
                              </a></Link>
                            }
                            </div>
                          </motion.div>}
                      </motion.div>
                
                </div>
              ))
            }   
          </div>
              <div className="flex">
                <div className="mx-4 flex justify-end relative text-gray-900" onClick={()=>setMenuCart(!menuCart)}>
                  <TbHeart className="text-3xl cursor-pointer"/>
                  <div className="absolute bg-primary bottom-6 -right-1 text-white flex justify-center items-center px-1 text-sm rounded-full">{state.cart.cartItems.length>0?state.cart.cartItems.length:"0"}</div>
              </div> 
              <div className="mx-1 flex justify-end relative text-gray-900" onClick={()=>setMenuCart(!menuCart)}>
                  <MdOutlineShoppingBasket className="text-3xl font-light cursor-pointer"/>
                  <div className="absolute bg-secondary bottom-6 -right-1 text-white flex justify-center items-center px-0.5 md:px-1 text-sm rounded-full">{state.cart.cartItems.length>0?state.cart.cartItems.length:"0"}</div>
              </div> 
              </div>
        </div>
            
        {
            <motion.div initial={{opacity:0,x:600}} animate={{opacity:1,x:menuCart?0:600}} transition={{duration:0.4,ease:"easeInOut",type:"tween"}} className="z-50 bg-white text-gray-900 fixed bottom-0 right-0 w-5/6 md:w-1/3  h-full border border-gray-400 px-8">
            <div className="">
              <div className="absolute top-5 left-5 text-xl md:text-2xl md:p-1 p-0.5 border border-secondary rounded-full cursor-pointer" onClick={()=>setMenuCart(false)}><MdOutlineClear/></div>
              <div className="text-gray-900 text-xl md:text-3xl w-full text-center my-6">Product Cart</div>
             {cartProduct.length<=0&& <div className="text-red-600  w-full text-center ">No Product in Cart </div>}
            </div>
            {cartProduct.length>0&&<div className="overflow-y-auto overflow-x-hidden h-2/3 scroll-smooth scroll-m-0 scroll-p-0 mt-4">
            {cartProduct.length>0&&cartProduct.map(product=>(
                <div key={product.slug} className="border border-gray-400 relative p-1 my-2">
                    <div className="absolute md:top-1 top-0.5 right-0.5 md:right-1 text-gray-900 border border-secondary rounded-full cursor-pointer" onClick={()=>handleRemoceCart(product)}><MdOutlineClear/></div>
                  <div className="flex">
                    <div className="w-1/3 h-24 overflow-hidden bg-gray-100">
                        <img src={`${API_URL}${product.productImg.data[0].attributes.url}`} className="w-full h-full object-contain" alt={product.productImg.data[0].attributes.name}/>      
                    </div>
                    <div className="flex w-2/3 px-4 items-center justify-between">
                    <div className="flex text-gray-900 flex-col items-between">
                        <div className="py-1">{product.name}</div>
                        <div className="py-1">{product.color}</div>
                        <div className="pt-1">{product.size}</div>
                    </div>
                    <div className="justify-end flex flex-col items-end h-full">
                      
                        <input value={product.quantity} onChange={e=>handleUpdate(e.target.value,product)} type="number" className="outline-none w-10 px-1 md:my-4 my-1 text-gray-900 border border-gray-400"/>
                        <div className="py-2 text-secondary ">${product.price}</div>
                    </div>
                    </div>
                  </div>
                </div>
            ))}
            
            </div>
           }
            <div className="flex justify-between px-4 text-gray-900 p-2 border border-gray-400 mt-6 mb-4"><div >Subtotal <span className="text-secondary mx-0.5">({cartProduct.reduce((a,c)=>a+c.quantity,0)})</span>items</div> <div>TotalPrice:$<span className="text-secondary mx-0.5">{cartProduct.reduce((a,c)=>a+c.quantity*(c.offer?c.offer:c.price),0)}</span></div></div>
             <Link href="/shipping"><a> <button onClick={()=>closeMenus()} className="bg-primary py-2 w-full text-white mb-4">CHECHOUT</button></a></Link>
            </motion.div>
          }
      </div>
      
      
    </div>
    )
}



export default TopNavbar;