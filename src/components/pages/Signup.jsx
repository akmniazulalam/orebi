import React from "react";
import Intro from "../Intro";
import Container from "../Container";
import Heading from "../Heading";
import Flex from "../Flex";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Signup = () => {
  return (
    <>
      <Intro text={"Signup"} pText={"Signup"} />
      <Container>
        <p className="font-dmSans text-base leading-7.5 text-header max-w-161">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the.
        </p>
        <hr className="text-infoBg my-15" />
        <Heading
          className={"pb-10 font-dmSans font-bold text-[39px] text-menuHeading"}
          text={"Your Personal Details"}
          as={"h2"}
        />
        <div className="max-w-263.75 w-full gap-y-6 grid">
          <Flex className={"gap-x-10"}>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                First Name
              </h3>
              <input
                type="text"
                placeholder="First Name"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
              />
            </div>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                Last Name
              </h3>
              <input
                type="text"
                placeholder="Last Name"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
              />
            </div>
          </Flex>
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
                Telephone
              </h3>
              <input
                type="text"
                placeholder="Your phone number"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
              />
            </div>
          </Flex>
        </div>
        <hr className="text-infoBg my-15" />
        <Heading
          className={"pb-10 font-dmSans font-bold text-[39px] text-menuHeading"}
          text={"New Customer"}
          as={"h2"}
        />
        <div className="max-w-263.75 w-full gap-y-6 grid">
          <Flex className={"gap-x-10"}>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                Address 1
              </h3>
              <input
                type="text"
                placeholder="4279 Zboncak Port Suite 6212"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
              />
            </div>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                Address 2
              </h3>
              <input
                type="text"
                placeholder="--"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
              />
            </div>
          </Flex>
          <Flex className={"gap-x-10"}>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                City
              </h3>
              <input
                type="Your city"
                placeholder="company@domain.com"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
              />
            </div>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                Post Code
              </h3>
              <input
                type="text"
                placeholder="05228"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
              />
            </div>
          </Flex>
          <Flex className={"gap-x-10"}>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                Division
              </h3>
              <Select className={"rounded-none!"}>
                <SelectTrigger className="cursor-pointer w-full rounded-none font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-5! pb-6! px-0 border-r-0 border-t-0 border-l-0 border-b border-infoBg focus:outline-0">
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>

                <SelectContent className={"cursor-pointer"}>
                  <SelectGroup className={"cursor-pointer"}>
                    <SelectLabel className={"cursor-pointer"}>
                      Division
                    </SelectLabel>

                    <SelectItem value="Dhaka" className={"cursor-pointer"}>
                      Dhaka Division
                    </SelectItem>
                    <SelectItem value="Chattogram" className={"cursor-pointer"}>
                      Chattogram Division
                    </SelectItem>
                    <SelectItem value="Rajshahi" className={"cursor-pointer"}>
                      Rajshahi Division
                    </SelectItem>
                    <SelectItem value="Khulna" className={"cursor-pointer"}>
                      Khulna Division
                    </SelectItem>
                    <SelectItem value="Sylhet" className={"cursor-pointer"}>
                      Sylhet Division
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                District
              </h3>
              <Select className={"rounded-none!"}>
                <SelectTrigger className="cursor-pointer w-full rounded-none font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-5! pb-6! px-0 border-r-0 border-t-0 border-l-0 border-b border-infoBg focus:outline-0">
                  <SelectValue placeholder="Please Select" />
                </SelectTrigger>

                <SelectContent className={"cursor-pointer"}>
                  <SelectGroup className={"cursor-pointer"}>
                    <SelectLabel className={"cursor-pointer"}>
                      District
                    </SelectLabel>

                    <SelectItem value="Dhaka" className={"cursor-pointer"}>
                      Dhaka District
                    </SelectItem>
                    <SelectItem value="Chattogram" className={"cursor-pointer"}>
                      Chattogram District
                    </SelectItem>
                    <SelectItem value="Rajshahi" className={"cursor-pointer"}>
                      Rajshahi District
                    </SelectItem>
                    <SelectItem value="Khulna" className={"cursor-pointer"}>
                      Khulna District
                    </SelectItem>
                    <SelectItem value="Sylhet" className={"cursor-pointer"}>
                      Sylhet District
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </Flex>
        </div>
        <hr className="text-infoBg my-15" />
        <Heading
          className={"pb-10 font-dmSans font-bold text-[39px] text-menuHeading"}
          text={"Your Password"}
          as={"h2"}
        />
        <div className="max-w-263.75 w-full gap-y-6 grid">
          <Flex className={"gap-x-10"}>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                Password
              </h3>
              <input
                type="text"
                placeholder="Password"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
              />
            </div>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                Repeat Password
              </h3>
              <input
                type="text"
                placeholder="Repeat Password"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
              />
            </div>
          </Flex>
        </div>
        <hr className="text-infoBg my-15" />
        <div className="flex items-center gap-x-2">
          <input type="checkbox" id="check" className="cursor-pointer" />
          <label
            htmlFor="check"
            className="font-dmSans text-sm text-header cursor-pointer">
            I have read and agree to the Privacy Policy
          </label>
        </div>
        <div className="flex items-center gap-x-6 pt-5">
          <p className="font-dmSans text-sm text-header">
            Subscribe Newsletter
          </p>
          <div className="flex items-center gap-x-2">
            <input
              type="radio"
              name="newsletter"
              id="yes"
              className="accent-black appearance-none border border-header h-3 w-3 checked:bg-header cursor-pointer"
            />
            <label
              htmlFor="yes"
              className="font-dmSans text-sm text-header cursor-pointer">
              Yes
            </label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              type="radio"
              name="newsletter"
              id="no"
              className="accent-black appearance-none w-3 h-3 border border-header checked:bg-header cursor-pointer"
            />
            <label
              htmlFor="no"
              className="font-dmSans text-sm text-header cursor-pointer">
              No
            </label>
          </div>
        </div>
        <button className="py-3 px-18 mt-6 text-white text-sm font-bold font-dmSans bg-menuHeading cursor-pointer border border-menuHeading">
          Log in
        </button>
      </Container>
    </>
  );
};

export default Signup;
