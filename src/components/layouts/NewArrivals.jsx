import React from "react";
import Slider from "react-slick";
import Container from "../Container";
import Heading from "../Heading";
import Image from "../Image";
import Clock from "/src/assets/alarmClock.png";
import SmartWatch from "/src/assets/smartWatch.png";
import Basket from "/src/assets/basket.png";
import Bag from "/src/assets/bag.png";
import Cup from "/src/assets/cup.png";
import Badge from "../Badge";
import ActiveButtons from "../ActiveButtons";
import ProductTexts from "../ProductTexts";
import ProductList from './../ProductList';
import products from "../../data/products";






const NewArrivals = ({addToCart}) => {

  const newArrivalsProducts = products.filter((product) => product.category === "newArrivals")

  return (
    <section className="pt-[135px]">
      <Container>
        <Heading
          className={"font-dmSans font-bold text-[39px] text-menuHeading"}
          text={"New Arrivals"}
          as={"h3"}
        />
        <div className="productSlider mt-14 mb-16 group">
        {/* <Slider {...settings}>
          <div className="px-4">
            <div className="relative w-full group/img">
              <Image
                src={Clock}
                alt={"Clock"}
                className={"w-full h-full object-cover"}
              />
              <Badge
                badgeT={"10%"}
                className={"absolute top-[19px] left-[19px]"}
              />
              <ActiveButtons
                className={
                  "absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
                }
              />
            </div>
            <ProductTexts />
          </div>
          <div className="px-4">
            <div className="relative w-full group/img">
              <Image
                src={SmartWatch}
                alt={"SmartWatch"}
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
          </div>
          <div className="px-4">
            <div className="relative w-full group/img">
              <Image
                src={Basket}
                alt={"Basket"}
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
          </div>
          <div className="px-4">
            <div className="relative w-full group/img">
              <Image
                src={Bag}
                alt={"Bag"}
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
          </div>
          <div className="px-4">
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
          </div>
        </Slider> */}
        <ProductList addToCart={addToCart} products={newArrivalsProducts} isSlide/>
        </div>
      </Container>
    </section>
  );
};

export default NewArrivals;
