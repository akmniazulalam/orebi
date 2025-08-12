import React, { useEffect, useState } from "react";
import Container from "../Container";
import Image from "../Image";
import ProductOne from "/src/assets/productOne.png";
import ProductTwo from "/src/assets/productTwo.png";
import Cup from "/src/assets/cup.png";
import ProductThree from "/src/assets/productThree.png";
import Heading from "../Heading";
import Badge from "../Badge";
import ActiveButtons from "../ActiveButtons";
import ProductTexts from "../ProductTexts";
import Flex from "../Flex";
import Black from "../Black";
import axios from "axios";

const BestSellers = () => {
  const [bestProduct, setBestProduct] = useState([]);

  useEffect(() => {
    async function all() {
      let data = await axios.get(
        "https://akmniazulalam.github.io/orebiApi/data/index.json"
      );
      setBestProduct(data.data.data);      
    }
    all();
  }, []);

  return (
    <section className="pt-[80px] pb-16">
      <Container>
        <Heading
          className={"font-dmSans font-bold text-[39px] text-menuHeading mb-14"}
          text={"Our Bestsellers"}
          as={"h3"}
        />
        <Flex className={"gap-x-8"}>
          {bestProduct.map((item) => (
            <div key={item.id}>
              <div className="relative w-full group/img">
                <Image
                  src={item.image}
                  alt={item.title}
                  className={"w-full h-full object-cover"}
                />
                <Badge
                  badgeT={"New"}
                  className={"absolute top-[19px] left-[19px]"}
                />
                <ActiveButtons
                  className={
                    "absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
                  }
                />
              </div>
              <ProductTexts />
              <Black />
            </div>
          ))}
          {/* <div>
            <div className="relative w-full group/img">
              <Image
                src={ProductTwo}
                alt={"ProductTwo"}
                className={"w-full h-full object-cover"}
              />
              <Badge
                badgeT={"New"}
                className={"absolute top-[19px] left-[19px]"}
              />
              <ActiveButtons
                className={
                  "absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
                }
              />
            </div>
            <ProductTexts />
            <Black />
          </div>
          <div>
            <div className="relative w-full group/img">
              <Image
                src={Cup}
                alt={"Cup"}
                className={"w-full h-full object-cover"}
              />
              <Badge
                badgeT={"New"}
                className={"absolute top-[19px] left-[19px]"}
              />
              <ActiveButtons
                className={
                  "absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
                }
              />
            </div>
            <ProductTexts />
            <Black />
          </div>
          <div>
            <div className="relative w-full group/img">
              <Image
                src={ProductThree}
                alt={"ProductThree"}
                className={"w-full h-full object-cover"}
              />
              <Badge
                badgeT={"New"}
                className={"absolute top-[19px] left-[19px]"}
              />
              <ActiveButtons
                className={
                  "absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
                }
              />
            </div>
            <ProductTexts />
            <Black />
          </div> */}
        </Flex>
      </Container>
    </section>
  );
};

export default BestSellers;
