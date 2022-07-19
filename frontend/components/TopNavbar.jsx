
import Link from "next/link"
import styles from '../styles/Home.module.css'

import {MdOutlineGridView,
MdOutlineHome,
MdOutlineFavoriteBorder,
MdHelpOutline  
} from "react-icons/md"

const TopNavbar=()=>{  


  return(
    <div className={`w-full z-20  top-0 font-serif sticky shadow-xl border-t `} >
      
      <div className={`px-2 md:px-0 z-10  bg-white w-full text-gray-900 py-2`}>
        <div className="container mx-auto flex justify-between text-sm md:text-base">
          <div className="text-center md:flex md:items-center   cursor-pointer"> <MdOutlineHome className=" md:mx-2  mx-auto text-2xl md:text-3xl"/><span>Home</span></div>
          <div className="text-center md:flex md:items-center  cursor-pointer"><MdHelpOutline className=" md:mx-2 mx-auto text-2xl md:text-3xl"/><span>Help</span></div>
          <div className="text-center md:flex md:items-center  cursor-pointer"><MdOutlineGridView className=" md:mx-2 mx-auto text-2xl md:text-3xl"/><span>Collection</span></div>
          <div className="text-center md:flex md:items-center  cursor-pointer"><MdOutlineFavoriteBorder className=" md:mx-2 mx-auto text-2xl md:text-3xl"/><span>LovedProduct</span></div>
        </div>
      </div>
      
      
    </div>
    )
}

export default TopNavbar;