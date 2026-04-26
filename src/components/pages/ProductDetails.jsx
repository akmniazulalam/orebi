import React from "react";
import Container from "../Container";
import Image from "../Image";
import cup from "/src/assets/cup.png";
import Flex from "../Flex";
import Intro from "../Intro";
import Heading from "../Heading";
import { IoMdStar } from "react-icons/io";

const ProductDetails = () => {
  return (
    <>
      <Intro text={"Single Product"} pText={"Single Product"} />
      <Container>
        <div className={"grid grid-cols-2 grid-rows-2 gap-9 mb-10"}>
          <Image src={cup} className={"w-full"} />
          <Image src={cup} className={"w-full"} />
          <Image src={cup} className={"w-full"} />
          <Image src={cup} className={"w-full"} />
        </div>
        <div className="w-1/2">
          <Heading
            as={"h3"}
            className={"text-3xl font-bold font-dmSans"}
            text={"Product"}
          />
          <Flex className={"gap-x-5 items-center my-3"}>
            <Flex>
              <IoMdStar className="text-[#FFD881]" />
              <IoMdStar className="text-[#FFD881]" />
              <IoMdStar className="text-[#FFD881]" />
              <IoMdStar className="text-[#FFD881]" />
              <IoMdStar className="text-[#FFD881]" />
            </Flex>
            <span className="text-sm font-dmSans text-header">1 Review</span>
          </Flex>
          <Flex className={"gap-x-5 items-center mb-3"}>
            <span className="text-header text-base font-dmSans line-through">
              $88.00
            </span>
            <span className="text-[20px] font-dmSans font-bold">$44.00</span>
          </Flex>
          <hr className="text-[#d8d8d8]" />
        </div>
      </Container>
    </>
  );
};

export default ProductDetails;
