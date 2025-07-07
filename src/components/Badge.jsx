import React from 'react'

const Badge = ({className, badgeT}) => {
  return (
    <div className={`py-2.5 px-8 bg-menuHeading text-sm font-dmSans font-bold text-white ${className}`}>{badgeT}</div>
  )
}

export default Badge