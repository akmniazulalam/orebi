import React, { useEffect, useMemo, useState } from "react";
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
import { Link, useParams } from "react-router-dom";
import useCart from "@/store/cart";
import { FaTshirt } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import { fetchProductById } from "@/services/productService";
import { buildCartLineItem, findVariantByOptions } from "@/lib/cartUtils";
import { getPrimaryVariant, getUniqueVariantColors } from "@/lib/productUtils";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const addToCart = useCart((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);
  const [singleProduct, setSingleProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [animating, setAnimating] = useState(false);
  const [showText, setShowText] = useState(true);
  const [showShirt, setShowShirt] = useState(false);
  const [showTick, setShowTick] = useState(false);
  const [moveCart, setMoveCart] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [shirtReturn, setShirtReturn] = useState(false);
  const [fillColor, setFillColor] = useState(false);
  const cartControls = useAnimation();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleClick = async () => {
    if (animating) return;

    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }

    addToCart(buildCartLineItem(singleProduct, selectedVariant, quantity));

    // HIDE TEXT
    setShowText(false);
    setAnimating(true);

    // MOVE CART TO CENTER
    await cartControls.start({
      x: 56,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    await sleep(120);

    // BORDER STRETCH EFFECT
    setShowPortal(true);

    await sleep(80);

    // SHIRT COMES OUT
    setShowShirt(true);

    // SHIRT GOING UP
    await sleep(320);

    // BORDER NORMAL AGAIN
    setShowPortal(false);

    // SHIRT STAYS UP
    await sleep(250);

    // SHIRT RETURNS TO CART
    setShirtReturn(true);

    await sleep(350);

    setFillColor(true);

    // HIDE SHIRT
    setShowShirt(false);
    setShirtReturn(false);

    // SUCCESS TICK
    setShowTick(true);

    await sleep(650);

    // CART DRIVE
    setMoveCart(true);

    await cartControls.start({
      x: 200,
      transition: {
        duration: 1.1,
        ease: "easeInOut",
      },
    });

    await sleep(50);

    // START RESET
    setMoveCart(false);
    setShowTick(false);
    setFillColor(false);
    setResetting(true);

    cartControls.set({
      x: -64,
    });

    setTimeout(async () => {
      // text first invisible obosthay left e ready thakbe
      setShowText(true);

      await Promise.all([
        cartControls.start({
          x: 0,
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          },
        }),
      ]);

      setResetting(false);
      setAnimating(false);
    }, 50);
  };

  useEffect(() => {
    setIsLoading(true);
    setLoadError(null);

    fetchProductById(id)
      .then((product) => {
        if (!product) {
          setLoadError("Product not found");
          return;
        }
        setSingleProduct(product);
        const primary = getPrimaryVariant(product.variants);
        setSelectedColor(primary?.color || "");
        setSelectedSize(primary?.size || "");
        setQuantity(1);
      })
      .catch(() => setLoadError("Failed to load product"))
      .finally(() => setIsLoading(false));
  }, [id]);

  const selectedVariant = useMemo(
    () =>
      findVariantByOptions(singleProduct?.variants, {
        color: selectedColor,
        size: selectedSize,
      }),
    [singleProduct, selectedColor, selectedSize],
  );

  const colorOptions = useMemo(
    () => getUniqueVariantColors(singleProduct?.variants ?? []),
    [singleProduct],
  );

  const sizeOptions = useMemo(() => {
    const sizes = new Set();
    (singleProduct?.variants ?? []).forEach((variant) => {
      if (variant.size?.trim()) {
        sizes.add(variant.size.trim());
      }
    });
    return [...sizes];
  }, [singleProduct]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const match = findVariantByOptions(singleProduct?.variants, {
      color,
      size: selectedSize,
    });
    if (match?.size) {
      setSelectedSize(match.size);
    }
    setQuantity(1);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    const match = findVariantByOptions(singleProduct?.variants, {
      color: selectedColor,
      size,
    });
    if (match?.color) {
      setSelectedColor(match.color);
    }
    setQuantity(1);
  };

  const handleIncrement = () => {
    const maxStock = Number(selectedVariant?.stock ?? 0);
    if (quantity < maxStock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-header font-dmSans">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        Loading product...
      </div>
    );
  }

  if (loadError || !singleProduct) {
    return (
      <Container>
        <div className="py-20 text-center font-dmSans">
          <p className="text-lg font-semibold text-menuHeading">{loadError}</p>
          <Link to="/shop" className="inline-block mt-4 underline text-header">
            Back to shop
          </Link>
        </div>
      </Container>
    );
  }

  const variants = singleProduct.variants ?? [];
  const galleryImages = variants
    .map((variant) => variant.images?.[0])
    .filter(Boolean)
    .slice(0, 4);

  return (
    <>
      <Intro text={"Single Product"} pText={"Single Product"} />
      <Container>
        <div className={"grid grid-cols-2 gap-9 mb-10"}>
          {(galleryImages.length ? galleryImages : [selectedVariant?.images?.[0]]).map(
            (src, index) =>
              src ? (
                <Image key={`${src}-${index}`} src={src} className="w-full" />
              ) : null,
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
              ${Number(selectedVariant?.price ?? 0).toFixed(2)}
            </span>
          </Flex>
          <hr className="text-[#d8d8d8]" />
          <Flex className={"my-8 items-center gap-x-11"}>
            <Heading
              as={"h4"}
              className={"uppercase font-dmSans font-bold text-sm"}
              text={"color:"}
            />
            <Flex className={"gap-x-3 items-center flex-wrap"}>
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  title={color}
                  onClick={() => handleColorSelect(color)}
                  className={`rounded-full p-1 cursor-pointer transition-transform ${
                    selectedColor === color
                      ? "ring-2 ring-menuHeading scale-110"
                      : "hover:scale-120 transition-all duration-300"
                  }`}>
                  <FaCircle
                    style={{ color }}
                    className="w-5 h-5"
                  />
                </button>
              ))}
            </Flex>
          </Flex>
          <Flex className={"my-8 items-center gap-x-16"}>
            <Heading
              as={"h4"}
              className={"uppercase font-dmSans font-bold text-sm"}
              text={"size:"}
            />
            <Select
              value={selectedSize || undefined}
              onValueChange={handleSizeSelect}>
              <SelectTrigger className="w-36 h-10 rounded-none">
                <SelectValue placeholder={selectedSize || "Select size"} />
              </SelectTrigger>

              <SelectContent position="popper">
                <SelectGroup>
                  <SelectLabel>Sizes</SelectLabel>
                  {sizeOptions.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
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
            <p className="text-header font-dmSans">
              {Number(selectedVariant?.stock) > 0
                ? `In stock (${selectedVariant.stock} available)`
                : "Out of stock"}
            </p>
          </Flex>
          <hr className="text-[#d8d8d8]" />
          <Flex className={"my-8 items-center gap-x-4"}>
            <button className="py-3 px-10 text-menuHeading dark:hover:text-[#262626] text-base font-bold font-dmSans hover:bg-menuHeading hover:text-white transition-all duration-300 cursor-pointer border-2 border-menuHeading">
              Add to Wish List
            </button>
            <button
              onClick={handleClick}
              className={`relative ${moveCart ? "overflow-hidden" : resetting ? "overflow-hidden" : "overflow-visible"} py-3 px-10 w-55 h-13 text-white bg-menuHeading text-base font-bold font-dmSans cursor-pointer border-2 border-menuHeading flex items-center justify-center`}>
              {/* TEXT */}

              <motion.span
                initial={false}
                animate={
                  !showText
                    ? {
                        opacity: 0,
                        x: -30,
                        transition: {
                          opacity: {
                            duration: 0.15,
                          },
                          x: {
                            delay: 0.15,
                            duration: 0,
                          },
                        },
                      }
                    : resetting
                      ? {
                          opacity: [0, 1],
                          x: [-60, 0],
                        }
                      : {
                          opacity: 1,
                          x: 0,
                        }
                }
                transition={{
                  duration: resetting ? 1 : 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="ml-8 transition-colors duration-300 text-white dark:text-[#262626]">
                Add to Cart
              </motion.span>

              {/* ELASTIC BORDER BUMP */}
              <AnimatePresence>
                {showPortal && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      scaleX: 0.7,
                    }}
                    animate={{
                      opacity: 1,
                      scaleX: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scaleX: 0.8,
                    }}
                    transition={{
                      duration: 0.18,
                      ease: "easeOut",
                    }}
                    className="absolute left-1/2 top-[-19px] -translate-x-1/2 z-40 pointer-events-none">
                    {/* OUTER SHAPE */}
                    <div className="relative w-32 h-6">
                      {/* INNER CUT */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 500 120"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="none">
                        <path
                          d="M 0 96 L 0 90 C 80 90, 170 75, 250 20 C 330 75, 420 90, 500 90 L 500 96 Z"
                          fill="#262626"
                          className="fill-menuHeading"
                        />
                      </svg>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CINEMATIC SHIRT */}
              <AnimatePresence>
                {showShirt && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      x: "-24%",
                      y: 6,
                      // scale: 0.5,
                      rotate: 0,
                    }}
                    animate={
                      shirtReturn
                        ? {
                            opacity: 1,
                            x: "-24%",
                            y: 6,
                            // scale: 0.55,
                            rotate: 0,
                          }
                        : {
                            opacity: 1,
                            x: "-24%",
                            y: -95,
                            scale: 1.2,
                            rotate: 0,
                          }
                    }
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute left-[47%] top-0.5 z-50 pointer-events-none">
                    <FaTshirt
                      size={24}
                      className={`drop-shadow-xl transition-colors duration-300
                      ${
                        shirtReturn
                          ? "text-white dark:text-[#262626]"
                            : "text-menuHeading dark:text-white"
                      }
                    `}
                      strokeWidth={2.5}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* CART */}
              <motion.div animate={cartControls} className="absolute left-9">
                {/* WHOLE CART SYSTEM */}
                <motion.div
                  className="relative w-9 h-7"
                  animate={
                    resetting
                      ? {
                          x: [-80, 0],
                          opacity: [0, 1],
                        }
                      : {
                          x: 0,
                          opacity: 1,
                          rotate: moveCart ? -12 : 0,
                          y: moveCart ? -2 : 0,
                        }
                  }
                  transition={{
                    duration: resetting ? 1 : 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    transformOrigin: "8px 22px",
                  }}>
                  {/* MAIN CART */}
                  <ShoppingCart
                    size={28}
                    className={`text-menuHeading ${fillColor ? "fill-white dark:fill-[#262626]" : "fill-none"} transition-colors duration-300 text-white dark:text-[#262626]`}
                    strokeWidth={2.2}
                  />

                  {/* SUCCESS TICK */}
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
                      className="absolute left-2.5 top-2 z-20">
                      <Check size={11} className="text-red-400 stroke-4" />
                    </motion.div>
                  )}
                </motion.div>
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
            <span className="text-menuHeading font-dmSans">+</span>
          </Flex>
          <hr className="text-[#d8d8d8]" />
          <Flex className={"my-6 items-center justify-between gap-x-6"}>
            <Heading
              as={"h4"}
              className={"uppercase font-dmSans font-bold text-sm"}
              text={"shipping & returns"}
            />
            <span className="text-menuHeading font-dmSans">+</span>
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
