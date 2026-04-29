import React from 'react'
import Intro from '../Intro'
import Container from '../Container'
import Heading from '../Heading'
import Flex from '../Flex'

const Checkout = () => {
  return (
    <>
    <Intro pText={"Checkout"} text={"Checkout"} />
    <Container>
      <p className='text-header text-base font-dmSans leading-7.5'>Have a coupon? <span className='text-menuHeading'>Click here to enter your code</span></p>
      <Heading className={"pt-28 pb-10 font-dmSans font-bold text-[39px] text-menuHeading"} text={"Billing Details"} as={"h2"}/>
      <div className="">
        <Flex className={"gap-x-10"}>
          <div className="w-127"></div>
        </Flex>
      </div>
    </Container>
    </>
  )
}

export default Checkout