import React, { useState } from 'react'
import Heading from '../Heading'
import Container from '../Container'
import Accordion from '../Accordion'


const Filter = () => {
  return (
    <>
     <Container>
        <Heading text={"Shop by Category"} className={"font-dmSans font-bold text-[20px] text-menuHeading pb-3"} as={"h4"}/>
        <Accordion title={"Category 1"} content={"Lorem ipsum dolor sit amet."}/>
        <Accordion title={"Category 2"} content={"Lorem ipsum dolor sit amet."}/>
        <Accordion title={"Category 3"} content={"Lorem ipsum dolor sit amet."}/>
        <Accordion title={"Category 4"} content={"Lorem ipsum dolor sit amet."}/>
        <Accordion title={"Category 5"} content={"Lorem ipsum dolor sit amet."}/>

        <Heading text={"Shop by Color"} className={"font-dmSans font-bold text-[20px] text-menuHeading pt-11 pb-5"} as={"h4"}/>
        
     </Container>
    </>
  )
}

export default Filter