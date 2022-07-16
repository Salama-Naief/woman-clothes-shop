import {useState} from "react"
import Link from "next/link"


import {MdOutlineShoppingBasket,
MdOutlineClear,MdOutlineGridView,
MdOutlineDehaze,MdOutlinePersonOutline,
MdOutlineSearch,MdOutlineHome,
MdOutlineFavoriteBorder,MdOutlineFavorite,
MdFavorite,MdHelpOutline  
} from "react-icons/md"

const TopNavbar=()=>{
  const [cartProduct,setCartProduct]=useState([1,2]);
  const [user,setUser]=useState("salama");
  const [menuLogin,setMenuLogin]=useState(false);
  const [menuRegister,setMenuRegister]=useState(false);
  const [menuCart,setMenuCart]=useState(false);
  const [menuItems,setMenItems]=useState(false);
  
  const closeMenus=()=>{
    setMenuRegister(false)
    setMenItems(false)
    setMenuLogin(false)
    setMenuCart(false)
  }
  const handleMenus=(type)=>{
    switch (type) {
      case 'login':
        setMenuRegister(false)
        setMenItems(false)
        setMenuLogin(true)
        setMenuCart(false)
        break;
      case 'register':
        setMenuRegister(true)
        setMenItems(false)
        setMenuLogin(true)
        setMenuCart(false) 
        break;
      case 'cart':
        setMenuRegister(false)
        setMenItems(false)
        setMenuLogin(false)
        setMenuCart(true)
        break;
      case 'items':
        setMenuRegister(false)
        setMenItems(true)
        setMenuLogin(false)
        setMenuCart(false)
        break;
      
      default:
        setMenItems(false)
         setMenuRegister(false)
        setMenuLogin(false)
        setMenuCart(false)
    }
    
  }
  const loginOrRegister=()=>{
    if(!menuRegister){
      setMenuRegister(true)
    }else{
      setMenuLogin(true)
      setMenuRegister(false)
    }
  }
  const handleSubmit=(e)=>{
    
  }
  

    
  return(
    <div className="w-full  top-1 font-serif" style={{postion:"sticky"}}>
      <div className="container mx-auto flex items-center justify-between py-4 px-2 md:px-0 shadow-sm md:shadow-none"> 
          <div className="w-1/2 md:w-1/3 text-xl md:text-3xl font-serif text-primary flex items-center cursor-pointer" onClick={()=>handleMenus('items')}><MdOutlineDehaze className="text-2xl mx-2 md:text-4xl"/><span>SMN</span> </div>
           <form className="hidden md:block w-1/3 text-primary border border-primary flex items-center">
           <div className="flex items-center">
              <input type="text" className="flex-grow-1 outline-none  w-full px-1 py-0 text-sm md:text-base md:px-4 md:py-1" placeholder="Search"/>
              <MdOutlineSearch className="text-3xl cursor-pointer"/>
            </div>
            </form>
          <div className="w-1/2 md:w-1/3 flex  items-center">
           
            <div className=" w-full items-center flex justify-end md:justify-between">
             {user?(
               <div className="hidden md:flex w-2/3 justify-end items-center mx-1" onClick={()=>handleMenus("login")}><span className="p-1 rounded-full border border-primary text-primary"><MdOutlinePersonOutline className="text-3xl cursor-pointer"/></span></div>
             ):(
             <div className="md:w-2/3 hidden md:flex justify-end">
               <Link href="/login" className="">
                 <a className="border border-primary text-primary text-sm py-0.5 px-1 md:text-base md:px-2 md:py-1">LOGIN</a>
               </Link>
             </div>
             )}
             
              <div className=" w-1/2 md:w-1/3 mx-1 flex justify-end relative text-primary" onClick={()=>handleMenus("cart")}>
                <MdOutlineShoppingBasket className="text-2xl md:text-4xl cursor-pointer"/>
                <div className="absolute bg-red-600 bottom-4 md:bottom-6 right-0 text-white px-1 md:px-2 text-sm rounded-full">1</div>
              </div>
            </div>
          </div>
              
          </div>
      <div className="px-2 md:px-0 z-10 fixed bottom-0 left-0 md:relative w-full bg-primary w-full text-white py-2">
        <div className="container mx-auto flex justify-between text-sm md:text-base">
          <div className=" text-center  cursor-pointer"> <MdOutlineHome className=" mx-auto text-2xl md:text-4xl"/><span>Home</span></div>
          <div className="text-center  cursor-pointer"><MdHelpOutline className="mx-auto text-2xl md:text-4xl"/><span>Help</span></div>
          <div className="text-center  cursor-pointer"><MdOutlineGridView className="mx-auto text-2xl md:text-4xl"/><span>Collection</span></div>
          <div className="text-center  cursor-pointer"><MdOutlineFavoriteBorder className="mx-auto text-2xl md:text-4xl"/><span>LovedProduct</span></div>
        </div>
      </div>
      
      {/*login and register menu*/}
      {
        menuLogin&&<div className="z-10 bg-white text-primary fixed bottom-0 right-0 w-5/6 md:w-1/2 h-full md:h-5/6 border border-primary px-8">
          <div className="absolute top-5 left-5 text-xl md:text-3xl p-0.5 md:p-1 border border-primary rounded-full cursor-pointer" onClick={()=>closeMenus()}><MdOutlineClear/></div>
          <div className="text-primary text-xl md:text-3xl w-full text-center my-6">{!menuRegister?"Login":"Register"}</div>
          <div className="text-red-600 text-xl md:text-3xl w-full text-center my-4">Error Message</div>
          <form className="" onSubmit={handleSubmit}>
           <input type="email" required className="outline-none border border-primary my-4 w-full px-4 py-2" placeholder="Email"/>
           {  menuRegister&&<input type="type" required className="outline-none border border-primary my-4 w-full px-4 py-2" placeholder="User Name"/>}
           <input type="password" required className="outline-none border border-primary my-4 w-full px-4 py-2" placeholder="Password"/>
           <button type="submit" className="bg-primary py-2 w-full text-white ">{menuRegister?"REGISTER":"LOGIN"}</button>
          </form>
          <div className="text-primary my-4" onClick={()=>loginOrRegister()}><span>try new user?</span><span className="text-red-600">{menuRegister?"Login":"Register"}</span></div>
        </div>
      }
      {/*menu cart of product*/}
      {
        menuCart&&<div className="z-10 bg-white text-primary fixed bottom-0 right-0 w-5/6 md:w-1/2 md:h-5/6 h-full border border-primary px-8">
        <div className="">
          <div className="absolute top-5 left-5 text-xl md:text-3xl md:p-1 p-0.5 border border-primary rounded-full cursor-pointer" onClick={()=>closeMenus()}><MdOutlineClear/></div>
          <div className="text-primary text-xl md:text-3xl w-full text-center my-6">Product Cart</div>
          <div className="text-red-600 text-xl md:text-3xl w-full text-center my-4">Error Message</div>
        </div>
        <div className="overflow-y-scroll mt-6">
         {cartProduct.length&&cartProduct.map(product=>(
            <div className="border border-primary relative p-1 my-4">
                <div className="absolute md:top-3 top-1 right-1 md:right-3 md:text-2xl p-0.5 md:p-1 text-red-600 border border-red-600 rounded-full cursor-pointer" onClick={()=>closeMenus()}><MdOutlineClear/></div>
               <div className="flex">
                 <div className="w-1/3 h-full overflow-hidden">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKohNCwmAwI7PtV9Fn0unR8T49HfgXYeQjIg&usqp=CAU" className="w-full h-full object-cover" alt=""/>      
                 </div>
                 <div className="flex w-2/3 px-4 items-center justify-between">
                 <div className="flex flex-col items-between">
                     <div className="py-2">name</div>
                     <div className="py-2">red</div>
                     <div className="pt-2">xl</div>
                 </div>
                 <div className="justify-end flex flex-col items-end h-full">
                     <input mini="1" type="number" className="outline-none w-10 md:my-4 my-1 text-primary border border-primary"/>
                     <div className="py-2 text-red-600 ">$889</div>
                 </div>
                </div>
               </div>
            </div>
         ))}
         <div className="text-center text-primary p-2 border border-primary mt-6 mb-4">total cost : <span className="text-red-600">888</span></div>
          <button className="bg-primary py-2 w-full text-white mb-4">PAYMENT</button>
         </div>
        </div>
      }
      
           {/*small size size menu*/}
      {
        menuItems&&<div className="z-10 md:hidden bg-white text-primary fixed bottom-0 left-0 w-5/6 md:w-1/2 h-full md:h-5/6 border border-primary px-8">
          <div className="absolute top-5 right-5 text-xl md:text-3xl p-0.5 md:p-1 border border-primary rounded-full cursor-pointer" onClick={()=>closeMenus()}><MdOutlineClear/></div>
          <div className="text-primary text-xl md:text-3xl w-full text-center my-6">Menu</div>
          <div className="flex justify-center items-center mx-1" onClick={()=>handleMenus("login")}><span className="p-1 rounded-full border border-primary text-primary"><MdOutlinePersonOutline className="text-4xl cursor-pointer"/></span></div>
            <form className="my-4 text-primary border border-primary flex items-center">
           <div className="flex items-center">
              <input type="text" className="flex-grow-1 outline-none  w-full px-4 py-2" placeholder="Search"/>
              <MdOutlineSearch className="text-3xl cursor-pointer"/>
            </div>
            </form>
         <div className=" text-base ">
            <div className=" my-4 flex items-center py-1.5 border border-primary cursor-pointer"> <MdOutlineHome className="text-3xl mx-2"/><span>Home</span></div>
            <div className="my-4 flex items-center py-1.5 border border-primary   cursor-pointer"><MdHelpOutline className="mx-2 text-3xl "/><span>Help</span></div>
            <div className="my-4 flex items-center py-1.5 border border-primary  cursor-pointer"><MdOutlineGridView className="mx-2 text-3xl "/><span>Collection</span></div>
            <div className="my-4 flex items-center py-1.5 border border-primary  cursor-pointer"><MdOutlineFavoriteBorder className="mx-2 text-3xl"/><span>LovedProduct</span></div>
        </div>
      </div>
      } 
    </div>
    )
}

export default TopNavbar;