import React from "react";
import Intro from "./../Intro";
import Container from "../Container";
import ShopProducts from "../layouts/ShopProducts";

const Shop = () => {
  return (
    <>
      <Intro text={"Products"} pText={"Products"} />
      <Container>
        <ShopProducts />
      </Container>
    </>
  );
};

export default Shop;
