import React from "react";
import usePageTitle from "@/hooks/usePageTitle";
import Intro from "./../Intro";
import Container from "../Container";
import ShopProducts from "../layouts/ShopProducts";

const Shop = () => {
  usePageTitle("Shop");
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
