import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";
import Badge from "./Badge";
import ActiveButtons from "./ActiveButtons";
import Slider from "react-slick";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";
import ProductTexts from "./ProductTexts";
import VariantDisplay from "./VariantDisplay";
import Black from "./Black";
import { normalizeProductForDisplay } from "@/lib/productUtils";

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  autoplaySpeed: 2000,
  pauseOnHover: false,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
    { breakpoint: 320, settings: { slidesToShow: 1 } },
  ],
};

function ProductCard({ product, className = "" }) {
  const display = normalizeProductForDisplay(product);

  const cardContent = (
    <>
      <div className="relative w-full group/img">
        <Image
          src={display.image}
          alt={display.name}
          className="w-full h-full object-cover"
        />
        {display.badge ? (
          <Badge
            badgeT={display.badge}
            className="absolute top-[19px] left-[19px]"
          />
        ) : null}
        <ActiveButtons
          className="absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
          product={product}
        />
      </div>

      <ProductTexts text={display.name} price={display.price} />

      {display.hasVariants ? (
        <VariantDisplay variants={display.variants} />
      ) : (
        <Black color={display.color} />
      )}

      {display.hasVariants && display.variantCount > 1 ? (
        <p className="font-dmSans text-[11px] text-header/60 pt-2">
          {display.variantCount} variants
          {display.color ? ` · From ${display.color}` : ""}
        </p>
      ) : null}
    </>
  );

  const wrapperClass = `relative w-full ${className}`.trim();

  if (display.detailPath) {
    return (
      <Link to={display.detailPath} className={`${wrapperClass} block group`}>
        {cardContent}
      </Link>
    );
  }

  return <div className={wrapperClass}>{cardContent}</div>;
}

const ProductList = ({
  products = [],
  isSlide = false,
  gridClassName = "grid grid-cols-4 gap-8",
  slideClassName = "-mx-4",
}) => {
  if (!products.length) {
    return null;
  }

  if (isSlide) {
    return (
      <div className={slideClassName}>
        <Slider {...sliderSettings}>
          {products.map((product) => {
            const display = normalizeProductForDisplay(product);

            return (
              <div key={display.id} className="w-full px-4">
                <ProductCard product={product} />
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }

  return (
    <div className={gridClassName}>
      {products.map((product) => {
        const display = normalizeProductForDisplay(product);

        return <ProductCard key={display.id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;
