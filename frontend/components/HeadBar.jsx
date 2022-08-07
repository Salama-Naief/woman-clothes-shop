import Cookies from "js-cookie";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import {motion} from "framer-motion"
import {  MdOutlineDehaze, MdOutlinePersonOutline, 
MdOutlineSearch, MdOutlineShoppingBasket,
MdOutlineClear,MdChevronRight,MdKeyboardArrowDown
} from "react-icons/md";
import { API_URL } from "../utils/connectionConfig";
import { Store } from "../utils/Store";



const HeadBar=({pages})=>{
    const {state,dispatch} =useContext(Store);
    const pagesContent=pages.length>0?pages:state.pages
    const [cartProduct,setCartProduct]=useState([]);
    const [user,setUser]=useState(null);
    const [menuUser,setMenuUser]=useState(false);
    const [menuCart,setMenuCart]=useState(false);
    const [menuItems,setMenItems]=useState(false);
    const [pageItems,setPageItems]=useState("");

    useEffect(()=>{
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
    const closeMenus=()=>{

      setMenItems(false)
      setMenuCart(false)
    }
    const handleMenus=(type)=>{
      switch (type) {
       
        case 'cart':
          setMenItems(false)     
          setMenuCart(true)
          break;
        case 'items':
          setMenItems(true)    
          setMenuCart(false)
          break;
        
        default:
          setMenItems(false)
          setMenuCart(false)
      }
      
    }


   const handleLogout=()=>{
    dispatch({type:"USER_LOGOUT"})
   
   }

    return(
            <div className="container sticky md:static top-0 z-30 md:z-0 w-full bg-white mx-auto flex items-center justify-between py-2 px-2 md:px-0 shadow-sm md:shadow-none font-serif"> 
                  <div className="w-1/2 md:w-1/3 text-xl md:text-3xl font-serif text-gray-900 flex items-center " ><MdOutlineDehaze className="text-2xl cursor-pointer mx-2 md:hidden" onClick={()=>handleMenus('items')}/><Link href="/"><a>SMN</a></Link> </div>
                        <form className="hidden md:flex w-1/3 text-gray-900 border border-gray-400 items-center">
                        <div className="flex items-center w-full">
                            <input type="text" className="flex-grow outline-none px-1 py-0 text-sm md:text-base md:px-4 md:py-1" placeholder="Search"/>
                            <MdOutlineSearch className="text-3xl cursor-pointer "/>
                            </div>
                            </form>
                        <div className="w-1/2 md:w-1/3 flex  items-center">
                        
                            <div className=" w-full items-center flex justify-end md:justify-between">
                            {!user?(
                            <div className="hidden md:flex w-full justify-end items-center mx-1"><Link href="/login"><a className="p-1 rounded-full border border-secondary text-gray-900"><MdOutlinePersonOutline className="text-2xl cursor-pointer"/></a></Link></div>
                            ):(
                            <div className="relative md:w-full hidden md:flex justify-end">
                            <div className="relative">
                                <div onClick={()=>setMenuUser(!menuUser)} className="border capitalize border-primary text-gray-900 text-sm py-0.5 px-1 md:text-base md:px-2 md:py-1 cursor-pointer">{user.user.username}</div>
                                {
                                <motion.div initial={{y:10,opacity:0}} animate={menuUser?{y:0,opacity:1}:{y:10,opacity:0}} transition={{duration:0.2}} className="absolute top-8 left-0 z-30 border border-primary bg-white py-4 px-2">
                                  <button className="py-2 text-center px-4 capitalize hover:bg-secondary hover:text-white">{user.user.username}</button>
                                  <button className="py-2 text-center px-4 hover:bg-secondary hover:text-white">Profile</button>
                                  <button onClick={handleLogout} className="py-2 text-center px-4 hover:bg-secondary hover:text-white">Logout</button>
                                </motion.div>
                                }
                            </div>
                            
                            </div>
                            )}
                            
                            <div className="md:hidden w-1/2 mx-1 flex justify-end relative text-gray-900" onClick={()=>handleMenus("cart")}>
                                <MdOutlineShoppingBasket className="text-2xl md:text-4xl cursor-pointer"/>
                                <div className="absolute bg-secondary bottom-4 md:bottom-6 right-0 text-white px-1 md:px-2 text-sm rounded-full">{state.cart.cartItems.length>0?state.cart.cartItems.length:"0"}</div>
                            </div>
                            </div>
                        </div>

         
          {/*menu cart of product*/}
          {
            <motion.div initial={{x:600}} animate={{x:menuCart?0:600}} transition={{duration:0.4,ease:"easeInOut",type:"tween"}} className="z-50 bg-white text-gray-900 fixed bottom-0 right-0 w-5/6 md:w-1/3  h-full border border-gray-400 px-8">
            <div className="">
              <div className="absolute top-5 left-5 text-xl md:text-2xl md:p-1 p-0.5 border border-secondary rounded-full cursor-pointer" onClick={()=>closeMenus()}><MdOutlineClear/></div>
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
          
              {/*small size menu*/}
          {
            <motion.div initial={{x:-400}} animate={{x:menuItems?0:-400}} transition={{duration:0.2,ease:"easeInOut",type:"tween"}}  className="z-50 md:hidden bg-white text-gray-900 fixed bottom-0 left-0 w-5/6 md:w-1/3 md:h-5/6 border border-gray-400 px-8 h-screen overflow-y-auto overflow-x-hidden ">
              <div className="absolute top-5 right-5 text-xl md:text-2xl p-0.5 md:p-1 border border-secondary rounded-full cursor-pointer" onClick={()=>closeMenus()}><MdOutlineClear/></div>
              <div className="text-gray-900 text-xl md:text-3xl w-full text-center my-6">Menu</div>
              <div className="flex justify-center items-center mx-1">
                {user?(
                    
                    <div className="relative py-2 text-center border capitalize border-gray-400">
                        <div onClick={()=>setMenuUser(!menuUser)} className="font-bold text-gray-900 text-sm py-0.5 px-4 cursor-pointer">{user.user.username}</div>
                        {
                        <motion.div initial={{display:"none"}} animate={menuUser?{display:"block"}:{display:"none"}} transition={{duration:0.2}} className="text-center py-4 px-2">
                          <div className="bg-secondary h-0.5 w-full"></div>
                          <button className=" block px-4 py-2  text-center capitalize hover:bg-secondary hover:text-white">{user.user.username}</button>
                          <button className="blockp py-2 px-4 text-center hover:bg-secondary hover:text-white">Profile</button>
                          <button onClick={handleLogout} className="block px-4 py-2 text-center hover:bg-secondary hover:text-white">Logout</button>
                        </motion.div>
                        }
                    </div>
                
                    )
                    :(
                      <div className="flex justify-center items-center mx-1">
                        <Link href={"/login"}>
                        <a className="p-1 rounded-full border border-gray-400 text-gray-900">
                        <MdOutlinePersonOutline className="text-4xl cursor-pointer"/>
                        </a>
                        </Link>
                      </div>
                      
                    )
                }
              </div>
                <form className="my-4 text-gray-900 border border-gray-400 flex items-center">
                  <div className="flex items-center">
                    <input type="text" className="flex-grow-1 outline-none  w-full px-4 py-2" placeholder="Search"/>
                    <MdOutlineSearch className="text-3xl cursor-pointer"/>
                  </div>
                </form>
            <div className=" text-base ">
             {pagesContent.map(page=>(
                <div key={page.id} className="px-4 my-4 relative py-1.5 border">
                  <div className="w-full flex justify-between font-semibold capitalize">
                     <Link href={`${page.attributes.name=="home"?"/":`/products/all-${page.attributes.slug}`}`}><a><span className="font-bold cursor-pointer">{page.attributes.name}</span></a></Link>
                     <div>
                     <motion.span initial={{display:"block"}} animate={pageItems===page.attributes.name?{display:"none"}:{display:"block"}} transition={{duration:0.2}}  onClick={()=>setPageItems(pageItems!==page.attributes.name?page.attributes.name:'')}><MdChevronRight className="text-2xl text-gray-400 mx-1 cursor-pointer"/></motion.span> 
                     <motion.span initial={{display:"none"}} animate={pageItems===page.attributes.name?{display:"block"}:{display:"none"}} transition={{duration:0.2}}  onClick={()=>setPageItems('')}><MdKeyboardArrowDown className="text-2xl text-gray-400 mx-1 cursor-pointer"/></motion.span> 
                     </div>
                  </div>

                   <motion.div initial={{opacity:0,display:"none"}} animate={(pageItems===page.attributes.name)?{display:"block",opacity:1}:{display:"none",opacity:0}} transition={{duration:0.2}}  className="">
                           { page.attributes.newImg.data&&<Link href={`/products/new-${page.attributes.slug}`}><a><div className="min-h-fit w-full mx-2 relative my-2">
                              <img src={`${API_URL}${page.attributes.newImg.data.attributes.url}`} className="w-full h-full object-cover" alt={page.attributes.offerImg.data.attributes.name} />
                              <div className="font-semibold bg-gray-100 text-sm text-gray-900 absolute bottom-0 left-0 z-20 w-full text-center border border-secondary">{page.attributes.newText}</div>
                            </div>
                            </a></Link>
                           }
                           {page.attributes.offerImg.data&&<Link href={`/products/sales-${page.attributes.slug}`}><a> <div className="min-h-fit w-full mx-2 relative my-2">
                              <img src={`${API_URL}${page.attributes.offerImg.data.attributes.url}`} className="w-full h-full object-cover" alt={page.attributes.offerImg.data.attributes.name}/>
                              <div className="font-semibold bg-gray-100 text-sm text-gray-900 absolute bottom-0 left-0 z-20 w-full text-center border border-secondary">{page.attributes.offerText}</div>
                            </div>
                            </a></Link>
                           }
                           {page.attributes.popularImg.data&&<Link href={`/products/popular-${page.attributes.slug}`}><a> <div className="min-h-fit w-full mx-2 relative my-2">
                              <img src={`${API_URL}${page.attributes.popularImg.data.attributes.url}`} className="w-full h-full object-cover" alt={page.attributes.offerImg.data.attributes.name} />
                              <div className="font-semibold bg-gray-100 text-sm text-gray-900 absolute bottom-0 left-0 z-20 w-full text-center border border-secondary">{page.attributes.popularText}</div>
                            </div>
                            </a></Link>
                           }
                        </motion.div>
                </div>
             ))}
            </div>
          </motion.div>
          } 
                            
                </div>
    )
}



export default HeadBar;