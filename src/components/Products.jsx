import React from "react";
import Image from "./Image";
import Badge from "./Badge";
import ActiveButtons from "./ActiveButtons";
import ProductTexts from "./ProductTexts";
import Black from "/src/components/Black"

const Products = ({src, alt, className, isBadge=false , badgeT}) => {
  return (
    <div>
      <div className="relative w-full group/img">
        <Image
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${className}`}
        />
        {isBadge && (
            <Badge badgeT={badgeT} className={"absolute top-[19px] left-[19px]"} />
        )}
        <ActiveButtons
          className={
            "absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
          }
        />
      </div>
      <ProductTexts />
      <Black/>
    </div>
  );
};

export default Products;
