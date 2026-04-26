import React from 'react'

const CategoriesMenu = ({isOpen}) => {
  return (
    <>
    {isOpen && (
        <div className={`w-65.75 z-10 absolute left-0 transition-all duration-300 bg-menuHeading animate-slide`}>
        {["Accesories", "Furniture", "Electronics", "Clothes", "Bags", "Home appliances"].map(
            (item) => (
              <div
                key={item}
                className="py-4.75 px-5.25 border-b-2 border-[#2D2D2D] flex justify-between items-center font-dmSans text-sm text-white opacity-70 hover:opacity-100 hover:font-bold hover:pl-9 transition-all duration-300"
              >
                {item} <span>&gt;</span>
              </div>
            )
          )}
    </div>
    )}
    </>
  )
}

export default CategoriesMenu