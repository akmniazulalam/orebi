import React from 'react'

const Badge = ({className, badgeT}) => {
  let bgClass = "bg-menuHeading text-white"; // default

  if (badgeT.includes("%")) {
    bgClass = "bg-[#778899] text-white";
  } else if (badgeT.toLowerCase() === "sale") {
    bgClass = "bg-[#ff9901] text-black";
  }
  return (
    <div className={`py-2.5 px-8 ${bgClass} text-sm font-dmSans font-bold  ${className}`}>{badgeT}</div>
  )
}

export default Badge