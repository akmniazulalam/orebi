import React from 'react'
import Intro from '../Intro'
import Container from '../Container'

const Checkout = () => {
  return (
    <>
    <Intro pText={"Checkout"} text={"Checkout"} />
    <Container>
      <p className='text-header text-base font-dmSans leading-7.5'>Have a coupon? <span className='text-menuHeading'>Click here to enter your code</span></p>
    </Container>
    </>
  )
}

export default Checkout