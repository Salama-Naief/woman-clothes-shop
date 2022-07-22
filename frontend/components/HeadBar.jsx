import { useState } from "react";
import {  MdOutlineDehaze, MdOutlinePersonOutline, 
MdOutlineSearch, MdOutlineShoppingBasket,
MdOutlineClear,MdOutlineHome ,
MdHelpOutline,MdOutlineGridView,
MdOutlineFavoriteBorder ,
MdChevronRight
} from "react-icons/md";


const HeadBar=()=>{

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
            <div className="container mx-auto flex items-center justify-between py-2 px-2 md:px-0 shadow-sm md:shadow-none font-serif"> 
                  <div className="w-1/2 md:w-1/3 text-xl md:text-3xl font-serif text-gray-900 flex items-center cursor-pointer" onClick={()=>handleMenus('items')}><MdOutlineDehaze className="text-2xl mx-2 md:hidden"/><span>SMN</span> </div>
                        <form className="hidden md:flex w-1/3 text-gray-900 border border-gray-400 items-center">
                        <div className="flex items-center w-full">
                            <input type="text" className="flex-grow outline-none px-1 py-0 text-sm md:text-base md:px-4 md:py-1" placeholder="Search"/>
                            <MdOutlineSearch className="text-3xl cursor-pointer "/>
                            </div>
                            </form>
                        <div className="w-1/2 md:w-1/3 flex  items-center">
                        
                            <div className=" w-full items-center flex justify-end md:justify-between">
                            {true?(
                            <div className="hidden md:flex w-2/3 justify-end items-center mx-1" onClick={()=>handleMenus("login")}><span className="p-1 rounded-full border border-primary text-gray-900"><MdOutlinePersonOutline className="text-2xl cursor-pointer"/></span></div>
                            ):(
                            <div className="md:w-2/3 hidden md:flex justify-end">
                            <Link href="/login" className="">
                                <a className="border border-primary text-gray-900 text-sm py-0.5 px-1 md:text-base md:px-2 md:py-1">LOGIN</a>
                            </Link>
                            </div>
                            )}
                            
                            <div className=" w-1/2 md:w-1/3 mx-1 flex justify-end relative text-gray-900" onClick={()=>handleMenus("cart")}>
                                <MdOutlineShoppingBasket className="text-2xl md:text-4xl cursor-pointer"/>
                                <div className="absolute bg-secondary bottom-4 md:bottom-6 right-0 text-white px-1 md:px-2 text-sm rounded-full">1</div>
                            </div>
                            </div>
                        </div>

                        {/*login and register menu*/}
          {
            menuLogin&&<div className="z-50 bg-white text-gray-900 fixed bottom-0 right-0 w-5/6 md:w-1/3 h-full md:h-5/6 border border-gray-400 px-8">
              <div className="absolute top-5 left-5 text-xl md:text-3xl p-0.5 md:p-1 border border-secondary rounded-full cursor-pointer" onClick={()=>closeMenus()}><MdOutlineClear/></div>
              <div className="text-gray-900 text-xl md:text-3xl w-full text-center my-6">{!menuRegister?"Login":"Register"}</div>
              <div className="text-red-600 text-xl md:text-3xl w-full text-center my-4">Error Message</div>
              <form className="" onSubmit={handleSubmit}>
              <input type="email" required className="outline-none border border-gray-400 my-4 w-full px-4 py-2" placeholder="Email"/>
              {  menuRegister&&<input type="type" required className="outline-none border border-gray-400 my-4 w-full px-4 py-2" placeholder="User Name"/>}
              <input type="password" required className="outline-none border border-gray-400 my-4 w-full px-4 py-2" placeholder="Password"/>
              <button type="submit" className="bg-primary py-2 w-full text-white ">{menuRegister?"REGISTER":"LOGIN"}</button>
              </form>
              <div className="text-gray-900 my-4" onClick={()=>loginOrRegister()}><span>try new user?</span><span className="text-primary">{menuRegister?"Login":"Register"}</span></div>
            </div>
          }
          {/*menu cart of product*/}
          {
            menuCart&&<div className="z-50 bg-white text-gray-900 fixed bottom-0 right-0 w-5/6 md:w-1/3 md:h-5/6 h-full border border-gray-400 px-8">
            <div className="">
              <div className="absolute top-5 left-5 text-xl md:text-3xl md:p-1 p-0.5 border border-secondary rounded-full cursor-pointer" onClick={()=>closeMenus()}><MdOutlineClear/></div>
              <div className="text-gray-900 text-xl md:text-3xl w-full text-center my-6">Product Cart</div>
              <div className="text-red-600 text-xl md:text-3xl w-full text-center my-4">Error Message</div>
            </div>
            <div className="overflow-y-scroll mt-6">
            {cartProduct.length&&cartProduct.map(product=>(
                <div className="border border-gray-400 relative p-1 my-4">
                    <div className="absolute md:top-3 top-1 right-1 md:right-3 md:text-2xl p-0.5 md:p-1 text-gray-900 border border-secondary rounded-full cursor-pointer" onClick={()=>closeMenus()}><MdOutlineClear/></div>
                  <div className="flex">
                    <div className="w-1/3 h-full overflow-hidden">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKohNCwmAwI7PtV9Fn0unR8T49HfgXYeQjIg&usqp=CAU" className="w-full h-full object-cover" alt=""/>      
                    </div>
                    <div className="flex w-2/3 px-4 items-center justify-between">
                    <div className="flex text-gray-900 flex-col items-between">
                        <div className="py-2">name</div>
                        <div className="py-2">red</div>
                        <div className="pt-2">xl</div>
                    </div>
                    <div className="justify-end flex flex-col items-end h-full">
                        <input mini="1" type="number" className="outline-none w-10 md:my-4 my-1 text-gray-900 border border-gray-400"/>
                        <div className="py-2 text-secondary ">$889</div>
                    </div>
                    </div>
                  </div>
                </div>
            ))}
            <div className="text-center text-gray-900 p-2 border border-gray-400 mt-6 mb-4">total cost : <span className="text-secondary">$888</span></div>
              <button className="bg-primary py-2 w-full text-white mb-4">PAYMENT</button>
            </div>
            </div>
          }
          
              {/*small size size menu*/}
          {
            menuItems&&<div className="z-50 md:hidden bg-white text-gray-900 fixed bottom-0 left-0 w-5/6 md:w-1/3 h-full md:h-5/6 border border-gray-400 px-8">
              <div className="absolute top-5 right-5 text-xl md:text-3xl p-0.5 md:p-1 border border-secondary rounded-full cursor-pointer" onClick={()=>closeMenus()}><MdOutlineClear/></div>
              <div className="text-gray-900 text-xl md:text-3xl w-full text-center my-6">Menu</div>
              <div className="flex justify-center items-center mx-1" onClick={()=>handleMenus("login")}><span className="p-1 rounded-full border border-gray-400 text-gray-900"><MdOutlinePersonOutline className="text-4xl cursor-pointer"/></span></div>
                <form className="my-4 text-gray-900 border border-gray-400 flex items-center">
              <div className="flex items-center">
                  <input type="text" className="flex-grow-1 outline-none  w-full px-4 py-2" placeholder="Search"/>
                  <MdOutlineSearch className="text-3xl cursor-pointer"/>
                </div>
                </form>
            <div className=" text-base ">
                <div className="px-4 my-4 flex items-center py-1.5 border flex justify-between  cursor-pointer"> <span>Home</span> <MdChevronRight className="text-xl text-gray-400"/> </div>
                <div className="px-4 my-4 flex items-center py-1.5 border  flex justify-between cursor-pointer"><span>New</span> <MdChevronRight className="text-xl text-gray-400"/> </div>
                <div className="px-4 my-4 flex items-center py-1.5 border flex justify-between cursor-pointer"><span>Pubular</span> <MdChevronRight className="text-xl text-gray-400"/> </div>
                <div className="px-4 my-4 flex items-center py-1.5 border flex justify-between cursor-pointer"><span>Clothes</span> <MdChevronRight className="text-xl text-gray-400"/> </div>
                <div className="px-4 my-4 flex items-center py-1.5 border flex justify-between cursor-pointer"><span>Shoes</span> <MdChevronRight className="text-xl text-gray-400"/> </div>
                <div className="px-4 my-4 flex items-center py-1.5 border flex justify-between cursor-pointer"><span>Gags&&Accesories</span> <MdChevronRight className="text-xl text-gray-400"/> </div>
                <div className="px-4 my-4 flex items-center py-1.5 border flex justify-between cursor-pointer"><span>Sales</span> <MdChevronRight className="text-xl text-gray-400"/> </div>
            </div>
          </div>
          } 
                            
                </div>
    )
}
export default HeadBar;