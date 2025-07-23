import React from "react";
import Image from "./Image";
import Heading from "./Heading";

const CartDropdown = ({ items }) => {
  return (
    <div className="absolute top-[40px] right-0 bg-header p-5 w-[358px] z-10">
      {items.length === 0 ? (
        <p>There is no product.</p>
      ) : (
        items.map((item) => (
          <div className="flex items-center">
            <Image src={item.image} alt={item.name} />
            <div className="space-y-5">
              <Heading as={"h3"} text={products.name} className={""} />
              <p>${products.price.toFixed(2)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CartDropdown;
