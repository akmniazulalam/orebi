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
  const [activeDot, setActiveDot] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      let res = await apiClient.get(externalApiUrls.newArrivals, {
        withCredentials: false,
      });
      let colors = ["#efefef", "#ececec", "#f9f9f9", "#eee"]; // prottek color
      let productsWithBg = res.data.products.map((item, idx) => ({
        ...item,
        bgColor: colors[idx % colors.length], // cyclic bg color
      }));
      setMyProduct(productsWithBg);
    }
    fetchData();
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
  };

  // Generate fake 4-dot array just to render them
  const fakeDotArray = [0, 1, 2, 3];

  return (
    <section className="pt-33.75">
      <Container>
        <Heading
          className={"font-dmSans font-bold text-[39px] text-menuHeading"}
          text={"New Arrivals"}
          as={"h3"}
        />
        <div className="-mx-4 mt-14 mb-6 group">
          <Slider ref={sliderRef} {...settings}>
            {myProduct.map((item) => (
              <div key={item.id} className="px-4">
                <div
                  className="relative w-full group/img"
                  style={{ backgroundColor: item.bgColor }}>
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge
                    badgeT={badgeTexts[item.id] || "New"}
                    className="absolute top-4.75 left-4.75"
                  />
                  <ActiveButtons
                    product={item}
                    className="absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
                  />
                </div>
                <ProductTexts />
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
      </Container>
    </section>
  );
};

export default NewArrivals;
