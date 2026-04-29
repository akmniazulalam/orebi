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

const Checkout = () => {
  return (
    <>
      <Intro pText={"Checkout"} text={"Checkout"} />
      <Container>
        <p className="text-header text-base font-dmSans leading-7.5">
          Have a coupon?{" "}
          <span className="text-menuHeading">
            Click here to enter your code
          </span>
        </p>
        <Heading
          className={
            "pt-28 pb-10 font-dmSans font-bold text-[39px] text-menuHeading"
          }
          text={"Billing Details"}
          as={"h2"}
        />
        <div className="max-w-263.75 w-full gap-y-6 grid">
          <Flex className={"gap-x-10"}>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                First Name *
              </h3>
              <input
                type="text"
                placeholder="First Name"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
              />
            </div>
            <div className="w-full">
              <h3 className="font-dmSans font-bold text-base text-menuHeading">
                Last Name *
              </h3>
              <input
                type="text"
                placeholder="Last Name"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
              />
            </div>
          </Flex>
          <div className="w-full">
            <h3 className="font-dmSans font-bold text-base text-menuHeading">
              Company Name (Optional)
            </h3>
            <input
              type="text"
              placeholder="Company Name"
              className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
            />
          </div>
          <div className="w-full">
            <h3 className="font-dmSans font-bold text-base text-menuHeading">
              Country
            </h3>

            <Select className={"rounded-none!"}>
              <SelectTrigger className="cursor-pointer w-full rounded-none font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-5! pb-6! px-0 border-r-0 border-t-0 border-l-0 border-b border-infoBg focus:outline-0">
                <SelectValue placeholder="Please Select" />
              </SelectTrigger>

              <SelectContent className={"cursor-pointer"}>
                <SelectGroup className={"cursor-pointer"}>
                  <SelectLabel className={"cursor-pointer"}>
                    Country
                  </SelectLabel>

                  <SelectItem value="bangladesh" className={"cursor-pointer"}>
                    Bangladesh
                  </SelectItem>
                  <SelectItem value="india" className={"cursor-pointer"}>
                    India
                  </SelectItem>
                  <SelectItem value="pakistan" className={"cursor-pointer"}>
                    Pakistan
                  </SelectItem>
                  <SelectItem value="america" className={"cursor-pointer"}>
                    America
                  </SelectItem>
                  <SelectItem value="germany" className={"cursor-pointer"}>
                    Germany
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <h3 className="font-dmSans font-bold text-base text-menuHeading">
              Street Address *
            </h3>
            <input
              type="text"
              placeholder="House number and street name"
              className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
            />
            <input
              type="text"
              placeholder="Apartment, suite, unit etc. (optional)"
              className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading py-4 border-b border-infoBg focus:outline-0 w-full"
            />
          </div>
          <div className="w-full">
            <h3 className="font-dmSans font-bold text-base text-menuHeading">
              Town/City *
            </h3>
            <input
              type="text"
              placeholder="Town/City"
              className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
            />
          </div>
          <div className="w-full">
            <h3 className="font-dmSans font-bold text-base text-menuHeading">
              County (optional)
            </h3>
            <input
              type="text"
              placeholder="County"
              className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
            />
          </div>
          <div className="w-full">
            <h3 className="font-dmSans font-bold text-base text-menuHeading">
              Post Code *
            </h3>
            <input
              type="text"
              placeholder="Post Code"
              className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
            />
          </div>
          <div className="w-full">
            <h3 className="font-dmSans font-bold text-base text-menuHeading">
              Phone *
            </h3>
            <input
              type="text"
              placeholder="Phone"
              className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
            />
          </div>
          <div className="w-full">
            <h3 className="font-dmSans font-bold text-base text-menuHeading">
              Email Address *
            </h3>
            <input
              type="email"
              placeholder="Email"
              className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
            />
          </div>
          <div className="">
            <Heading
            className={
              "pt-28 pb-10 font-dmSans font-bold text-[39px] text-menuHeading"
            }
            text={"Additional Information"}
            as={"h2"}
          />
          <h3 className="font-dmSans font-bold text-base text-menuHeading leading-6 pb-2.5">
            Other Notes (optional)
          </h3>
          <p className="">
            
          </p>
          <textarea
            name="notes"
            id="notes"
            rows={"4"}
            placeholder="Notes about your order, e.g. special notes for delivery."
            className="border-b border-infoBg w-full resize-none focus:outline-0 placeholder:font-dmSans placeholder:text-sm placeholder:text-header"></textarea>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
