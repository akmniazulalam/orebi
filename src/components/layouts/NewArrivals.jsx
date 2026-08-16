import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Container from "../Container";
import Heading from "../Heading";
import Image from "../Image";
import Badge from "../Badge";
import ActiveButtons from "../ActiveButtons";
import ProductTexts from "../ProductTexts";
import NextArrow from "../NextArrow";
import PrevArrow from "../PrevArrow";
import apiClient from "@/lib/apiClient";
import { externalApiUrls } from "@/lib/productApi";

const NewArrivals = () => {
  const [myProduct, setMyProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      try {
        setLoading(true);
        setError(false);
        let res = await apiClient.get(externalApiUrls.newArrivals, {
          withCredentials: false,
        });
        if (!isMounted) return;
        let colors = ["#efefef", "#ececec", "#f9f9f9", "#eee"];
        let productsWithBg = (res.data?.data || []).map((item, idx) => ({
          ...item,
          bgColor: colors[idx % colors.length],
        }));
        setMyProduct(productsWithBg);
      } catch (err) {
        if (isMounted) setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);
  const badgeTexts = {
    1: "10%",
    3: "Sale",
    4: "20%",
    5: "15%",
    6: "16%",
    7: "18%",
    8: "New",
    14: "10%",
    18: "14%",
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    cssEase: "ease-in-out",
    afterChange: (index) => {
      setActiveDot(index % 4); // Always 0 to 3
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Generate fake 4-dot array just to render them
  const fakeDotArray = [0, 1, 2, 3];

  return (
    <section className="pt-10 md:pt-33.75">
      <Container>
        <Heading
          className={"font-dmSans font-bold text-[39px] text-menuHeading"}
          text={"New Arrivals"}
          as={"h3"}
        />
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-14 mb-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-64 bg-gray-100 dark:bg-zinc-800 animate-pulse rounded-lg"
              />
            ))}
          </div>
        ) : error ? (
          <div className="mt-14 mb-6 text-sm text-menuHeading text-center py-8">
            Unable to load new arrivals at this time.
          </div>
        ) : myProduct.length === 0 ? (
          <div className="mt-14 mb-6 text-sm text-menuHeading text-center py-8">
            No new arrivals available.
          </div>
        ) : (
          <div className="-mx-4 mt-14 mb-6 group">
            <Slider ref={sliderRef} {...settings}>
              {myProduct.map((item) => (
                <div key={item.id} className="px-4">
                  <div
                    className="relative w-full group/img"
                    style={{ backgroundColor: item.bgColor }}>
                    <Image
                      src={item.variants[0]?.images[0] || item.image}
                      alt={item.title}
                      className="w-full h-[331px] object-cover"
                    />
                    <Badge
                      badgeT={item.variants[0]?.badge || "New"}
                      className="absolute top-4.75 left-4.75"
                    />
                    <ActiveButtons
                      product={item}
                      className="absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
                    />
                  </div>
                  <ProductTexts text={item.title || item.name} price={item.variants[0]?.price || item.price} />
                </div>
              ))}
            </Slider>

            {/* Custom Dot Renderer - Fixed 4 Dots */}
            <div className="flex justify-center mt-6">
              {fakeDotArray.map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 mx-2 flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    sliderRef.current.slickGoTo(i);
                    setActiveDot(i); // instant change, no late effect
                  }}>
                  {i === activeDot ? (
                    <div className="w-6 h-6 border-2 border-black dark:border-white rounded-full flex items-center justify-center cursor-pointer">
                      <div className="w-2 h-2 bg-black rounded-full dark:bg-white" />
                    </div>
                  ) : (
                    <div className="w-2 h-2 bg-black dark:bg-white rounded-full cursor-pointer" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default NewArrivals;
