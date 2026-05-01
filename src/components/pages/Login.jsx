import React from 'react'
import Intro from '../Intro'
import Container from '../Container'

const Login = () => {
  return (
    <>
    <Intro text={"Login"} pText={"Login"}/>
    <Container>
        <p className="font-dmSans text-base leading-7.5 text-header max-w-161">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the.
        </p>
    </Container>
    </>
  )
}

export default Login