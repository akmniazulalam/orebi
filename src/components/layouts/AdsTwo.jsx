import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Cpu, HardDrive, Smartphone } from "lucide-react";
import Container from "../Container";
import apiClient from "@/lib/apiClient";
import { apiPaths } from "@/lib/productApi";

// Initial seed data from the Samsung Galaxy S26 Ultra product record to avoid layout shifts
const FALLBACK_PRODUCT = {
  _id: "6a93ef06e5a5d70d034a76dc",
  name: "Samsung Galaxy S26 Ultra",
  category: "smartphones",
  description:
    "Experience next-level performance, premium design, and powerful photography in the Galaxy S26 Ultra.",
  variants: [
    {
      _id: "6a93ef06e5a5d70d034a76dd",
      size: "6.9 Inch",
      color: "Black",
      price: 1299,
      ram: "12GB",
      storage: "256GB",
      badge: "Trending",
      images: [
        "https://res.cloudinary.com/dvhjuwdac/image/upload/v1788079873/a9yylxzvdkm63aznehqc.webp",
      ],
    },
    {
      _id: "6a93ef06e5a5d70d034a76de",
      size: "6.9 Inch",
      color: "Violet",
      price: 1499,
      ram: "12GB",
      storage: "512GB",
      badge: "Hot Deal",
      images: [
        "https://res.cloudinary.com/dvhjuwdac/image/upload/v1788079874/pvbwzgch8gg84va0eet5.webp",
      ],
    },
    {
      _id: "6a93ef06e5a5d70d034a76df",
      size: "6.9 Inch",
      color: "SkyBlue",
      price: 1799,
      ram: "12GB",
      storage: "1TB",
      badge: "Limited",
      images: [
        "https://res.cloudinary.com/dvhjuwdac/image/upload/v1788079875/fqmt96dgzqgduqtukuoz.webp",
      ],
    },
    {
      _id: "6a93ef06e5a5d70d034a76e0",
      size: "6.9 Inch",
      color: "Silver",
      price: 1299,
      ram: "12GB",
      storage: "256GB",
      badge: "New",
      images: [
        "https://res.cloudinary.com/dvhjuwdac/image/upload/v1788079876/agtprwepafpkhn11atdy.webp",
      ],
    },
    {
      _id: "6a93ef06e5a5d70d034a76e1",
      size: "6.9 Inch",
      color: "White",
      price: 1299,
      ram: "12GB",
      storage: "256GB",
      badge: "New",
      images: [
        "https://res.cloudinary.com/dvhjuwdac/image/upload/v1788079877/khbccufd3dozsfulkyjm.webp",
      ],
    },
    {
      _id: "6a93ef06e5a5d70d034a76e2",
      size: "6.9 Inch",
      color: "Pink",
      price: 1299,
      ram: "12GB",
      storage: "256GB",
      badge: "Hot Deal",
      images: [
        "https://res.cloudinary.com/dvhjuwdac/image/upload/v1788079877/djlqq7a9x3ipyqggebqc.webp",
      ],
    },
  ],
};

