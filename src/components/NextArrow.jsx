import React from 'react'
import { FaLongArrowAltRight } from "react-icons/fa";

const NextArrow = (props) => {
  return (
    <div className='bg-[#00000033] rounded-full flex justify-center items-center w-16 h-16 absolute top-[35%] right-16 z-10 opacity-0 group-hover:opacity-100 group-hover:right-7 transition-all duration-300 cursor-pointer' onClick={props.onClick}><FaLongArrowAltRight className='text-white text-2xl'/></div>
  )
}

export default NextArrow