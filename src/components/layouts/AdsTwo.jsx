import React from "react";
import Container from "../Container";
import Image from "../Image";
import AdTwo from "/src/assets/ads_two.png";
import { Link } from "react-router-dom";

const AdsTwo = () => {
  return (
    <div className="mt-12">
      <Container>
        <Link to={"/shop"}>
          <Image src={AdTwo} alt={AdTwo} />
        </Link>
      </Container>
    </div>
  );
};

export default AdsTwo;
