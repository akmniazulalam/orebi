import React from 'react'

const CategoriesMenu = ({isOpen}) => {
  return (
    <div className={`w-[263px] absolute left-0 transition-all duration-300 bg-menuHeading ${isOpen ? "top-[40px] opacity-100" : "top-[20px] opacity-0"}`}>
        <div className="py-[19px] px-[21px] border-b-2 border-[#2D2D2D] flex justify-between items-center font-dmSans text-sm text-white opacity-70 hover:opacity-100 hover:font-bold hover:pl-9 transition-all duration-300">
            Accesories <span>&gt;</span>
        </div>
        <div className="py-[19px] px-[21px] border-b-2 border-[#2D2D2D] flex justify-between items-center font-dmSans text-sm text-white opacity-70 hover:opacity-100 hover:font-bold hover:pl-9 transition-all duration-300">
            Furniture <span>&gt;</span>
        </div>
        <div className="py-[19px] px-[21px] border-b-2 border-[#2D2D2D] flex justify-between items-center font-dmSans text-sm text-white opacity-70 hover:opacity-100 hover:font-bold hover:pl-9 transition-all duration-300">
            Electronics <span>&gt;</span>
        </div>
        <div className="py-[19px] px-[21px] border-b-2 border-[#2D2D2D] flex justify-between items-center font-dmSans text-sm text-white opacity-70 hover:opacity-100 hover:font-bold hover:pl-9 transition-all duration-300">
            Clothes <span>&gt;</span>
        </div>
        <div className="py-[19px] px-[21px] border-b-2 border-[#2D2D2D] flex justify-between items-center font-dmSans text-sm text-white opacity-70 hover:opacity-100 hover:font-bold hover:pl-9 transition-all duration-300">
            Bags <span>&gt;</span>
        </div>
        <div className="py-[19px] px-[21px] border-b-2 border-[#2D2D2D] flex justify-between items-center font-dmSans text-sm text-white opacity-70 hover:opacity-100 hover:font-bold hover:pl-9 transition-all duration-300">
            Home appliances <span>&gt;</span>
        </div>
    </div>
  )
}

export default CategoriesMenu