const AdsTwo = () => {
  const [product, setProduct] = useState(FALLBACK_PRODUCT);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadFeaturedProduct() {
      try {
        const response = await apiClient.get(
          apiPaths.products.single("6a93ef06e5a5d70d034a76dc"),
        );
        const data = response?.data?.data;
        if (isMounted && data && Array.isArray(data.variants) && data.variants.length > 0) {
          setProduct(data);
        }
      } catch (err) {
        // Fallback product data already in state
      }
    }
    loadFeaturedProduct();
    return () => {
      isMounted = false;
    };
  }, []);

  // Derive all data from the actual product and its variants
  const variants = useMemo(() => {
    return Array.isArray(product?.variants) && product.variants.length > 0
      ? product.variants
      : FALLBACK_PRODUCT.variants;
  }, [product]);

  const activeVariant = variants[activeVariantIndex] || variants[0];
  const activeImage = activeVariant?.images?.[0] || "";
  const activeColor = activeVariant?.color || "Black";
  const activePrice = activeVariant?.price ?? 1299;
  const activeStorage = activeVariant?.storage || "";
  const activeRam = activeVariant?.ram || "";
  const activeSize = activeVariant?.size || "";
  const activeBadge = activeVariant?.badge || "";

  const minPrice = useMemo(() => {
    const prices = variants
      .map((v) => Number(v.price))
      .filter((p) => !Number.isNaN(p) && p > 0);
    return prices.length > 0 ? Math.min(...prices) : activePrice;
  }, [variants, activePrice]);

  return (
    <section className="py-8 sm:py-12 md:py-16" aria-label="Trending Product Spotlight">
      <Container>
        <div className="relative rounded-3xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-gradient-to-br from-bHeaderBg/90 via-white to-bHeaderBg/60 dark:from-[#121429] dark:via-[#16192E] dark:to-[#0F1122] shadow-sm hover:shadow-md transition-all duration-500">
          {/* Subtle ambient decorative gradient background */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-40 dark:opacity-20 blur-3xl pointer-events-none transition-colors duration-700"
            style={{
              backgroundColor: activeColor.toLowerCase(),
            }}
          />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-menuHeading/5 dark:bg-white/5 blur-3xl pointer-events-none" />

          {/* Grid Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14">
            {/* ========================================================= */}
            {/* LEFT COLUMN: Editorial Content & Variant Swatches (7 cols)  */}
            {/* ========================================================= */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Eyebrow badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 bg-white dark:bg-white/10 border border-gray-200/80 dark:border-white/10 shadow-xs mb-4">
                <span className="flex h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-dmSans text-xs font-bold uppercase tracking-wider text-menuHeading dark:text-white">
                  TRENDING NOW
                </span>
              </div>

              {/* Main Heading from Product Record */}
              <h2 className="font-dmSans font-bold text-3xl sm:text-4xl lg:text-5xl text-menuHeading dark:text-white tracking-tight leading-[1.15] mb-2">
                {product?.name || "Samsung Galaxy S26 Ultra"}
              </h2>

              {/* Headline */}
              <p className="font-dmSans font-semibold text-base sm:text-lg text-menuHeading/80 dark:text-gray-200 mb-4">
                Six colors. One flagship.
              </p>

              {/* Description */}
              <p className="font-dmSans text-sm sm:text-base text-header dark:text-gray-300 leading-relaxed max-w-xl mb-6">
                Experience next-level performance, premium design, and powerful
                photography in the Galaxy S26 Ultra.
              </p>

              {/* Real Spec Badges Derived Directly from the Selected Variant */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-7">
                {activeSize && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-xs font-medium font-dmSans text-menuHeading dark:text-gray-200 shadow-2xs">
                    <Smartphone className="w-3.5 h-3.5 text-header dark:text-gray-400" />
                    {activeSize} Display
                  </span>
                )}
                {activeRam && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-xs font-medium font-dmSans text-menuHeading dark:text-gray-200 shadow-2xs">
                    <Cpu className="w-3.5 h-3.5 text-header dark:text-gray-400" />
                    {activeRam} RAM
                  </span>
                )}
                {activeStorage && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-xs font-medium font-dmSans text-menuHeading dark:text-gray-200 shadow-2xs">
                    <HardDrive className="w-3.5 h-3.5 text-header dark:text-gray-400" />
                    {activeStorage} Storage
                  </span>
                )}
                {activeBadge && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-xs font-medium font-dmSans text-menuHeading dark:text-gray-200 shadow-2xs">
                    <Sparkles className="w-3.5 h-3.5 text-header dark:text-gray-400" />
                    {activeBadge}
                  </span>
                )}
              </div>

              {/* Real Color Variants directly from Product API Data */}
              <div className="w-full pb-6 mb-7 border-b border-gray-200/60 dark:border-white/10">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="font-dmSans text-xs font-bold uppercase tracking-wider text-header dark:text-gray-400">
                    Available in {variants.length} colors
                  </span>
                  <span className="font-dmSans text-xs font-semibold text-menuHeading dark:text-white capitalize">
                    Selected: {activeColor} ({activeStorage})
                  </span>
                </div>

                <div
                  className="flex items-center gap-2.5 sm:gap-3"
                  role="radiogroup"
                  aria-label={`${product?.name} Color Variants`}>
                  {variants.map((variant, index) => {
                    const isSelected = index === activeVariantIndex;
                    const colorName = variant.color || `Color ${index + 1}`;

                    return (
                      <button
                        key={variant._id || variant.color || index}
                        type="button"
                        onClick={() => setActiveVariantIndex(index)}
                        onMouseEnter={() => setActiveVariantIndex(index)}
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={`Select ${colorName} variant`}
                        className={`group/swatch relative flex h-9 w-9 items-center justify-center rounded-full transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-menuHeading dark:focus-visible:ring-white ${
                          isSelected
                            ? "ring-2 ring-offset-2 ring-menuHeading dark:ring-white dark:ring-offset-[#121429] scale-110"
                            : "hover:scale-105 opacity-85 hover:opacity-100"
                        }`}>
                        <span
                          className="h-6 w-6 rounded-full border border-black/15 dark:border-white/20 shadow-inner transition-transform"
                          style={{ backgroundColor: colorName.toLowerCase() }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price & Primary CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full sm:w-auto">
                <div>
                  <span className="block font-dmSans text-xs text-header dark:text-gray-400 font-medium">
                    Starting from
                  </span>
                  <span className="font-dmSans text-2xl sm:text-3xl font-bold text-menuHeading dark:text-white">
                    ${activePrice.toLocaleString()}
                  </span>
                </div>

                <Link
                  to={`/productdetails/${product._id || "6a93ef06e5a5d70d034a76dc"}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] font-dmSans font-bold text-sm px-8 py-3.5 shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-menuHeading dark:focus-visible:ring-white">
                  <span>Explore Product</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: Dominant Hero Product Visual (5 cols)         */}
            {/* ========================================================= */}
            <div
              className="lg:col-span-5 relative flex items-center justify-center py-4 sm:py-6"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>
              
              {/* Product Card / Showcase Stage */}
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px] aspect-[4/5] flex items-center justify-center">
                
                {/* Secondary Phone Backdrop (Faint Layered Depth Effect from Next Variant) */}
                {variants.length > 1 && (
                  <div
                    className="absolute inset-0 flex items-center justify-center scale-90 translate-x-6 -translate-y-4 opacity-25 dark:opacity-15 blur-[1px] pointer-events-none transition-transform duration-700 ease-out"
                    aria-hidden="true">
                    <img
                      src={variants[(activeVariantIndex + 1) % variants.length]?.images?.[0] || activeImage}
                      alt=""
                      className="w-full h-full object-contain filter drop-shadow-md"
                    />
                  </div>
                )}

                {/* Primary Hero Phone from selected variant */}
                <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
                  <img
                    key={activeImage}
                    src={activeImage}
                    alt={`${product?.name || "Samsung Galaxy S26 Ultra"} in ${activeColor}`}
                    className={`w-full h-full object-contain filter drop-shadow-2xl transition-all duration-500 ease-out ${
                      isHovered ? "scale-105 -translate-y-2" : "scale-100"
                    }`}
                    loading="lazy"
                  />
                </div>

                {/* Real Floating Color & Variant Indicator Badge */}
                <div className="absolute bottom-2 right-2 z-20 hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 dark:bg-[#121429]/90 backdrop-blur-sm border border-gray-200/80 dark:border-white/10 shadow-sm text-xs font-bold font-dmSans text-menuHeading dark:text-white pointer-events-none">
                  <span
                    className="h-2.5 w-2.5 rounded-full border border-black/10 dark:border-white/20"
                    style={{
                      backgroundColor: activeColor.toLowerCase(),
                    }}
                  />
                  <span>{activeColor} · {activeStorage}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AdsTwo;
