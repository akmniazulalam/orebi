import React, { useState } from "react";
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
  const [selectedBank, setSelectedBank] = useState("")
  const [selectedBankTwo, setSelectedBankTwo] = useState("")
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
          <div className="pt-28">
            <Heading
              className={
                "pb-10 font-dmSans font-bold text-[39px] text-menuHeading"
              }
              text={"Additional Information"}
              as={"h2"}
            />
            <h3 className="font-dmSans font-bold text-base text-menuHeading leading-6 pb-2.5">
              Other Notes (optional)
            </h3>
            <p className=""></p>
            <textarea
              name="notes"
              id="notes"
              rows={"4"}
              placeholder="Notes about your order, e.g. special notes for delivery."
              className="border-b border-infoBg w-full resize-none focus:outline-0 placeholder:font-dmSans placeholder:text-sm placeholder:text-header"></textarea>
          </div>
          <div className="pt-28">
            <Heading
              className={
                "pb-11 font-dmSans font-bold text-[39px] text-menuHeading"
              }
              text={"Your Order"}
              as={"h2"}
            />
            <table className="border border-infoBg mt-6 mb-7.5 text-left">
              <tr className="border-b border-infoBg">
                <th className="font-bold font-dmSans text-base text-menuHeading py-4 px-5 w-2xs border-r border-infoBg text-left">
                  Product
                </th>
                <td className="font-dmSans text-base text-header py-4 px-5 w-2xs">
                  Total
                </td>
              </tr>
              <tr className="border-b border-infoBg">
                <th className="font-bold font-dmSans text-base text-menuHeading py-4 px-5 w-2xs border-r border-infoBg text-left">
                  Product Name x 1
                </th>
                <td className="font-dmSans text-base text-header py-4 px-5 w-2xs">
                  389.99$
                </td>
              </tr>
              <tr className="border-b border-infoBg">
                <th className="font-bold font-dmSans text-base text-menuHeading py-4 px-5 w-2xs border-r border-infoBg text-left">
                  Subtotal
                </th>
                <td className="font-dmSans text-base text-menuHeading py-4 px-5 w-2xs">
                  389.99$
                </td>
              </tr>
              <tr>
                <th className="font-bold font-dmSans text-base text-menuHeading py-4 px-5 w-2xs border-r border-infoBg text-left">
                  Total
                </th>
                <td className="font-dmSans text-base text-menuHeading py-4 px-5 w-2xs">
                  389.99$
                </td>
              </tr>
            </table>
          </div>
          <div className="py-7 px-8 border border-infoBg">
            <div className="flex items-center gap-x-2"> {/* id ar htmlFor same rakhle label e click korleo tokhon select hoy */}
              <input type="radio" name="bank" className="accent-black cursor-pointer" id="bank" onChange={(e) => setSelectedBank(e.target.value)} /> {/* radio color change korte accent-color use korte hoy */}
              <label htmlFor="bank" className={`font-dmSans font-bold text-base cursor-pointer ${selectedBank? "text-menuHeading" : "text-header"}`}>
                Bank
              </label>
            </div>
            <div className="flex items-center gap-x-2 cursor-pointer">
              <input type="radio" name="bank" className="accent-black cursor-pointer" id="bank2" onChange={(e) => setSelectedBankTwo(e.target.value)} />
              <label htmlFor="bank2" className={`font-dmSans font-bold text-base cursor-pointer ${selectedBankTwo? "text-menuHeading" : "text-header"}`}>
                Bank 2
              </label>
            </div>
            <p className="pt-3 pb-6 font-dmSans font-base text-header leading-7.5">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <span className="text-menuHeading">privacy policy.</span></p>
             <button className="py-5 px-12 text-white text-sm font-bold font-dmSa bg-menuHeading cursor-pointer border border-menuHeading">
              Proceed to Bank
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
