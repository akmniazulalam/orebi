import Container from "../Container";
import Heading from "../Heading";
import Image from "../Image";
import Badge from "../Badge";
import ActiveButtons from "../ActiveButtons";
import ProductTexts from "../ProductTexts";
import Flex from "../Flex";
import Black from "../Black";
import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import { externalApiUrls } from "@/lib/productApi";

const SpecialOffers = () => {
  const [mySpecial, setSpecial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function all() {
      try {
        setLoading(true);
        setError(false);
        let res = await apiClient.get(externalApiUrls.specialOffers, {
          withCredentials: false,
        });
        if (!isMounted) return;
        setSpecial(res.data?.data || []);
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
    <section className="pt-10 md:pt-30">
      <Container>
        <Heading
          className={"font-dmSans font-bold text-[39px] text-menuHeading pb-14"}
          text={"Special Offers"}
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
            Unable to load special offers at this time.
          </div>
        ) : mySpecial.length === 0 ? (
          <div className="text-sm text-menuHeading text-center py-8">
            No special offers available.
          </div>
        ) : (
          <div className="flex flex-wrap gap-8 justify-center sm:justify-start">
            {mySpecial.map((item) => {
              const variant = item.variants?.find(
                (variant) =>
                  variant.salePrice && variant.salePrice < variant.price,
              );

              if (!variant) return null;

              const discount = Math.round(
                ((variant.price - variant.salePrice) / variant.price) * 100,
              );

              return (
                <div
                  key={item._id}
                  className="w-full sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)] shrink-0">
                  <div className="relative w-full group/img">
                    <Image
                      src={variant.images?.[0]}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />

                    <Badge
                      badgeT={`-${discount}%`}
                      className="absolute top-4.75 left-4.75"
                    />

                    <ActiveButtons
                      product={item}
                      className="absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
                    />
                  </div>

                  <ProductTexts />
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
};

export default SpecialOffers;
