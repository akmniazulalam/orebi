import Heading from "../Heading";
import Container from "../Container";
import Accordion from "../Accordion";
import Flex from "../Flex";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useState } from "react";

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBrand, setIsBrand] = useState(false);

  const colorDropdown = () => {
    setIsOpen(!isOpen);
  };
  const brandDropdown = () => {
    setIsBrand(!isBrand);
  };

  return (
    <>
      <div className="w-1/4">
        <Heading
          text={"Shop by Category"}
          className={"font-dmSans font-bold text-[20px] text-menuHeading mb-3"}
          as={"h4"}
        />
        <Accordion
          title={"Category 1"}
          content={"Lorem ipsum dolor sit amet."}
        />
        <Accordion
          title={"Category 2"}
          content={"Lorem ipsum dolor sit amet."}
        />
        <Accordion
          title={"Category 3"}
          content={"Lorem ipsum dolor sit amet."}
        />
        <Accordion
          title={"Category 4"}
          content={"Lorem ipsum dolor sit amet."}
        />
        <Accordion
          title={"Category 5"}
          content={"Lorem ipsum dolor sit amet."}
        />

        <Flex
          className={"pt-11 mb-8 justify-between cursor-pointer"}
          onClick={colorDropdown}>
          <Heading
            text={"Shop by Color"}
            className={"font-dmSans font-bold text-[20px] text-menuHeading"}
            as={"h4"}
          />
          {isOpen ? <FaCaretUp /> : <FaCaretDown />}
        </Flex>
        {isOpen && (
          <div className="">
            <Flex className={"border-b-2 border-infoBg pb-5"}>
              <div className="bg-black h-[11px] w-[11px] rounded-full mr-3"></div>
              <p className="font-dmSans text-base text-header">Color 1</p>
            </Flex>
            <Flex className={"border-b-2 border-infoBg py-5"}>
              <div className="bg-[#FF8686] h-[11px] w-[11px] rounded-full mr-3"></div>
              <p className="font-dmSans text-base text-header">Color 2</p>
            </Flex>
            <Flex className={"border-b-2 border-infoBg py-5"}>
              <div className="bg-[#7ED321] h-[11px] w-[11px] rounded-full mr-3"></div>
              <p className="font-dmSans text-base text-header">Color 3</p>
            </Flex>
            <Flex className={"border-b-2 border-infoBg py-5"}>
              <div className="bg-[#B6B6B6] h-[11px] w-[11px] rounded-full mr-3"></div>
              <p className="font-dmSans text-base text-header">Color 4</p>
            </Flex>
            <Flex className={"border-b-2 border-infoBg py-5"}>
              <div className="bg-[#15CBA5] h-[11px] w-[11px] rounded-full mr-3"></div>
              <p className="font-dmSans text-base text-header">Color 5</p>
            </Flex>
          </div>
        )}

        <Flex
          className={`mb-8 justify-between cursor-pointer ${
            isOpen ? "pt-11" : "pt-0"
          }`}
          onClick={brandDropdown}>
          <Heading
            text={"Shop by Brand"}
            className={"font-dmSans font-bold text-[20px] text-menuHeading"}
            as={"h4"}
          />
          {isBrand ? <FaCaretUp /> : <FaCaretDown />}
        </Flex>
        {isBrand && (
          <div className="">
            <p className="font-dmSans text-base text-header border-b-2 border-infoBg pb-5">
              Brand 1
            </p>

            <p className="font-dmSans text-base text-header border-b-2 border-infoBg py-5">
              Brand 2
            </p>

            <p className="font-dmSans text-base text-header border-b-2 border-infoBg py-5">
              Brand 3
            </p>

            <p className="font-dmSans text-base text-header border-b-2 border-infoBg py-5">
              Brand 4
            </p>

            <p className="font-dmSans text-base text-header border-b-2 border-infoBg py-5">
              Brand 5
            </p>
          </div>
        )}

        <Flex
          className={`mb-8 justify-between cursor-pointer ${
            isBrand ? "pt-11" : "pt-0"
          }`}>
          <Heading
            text={"Shop by Price"}
            className={"font-dmSans font-bold text-[20px] text-menuHeading"}
            as={"h4"}
          />
        </Flex>
        <div className="">
          <p className="font-dmSans text-base text-header border-b-2 border-infoBg pb-5">
            $0.00 - $9.99
          </p>

          <p className="font-dmSans text-base text-header border-b-2 border-infoBg py-5">
            $10.00 - $19.99
          </p>

          <p className="font-dmSans text-base text-header border-b-2 border-infoBg py-5">
            $20.00 - $29.99
          </p>

          <p className="font-dmSans text-base text-header border-b-2 border-infoBg py-5">
            $30.00 - $39.99
          </p>

          <p className="font-dmSans text-base text-header border-b-2 border-infoBg py-5">
            $40.00 - $69.99
          </p>
        </div>
      </div>
    </>
  );
};

export default Filter;
