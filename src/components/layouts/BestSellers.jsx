import React, { useEffect, useState } from "react";
import Container from "../Container";
import Image from "../Image";
import Heading from "../Heading";
import Badge from "../Badge";
import ActiveButtons from "../ActiveButtons";
import ProductTexts from "../ProductTexts";
import Flex from "../Flex";
import Black from "../Black";
import apiClient from "@/lib/apiClient";
import { externalApiUrls } from "@/lib/productApi";

const BestSellers = () => {
  const [bestProduct, setBestProduct] = useState([]);

  useEffect(() => {
    async function all() {
      let res = await apiClient.get(externalApiUrls.bestSellers, {
        withCredentials: false,
      });
      setBestProduct(res.data.data);
    }
    all();
  }, []);

  return (
    <section className="pt-20 pb-16">
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
                  className={"absolute top-4.75 left-4.75"}
                />
                <ActiveButtons
                  product={item}
                  className={
                    "absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
                  }
                />
              </div>
              <ProductTexts />
              <Black />
            </div>
          ))}
        </Flex>
      </Container>
    </section>
  );
};

export default BestSellers;
