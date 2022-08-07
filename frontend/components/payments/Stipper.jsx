import React, { useContext } from 'react'
import { Store } from '../../utils/Store'
import {MdCheck} from "react-icons/md"
export default function Stipper() {
    const {state}=useContext(Store);
    const {user,cart:{shipping,paymanetMethod,orderComplete}}=state

  return (
    <div className='my-4 flex items-center'>
        <div className="flex items-center px-1">
            <div className='md:flex items-center'>
                <div className={`flex items-center justify-center ${user?"bg-secondary":"bg-gray-400"} text-white p-1 rounded-full text-xl`}>{user?<MdCheck className='text-xl text-white'/>:"1"}</div>
                <div className='mx-1 text-gray-400'>login</div>
            </div>   
        </div>
        <div className={`flex-grow h-0.5 ${state.user?"bg-secondary":"bg-gray-400"} w-full`}></div>
        <div className="flex items-center px-1">
            <div className='md:flex items-center '>
                <div className={`flex items-center justify-center ${shipping!=={}?"bg-secondary p-1":"bg-gray-400 md:px-2.5 md:py-0.5"} text-white  rounded-full text-xl`}>{shipping!=={}?<MdCheck className='text-xl text-white'/>:"2"}</div>
                <div className='mx-1 text-gray-400'>shipping</div>
            </div>        
        </div>
        <div className={`flex-grow h-0.5 ${shipping?"bg-secondary":"bg-gray-400"} w-full`}></div>
        <div className="flex items-center px-1">
            <div className='md:flex items-center '>
                <div className={`flex items-center justify-center ${paymanetMethod?"bg-secondary p-1":"bg-gray-400 md:px-2.5 md:py-0.5"}  text-white rounded-full text-xl`}>{paymanetMethod?<MdCheck className='text-xl text-white'/>:"3"}</div>
                <div className='mx-1 text-gray-400'>payment</div>
            </div>
        </div>
        <div className={`flex-grow h-0.5 ${shipping?"bg-secondary":"bg-gray-400"} w-full`}></div>
        <div className="flex items-center px-1">
            <div className='md:flex items-center '>
                <div className={`flex items-center justify-center ${orderComplete?"bg-secondary p-1":"bg-gray-400 md:px-2.5 md:py-0.5"}  text-white rounded-full text-xl`}>{orderComplete?<MdCheck className='text-xl text-white'/>:"4"}</div>
                <div className='mx-1 text-gray-400'>placeorder</div>
            </div>
        </div>
    </div>
  )
}
