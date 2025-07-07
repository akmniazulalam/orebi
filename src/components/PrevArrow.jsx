import React from 'react'
import { FaLongArrowAltLeft } from "react-icons/fa";

const PrevArrow = (props) => {
  return (
    <div className='bg-[#00000033] rounded-full flex justify-center items-center w-16 h-16 absolute top-[33%] left-16 z-10 opacity-0 group-hover:opacity-100 group-hover:left-7 transition-all duration-300 cursor-pointer' onClick={props.onClick}><FaLongArrowAltLeft className='text-white text-2xl'/></div>
  )
}

export default PrevArrow