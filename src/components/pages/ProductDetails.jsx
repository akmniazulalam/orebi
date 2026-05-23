import React, { useEffect, useState } from "react";
import Container from "../Container";
import Image from "../Image";
import { ShoppingCart, Check, Shirt } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Flex from "../Flex";
import Intro from "../Intro";
import Heading from "../Heading";
import { IoMdStar } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "react-router-dom";
import axios from "axios";
import useCart from "@/store/cart";

const ProductDetails = () => {
  const { id } = useParams();
  const addToCart = useCart((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [singleProduct, setSingleProduct] = useState(null);

  const [animating, setAnimating] = useState(false);
  const [showText, setShowText] = useState(true);
  const [showShirt, setShowShirt] = useState(false);
  const [showTick, setShowTick] = useState(false);
  const [moveCart, setMoveCart] = useState(false);

  const cartControls = useAnimation();
  const shirtControls = useAnimation();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleClick = async () => {
    addToCart(singleProduct);
    if (animating) return;

    setAnimating(true);

    // HIDE TEXT
    setShowText(false);

    // CART CENTER
    await cartControls.start({
      x: 64,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    });

    await sleep(300);

    // SHOW SHIRT
    setShowShirt(true);

    await sleep(300);

    // SHIRT UP
    await shirtControls.start({
      y: -50,
      scale: 1.35,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    await sleep(150);

    // SHIRT RETURN
    await shirtControls.start({
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: "easeInOut",
      },
    });

    await sleep(300);

    // HIDE SHIRT
    setShowShirt(false);

    // SHOW TICK
    setShowTick(true);

    await sleep(700);

    // MOVE CART
    setMoveCart(true);

    await cartControls.start({
      x: 155,
      transition: {
        duration: 1.2,
        ease: "easeInOut",
      },
    });

    // RESET
    setTimeout(async () => {
      setShowText(true);
      setShowTick(false);
      setMoveCart(false);

      await cartControls.start({
        x: 0,
        transition: {
          duration: 0,
        },
      });

      setAnimating(false);
    }, 500);
  };

  useEffect(() => {
    axios
      .get(
        `https://mern-ecommerce-91cv.onrender.com/api/v1/product/singleproduct/${id}`,
      )
      .then((res) => setSingleProduct(res.data.data));
  }, []);

  const handleIncrement = () => {
    if (quantity < singleProduct?.variants[0].stock) {
      setQuantity(quantity + 1);
    }
  };
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <>
      <Intro text={"Single Product"} pText={"Single Product"} />
      <Container>
        <div className={"grid grid-cols-2  gap-9 mb-10"}>
          <Image
            src={singleProduct?.variants[0].images[0]}
            className={"w-full"}
          />
          {singleProduct?.variants[1] && (
            <Image
              src={singleProduct?.variants[1].images[0]}
              className={"w-full"}
            />
          )}
          {singleProduct?.variants[2] && (
            <Image
              src={singleProduct?.variants[2].images[0]}
              className={"w-full"}
            />
          )}
          {singleProduct?.variants[3] && (
            <Image
              src={singleProduct?.variants[3].images[0]}
              className={"w-full"}
            />
          )}
        </div>
        <div className="w-1/2">
          <Heading
            as={"h3"}
            className={"text-3xl font-bold font-dmSans"}
            text={singleProduct?.name}
          />
          <Flex className={"gap-x-5 items-center my-3"}>
            <Flex>
              <IoMdStar className="text-[#FFD881]" />
              <IoMdStar className="text-[#FFD881]" />
              <IoMdStar className="text-[#FFD881]" />
              <IoMdStar className="text-[#FFD881]" />
              <IoMdStar className="text-[#FFD881]" />
            </Flex>
            <span className="text-sm font-dmSans text-header">1 Review</span>
          </Flex>
          <Flex className={"gap-x-5 items-center mb-3"}>
            <span className="text-header text-base font-dmSans line-through">
              $88.00
            </span>
            <span className="text-[20px] font-dmSans font-bold">
              ${singleProduct?.variants[0].price}
            </span>
          </Flex>
          <hr className="text-[#d8d8d8]" />
          <Flex className={"my-8 items-center gap-x-11"}>
            <Heading
              as={"h4"}
              className={"uppercase font-dmSans font-bold text-sm"}
              text={"color:"}
            />
            <Flex className={"gap-x-3 items-center"}>
              {singleProduct?.variants.map((item, index) => (
                <FaCircle
                  key={index}
                  style={{ color: item.color }}
                  className="w-5 h-5 cursor-pointer hover:scale-135 transition-all duration-300 object-cover"
                />
              ))}
            </Flex>
          </Flex>
          <Flex className={"my-8 items-center gap-x-16"}>
            <Heading
              as={"h4"}
              className={"uppercase font-dmSans font-bold text-sm"}
              text={"size:"}
            />
            <Select className={"rounded-none!"}>
              <SelectTrigger className="w-36 h-10 rounded-none">
                <SelectValue placeholder={singleProduct?.variants[0].size} />
              </SelectTrigger>

              <SelectContent position="popper">
                <SelectGroup>
                  <SelectLabel>Sizes</SelectLabel>
                  {singleProduct?.variants.map((item) => (
                    <SelectItem key={item._id} value={item.size}>
                      {item.size}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Flex>
          <Flex className={"my-8 items-center gap-x-6"}>
            <Heading
              as={"h4"}
              className={"uppercase font-dmSans font-bold text-sm"}
              text={"quantity:"}
            />
            <div className="border py-1.5 px-4 w-36 flex gap-x-10 font-dmSans text-header">
              <button onClick={handleDecrement} className="cursor-pointer">
                -
              </button>
              <h6>{quantity}</h6>
              <button onClick={handleIncrement} className="cursor-pointer">
                +
              </button>
            </div>
          </Flex>
          <hr className="text-[#d8d8d8]" />
          <Flex className={"my-6 items-center gap-x-6"}>
            <Heading
              as={"h4"}
              className={"uppercase font-dmSans font-bold text-sm"}
              text={"status:"}
            />
            <p className="text-header font-dmSans">In stock</p>
          </Flex>
          <hr className="text-[#d8d8d8]" />
          <Flex className={"my-8 items-center gap-x-4"}>
            <button className="py-3 px-10 text-menuHeading dark:hover:text-[#262626] text-base font-bold font-dmSans hover:bg-menuHeading hover:text-white transition-all duration-300 cursor-pointer border-2 border-menuHeading">
              Add to Wish List
            </button>
            <button
              onClick={handleClick}
              className="relative overflow-visible py-3 px-10 w-[220px] h-[52px] text-menuHeading dark:hover:text-[#262626] group text-base font-bold font-dmSans hover:bg-menuHeading hover:text-white transition-all duration-300 cursor-pointer border-2 border-menuHeading flex items-center justify-center">
              {/* TEXT */}
              {showText && (
                <motion.span className="ml-8 transition-colors duration-300 group-hover:text-[#262626]">
                  Add to Cart
                </motion.span>
              )}

              {/* CART */}
              <motion.div animate={cartControls} className="absolute left-9">
                <div className="relative w-[36px] h-[28px]">
                  {/* MAIN CART */}
                  <motion.div
                    animate={
                      moveCart
                        ? {
                            x: [0, 2, 0],
                          }
                        : {}
                    }
                    transition={{
                      repeat: moveCart ? Infinity : 0,
                      duration: 0.2,
                    }}>
                    <ShoppingCart
                      size={28}
                      className="text-menuHeading transition-colors duration-300 group-hover:text-[#262626]"
                      strokeWidth={2.2}
                    />
                  </motion.div>

                  {/* SHIRT */}
                  {showShirt && (
                    <motion.div
                      initial={{
                        y: 0,
                        scale: 1,
                        rotate: 0,
                        opacity: 1,
                      }}
                      animate={shirtControls}
                      className="absolute left-[10px] top-[8px] z-50">
                      <Shirt
                        size={18}
                        className="text-menuHeading group-hover:text-black"
                        strokeWidth={2.5}
                      />
                    </motion.div>
                  )}

                  {/* SMALL CLEAR TICK */}
                  {showTick && (
                    <motion.div
                      initial={{
                        scale: 0,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="absolute left-[12px] top-[8px] z-20">
                      <Check size={11} className="text-green-400 stroke-[4]" />
                    </motion.div>
                  )}

                  {/* WHEELS */}
                  {moveCart && (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.25,
                          ease: "linear",
                        }}
                        className="absolute bottom-[0px] left-[5px] w-[6px] h-[6px] border border-white rounded-full"
                      />

                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.25,
                          ease: "linear",
                        }}
                        className="absolute bottom-[0px] right-[4px] w-[6px] h-[6px] border border-white rounded-full"
                      />
                    </>
                  )}
                </div>
              </motion.div>
            </button>
          </Flex>
          <hr className="text-[#d8d8d8]" />
          <Flex className={"my-6 items-center justify-between gap-x-6"}>
            <Heading
              as={"h4"}
              className={"uppercase font-dmSans font-bold text-sm"}
              text={"features & details"}
            />
            <span className="text-black font-dmSans">+</span>
          </Flex>
          <hr className="text-[#d8d8d8]" />
          <Flex className={"my-6 items-center justify-between gap-x-6"}>
            <Heading
              as={"h4"}
              className={"uppercase font-dmSans font-bold text-sm"}
              text={"shipping & returns"}
            />
            <span className="text-black font-dmSans">+</span>
          </Flex>
          <hr className="text-[#d8d8d8]" />
          <p className="font-dmSans text-base text-header leading-7 mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </Container>
    </>
  );
};

export default ProductDetails;
