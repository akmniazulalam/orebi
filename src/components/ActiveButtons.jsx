import React from 'react'
import Flex from './Flex'
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import CompareIcon from '../assets/icons/CompareIcon';

const ActiveButtons = ({className}) => {
  return (
    <div className={`py-5 px-[18px] bg-white opacity-0 ${className}`}>
        <Flex className={"justify-end"}>
            <p className='font-dmSans text-base text-header hover:text-menuHeading transition-all duration-300 hover:font-bold cursor-pointer'>Add to Wish List</p>
            <FaHeart className='text-menuHeading ml-3'/>
        </Flex>
        <Flex className={"pt-4 justify-end"}>
            <p className='font-dmSans text-base text-header pr-3 hover:text-menuHeading transition-all duration-300 hover:font-bold cursor-pointer'>Compare</p>
            <CompareIcon/>
        </Flex>
        <Flex className={"pt-4 justify-end"}>
            <p className='font-dmSans text-base text-header hover:text-menuHeading transition-all duration-300 hover:font-bold cursor-pointer'>Add to Cart</p>
            <FaShoppingCart className='text-menuHeading ml-3'/>
        </Flex>
    </div>
  )
}

export default ActiveButtons