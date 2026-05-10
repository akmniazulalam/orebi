import React from 'react'

const Black = ({color}) => {
  return (
    <p className="font-dmSans text-base text-header pt-4">{color || "Black"}</p>
  )
}

export default Black