import React from "react";
import Heading from "./Heading";
import Flex from "./Flex";

const ProductTexts = ({text, price}) => {
  return (
      <Flex className={"justify-between items-start pt-6"}>
        <Heading
          text={text}
          className={"font-dmSans font-bold text-base text-menuHeading truncate sm:w-80.5 lg:w-73"}
          as={"h4"}
        />
        <p className="font-dmSans text-base text-header">${price}</p>
      </Flex>
  );
};

export default ProductTexts;
