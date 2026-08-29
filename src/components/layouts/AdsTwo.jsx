import React from "react";
import Container from "../Container";
import Image from "../Image";
import AdTwo from "/src/assets/ads_two.png";
import { Link } from "react-router-dom";

const AdsTwo = () => {
  return (
    <div className="my-12">
      <Container>
        <Link to={"/shop"} className="block rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
          <Image src={AdTwo} alt="Featured promotion banner" className="w-full h-full object-cover" />
        </Link>
      </Container>
    </div>
  );
};

export default AdsTwo;
