import React from "react";
import { FaCircle } from "react-icons/fa";
import {
  getUniqueVariantColors,
  getUniqueVariantSizes,
} from "@/lib/productUtils";

const VariantDisplay = ({ variants = [], className = "" }) => {
  if (!variants?.length) {
    return null;
  }

  const colors = getUniqueVariantColors(variants);
  const { sizes, hasMore } = getUniqueVariantSizes(variants, 3);

  return (
    <div className={`space-y-2 pt-3 ${className}`}>
      {colors.length > 0 ? (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] uppercase tracking-wide text-header/70 font-dmSans">
            Colors
          </span>
          <div className="flex items-center gap-1.5">
            {colors.slice(0, 5).map((color) => (
              <span
                key={color}
                title={color}
                className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-black/10 dark:border-white/20">
                <FaCircle
                  className="h-3 w-3"
                  style={{ color: color.toLowerCase() }}
                />
              </span>
            ))}
            {colors.length > 5 ? (
              <span className="text-[10px] text-header/60 font-dmSans">
                +{colors.length - 5}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      {sizes.length > 0 ? (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[11px] uppercase tracking-wide text-header/70 font-dmSans">
            Sizes
          </span>
          <div className="flex flex-wrap gap-1">
            {sizes.map((size) => (
              <span
                key={size}
                className="rounded border border-infoBg px-1.5 py-0.5 text-[10px] font-dmSans text-header bg-white/80 dark:bg-[#262626]/80">
                {size}
              </span>
            ))}
            {hasMore ? (
              <span className="text-[10px] text-header/60 font-dmSans self-center">
                +more
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      {colors.length === 0 && sizes.length === 0 && variants.length > 1 ? (
        <p className="text-[11px] text-header/60 font-dmSans">
          {variants.length} variants available
        </p>
      ) : null}
    </div>
  );
};

export default VariantDisplay;
