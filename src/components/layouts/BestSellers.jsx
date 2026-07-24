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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function all() {
      try {
        setLoading(true);
        setError(false);
        let res = await apiClient.get(externalApiUrls.bestSellers, {
          withCredentials: false,
        });
        if (!isMounted) return;
        setBestProduct(res.data?.data || []);
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    all();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="pt-20 pb-16">
      <Container>
        <Heading
          className={"font-dmSans font-bold text-[39px] text-menuHeading mb-14"}
          text={"Our Bestsellers"}
          as={"h3"}
        />
        {loading ? (
          <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] h-64 bg-gray-100 dark:bg-zinc-800 animate-pulse rounded-lg shrink-0"
              />
            ))}
          </div>
        ) : error ? (
          <div className="text-sm text-menuHeading text-center py-8">
            Unable to load best sellers at this time.
          </div>
        ) : bestProduct.length === 0 ? (
          <div className="text-sm text-menuHeading text-center py-8">
            No best sellers available.
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
            {bestProduct.map((item) => (
              <div key={item.id} className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] shrink-0">
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
          </div>
        )}
      </Container>
    </section>
  );
};

export default BestSellers;
