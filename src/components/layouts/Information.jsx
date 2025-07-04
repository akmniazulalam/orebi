import React from "react";
import Container from "../Container";
import { PiNumberTwoBold } from "react-icons/pi";
import { FaTruck, FaUndoAlt } from "react-icons/fa";
import Flex from "./../Flex";
import Heading from "../Heading";

const Information = () => {
  return (
    <div className="border-b-2 border-infoBg pt-5 pb-8">
      <Container>
        <Flex className={"justify-between"}>
          <Flex className={"gap-x-2"}>
            <PiNumberTwoBold className="text-[22px] text-menuHeading" />
            <Heading
              text={"Two years warranty"}
              as={"h3"}
              className={"font-dmSans text-base text-footerTexts"}
            />
          </Flex>
          <Flex className={"gap-x-2"}>
            <FaTruck className="text-[22px] text-menuHeading" />
            <Heading
              text={"Free shipping"}
              as={"h3"}
              className={"font-dmSans text-base text-footerTexts"}
            />
          </Flex>
          <Flex className={"gap-x-3"}>
            <FaUndoAlt className="text-[22px] text-menuHeading" />
            <Heading
              text={"Return policy in 30 days"}
              as={"h3"}
              className={"font-dmSans text-base text-footerTexts"}
            />
          </Flex>
        </Flex>
      </Container>
    </div>
  );
};

export default Information;
