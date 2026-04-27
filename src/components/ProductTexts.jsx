import React from "react";
import Heading from "./Heading";
import Flex from "./Flex";

const ProductTexts = ({text, price}) => {
  return (
      <Flex className={"justify-between pt-6"}>
        <Heading
          text={text || "Basic Crew Neck Tee"}
          className={"font-dmSans font-bold text-[20px] text-menuHeading"}
          as={"h4"}
        />
        <p className="font-dmSans text-base text-header">{price || "$44.00"}</p>
      </Flex>
  );
};

export default ProductTexts;
