import React from "react";
import Intro from "./../Intro";
import Filter from "../layouts/Filter";
import Flex from "../Flex";
import Container from "../Container";
import ShopProducts from "../layouts/ShopProducts";

const Shop = () => {
  return (
    <>
      <Intro text={"Products"} pText={"Products"} />
      <Container>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <Filter />
          <ShopProducts />
        </div>
      </Container>
    </>
  );
};

export default Shop;
