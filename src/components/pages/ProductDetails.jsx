import React, { useEffect, useState } from "react";
import Container from "../Container";
import Image from "../Image";
import cup from "/src/assets/cup.png";
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
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/cart/addToCartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(1)
  const [singleProduct, setSingleProduct] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://mern-ecommerce-91cv.onrender.com/api/v1/product/singleproduct/${id}`,
      )
      .then((res) => setSingleProduct(res.data.data));
  }, []);

  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }
  const handleDecrement = () => {
    if (quantity > 1) {
        setQuantity(quantity - 1)
    }
  }
  return (
    <>
      <Intro text={"Single Product"} pText={"Single Product"} />
      <Container>
        <div className={"grid grid-cols-2 grid-rows-2 gap-9 mb-10"}>
          <Image src={singleProduct?.image} className={"w-full"} />
          <Image src={singleProduct?.image} className={"w-full"} />
          <Image src={singleProduct?.image} className={"w-full"} />
          <Image src={singleProduct?.image} className={"w-full"} />
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
            <span className="text-[20px] font-dmSans font-bold">${singleProduct?.price}</span>
          </Flex>
          <hr className="text-[#d8d8d8]" />
          <Flex className={"my-8 items-center gap-x-11"}>
            <Heading
              as={"h4"}
              className={"uppercase font-dmSans font-bold text-sm"}
              text={"color:"}
            />
            <Flex className={"gap-x-3 items-center"}>
              <FaCircle className="text-[#979797] w-5 h-5 cursor-pointer hover:scale-135 transition-all duration-300 object-cover" />
              <FaCircle className="text-[#FF8686] w-5 h-5 cursor-pointer hover:scale-135 transition-all duration-300 object-cover" />
              <FaCircle className="text-[#7ED321] w-5 h-5 cursor-pointer hover:scale-135 transition-all duration-300 object-cover" />
              <FaCircle className="text-[#B6B6B6] w-5 h-5 cursor-pointer hover:scale-135 transition-all duration-300 object-cover" />
              <FaCircle className="text-[#15CBA5] w-5 h-5 cursor-pointer hover:scale-135 transition-all duration-300 object-cover" />
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
                <SelectValue placeholder={singleProduct?.size} />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sizes</SelectLabel>

                  <SelectItem value="xs">Extra Small</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="md">Medium</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                  <SelectItem value="xl">Extra Large</SelectItem>
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
              <button onClick={handleDecrement} className="cursor-pointer">-</button>
              <h6>{quantity}</h6>
              <button onClick={handleIncrement} className="cursor-pointer">+</button>
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
            <button className="py-3 px-10 text-menuHeading text-base font-bold font-dmSans hover:bg-menuHeading hover:text-white transition-all duration-300 cursor-pointer border-2 border-menuHeading">
              Add to Wish List
            </button>
            <button className="py-3 px-10 text-menuHeading text-base font-bold font-dmSans hover:bg-menuHeading hover:text-white transition-all duration-300 cursor-pointer border-2 border-menuHeading" onClick={() => dispatch(addToCart(singleProduct))}>
              Add to Cart
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
