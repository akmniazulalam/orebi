import React from 'react'
import Intro from '../Intro'
import Container from '../Container'
import Flex from '../Flex'
import Heading from '../Heading'

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
        <hr className="text-infoBg my-15" />
        <Heading
          className={"pb-10 font-dmSans font-bold text-[39px] text-menuHeading"}
          text={"Returning Customer"}
          as={"h2"}
        />
        <div className="max-w-263.75 w-full gap-y-6 grid">
          <Flex className={"gap-x-10"}>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                Email address
              </h3>
              <input
                type="email"
                placeholder="company@domain.com"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
              />
            </div>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                Password
              </h3>
              <input
                type="password"
                placeholder="********"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
              />
            </div>
          </Flex>
        </div>
        <button className="py-3 px-18 mt-6 text-sm font-bold font-dmSans text-black hover:text-white hover:bg-menuHeading cursor-pointer border border-menuHeading transition-all duration-300">
              Log in
            </button>
        <hr className="text-infoBg my-15" />
        <Heading
          className={"font-dmSans font-bold text-[39px] text-menuHeading"}
          text={"New Customer"}
          as={"h2"}
        />
        <p className="font-dmSans text-base leading-7.5 text-header max-w-161 py-11">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the.
        </p>
        <button className="py-3 px-18 mt-6 text-white text-sm font-bold font-dmSans bg-menuHeading cursor-pointer border border-menuHeading">
              Continue
            </button>
    </Container>
    </>
  )
}

export default Login