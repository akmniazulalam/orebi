import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Cpu, HardDrive, Smartphone } from "lucide-react";
import Container from "../Container";
import apiClient from "@/lib/apiClient";
import { apiPaths } from "@/lib/productApi";

// The product ID for the Samsung Galaxy S26 Ultra.
// All actual product details (name, description, variants, colors, prices,
// images, specs) are fetched from the backend and are never hardcoded here.
const FEATURED_PRODUCT_ID = "6a93ef06e5a5d70d034a76dc";

const TrendingProductSpotlight = () => {
  // null = loading, {} = API failure/empty, {...} = loaded product
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function loadFeaturedProduct() {
      try {
        const response = await apiClient.get(
          apiPaths.products.single(FEATURED_PRODUCT_ID),
        );
        const data = response?.data?.data;
        if (isMounted) {
          setProduct(
            data && Array.isArray(data.variants) && data.variants.length > 0
              ? data
              : null,
          );
        }
      } catch {
        if (isMounted) setProduct(null);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadFeaturedProduct();

    return () => {
      isMounted = false;
    };
  }, []);

  // ── Derived values — all sourced from the API response, never hardcoded ──
  const variants = product?.variants ?? [];
  const safeIndex = Math.min(activeVariantIndex, Math.max(0, variants.length - 1));
  const activeVariant = variants[safeIndex] ?? null;

  const activeImage = activeVariant?.images?.[0] ?? "";
  const activeColor = activeVariant?.color ?? "";
  const activePrice = Number(activeVariant?.price ?? 0);
  const activeStorage = activeVariant?.storage ?? "";
  const activeRam = activeVariant?.ram ?? "";
  const activeSize = activeVariant?.size ?? "";
  const activeBadge = activeVariant?.badge ?? "";

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <section className="py-8 sm:py-12 md:py-16" aria-label="Trending Product Spotlight">
        <Container>
          <div className="rounded-3xl border border-gray-200/80 dark:border-white/10 bg-bHeaderBg dark:bg-[#121429] animate-pulse min-h-[420px]" />
        </Container>
      </section>
    );
  }

  // ── Graceful empty / API-failure state ───────────────────────────────────
  if (!product || variants.length === 0) {
    return null;
  }

  // ── Reusable studio frame canvas for hero product visual ─────────────────
  const ProductCanvas = ({ className = "" }) => (
    <div
      className={`relative w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg aspect-square sm:aspect-4/5 rounded-2xl bg-white border border-gray-200/80 dark:border-white/10 shadow-sm p-4 sm:p-6 lg:p-8 flex items-center justify-center overflow-hidden mx-auto ${className}`}>
      {activeImage ? (
        <img
          key={activeImage}
          src={activeImage}
          alt={`${product.name}${activeColor ? ` in ${activeColor}` : ""}`}
          className="w-full h-full object-contain transition-transform duration-500 ease-out hover:scale-105"
          loading="lazy"
        />
      ) : null}

      {/* Floating variant indicator badge */}
      {(activeColor || activeStorage) && (
        <div className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 dark:bg-[#121429]/95 backdrop-blur-sm border border-gray-200/80 dark:border-white/10 shadow-sm pointer-events-none">
          {activeColor && (
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full border border-black/10 dark:border-white/20 shrink-0"
              style={{ backgroundColor: activeColor.toLowerCase() }}
            />
          )}
          <span className="font-dmSans text-xs font-bold text-menuHeading dark:text-white">
            {[activeColor, activeStorage].filter(Boolean).join(" · ")}
          </span>
        </div>
      )}
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section
      className="py-8 sm:py-10 md:py-12"
      aria-label="Trending Product Spotlight">
      <Container>
        <div className="relative rounded-3xl overflow-hidden border border-gray-200/80 dark:border-white/10 bg-linear-to-br from-bHeaderBg/90 via-white to-bHeaderBg/60 dark:from-[#121429] dark:via-[#16192E] dark:to-[#0F1122] shadow-sm hover:shadow-md transition-shadow duration-500">

          {/* Ambient glow — subtle backdrop accent */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30 dark:opacity-15 blur-3xl pointer-events-none transition-colors duration-700"
            style={{ backgroundColor: activeColor.toLowerCase() }}
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-menuHeading/5 dark:bg-white/5 blur-3xl pointer-events-none"
          />

          {/* ── Main grid ──────────────────────────────────────────────────── */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 xl:gap-12 items-center">

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* LEFT COLUMN: Editorial Content, Mobile Image, Specs, Swatches, CTA */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-7 flex flex-col items-start text-left p-5 sm:p-8 lg:p-14 lg:pr-4">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-white dark:bg-white/10 border border-gray-200/80 dark:border-white/10 shadow-2xs mb-3 sm:mb-4">
                <span className="flex h-2 w-2 shrink-0 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-dmSans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-menuHeading dark:text-white">
                  TRENDING NOW
                </span>
              </div>

              {/* Product name — from API */}
              <h2 className="font-dmSans font-bold text-2xl sm:text-4xl lg:text-5xl text-menuHeading dark:text-white tracking-tight leading-tight sm:leading-[1.15] mb-2">
                {product.name}
              </h2>

              {/* Variant summary subheading */}
              <p className="font-dmSans font-semibold text-sm sm:text-lg text-menuHeading/80 dark:text-gray-200 mb-3 sm:mb-4">
                Six colors. One flagship.
              </p>

              {/* Description — compact and readable on all screens */}
              <p className="font-dmSans text-xs sm:text-sm md:text-base text-header dark:text-gray-300 leading-relaxed max-w-xl mb-5 sm:mb-6">
                Experience next-level performance, premium design, and powerful
                photography in the Galaxy S26 Ultra.
              </p>

              {/* ── MOBILE PRODUCT VISUAL: Rendered early on mobile (< lg) ── */}
              <div className="w-full mb-6 lg:hidden">
                <ProductCanvas />
              </div>

              {/* ── Variant Spec Chips ── */}
              {(activeSize || activeRam || activeStorage || activeBadge) && (
                <div className="flex flex-wrap items-center gap-3 mb-6 sm:mb-7">
                  {activeSize && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-[11px] sm:text-xs font-medium font-dmSans text-menuHeading dark:text-gray-200 shadow-2xs">
                      <Smartphone className="w-3.5 h-3.5 shrink-0 text-header dark:text-gray-400" />
                      {activeSize} Display
                    </span>
                  )}
                  {activeRam && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-[11px] sm:text-xs font-medium font-dmSans text-menuHeading dark:text-gray-200 shadow-2xs">
                      <Cpu className="w-3.5 h-3.5 shrink-0 text-header dark:text-gray-400" />
                      {activeRam} RAM
                    </span>
                  )}
                  {activeStorage && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-[11px] sm:text-xs font-medium font-dmSans text-menuHeading dark:text-gray-200 shadow-2xs">
                      <HardDrive className="w-3.5 h-3.5 shrink-0 text-header dark:text-gray-400" />
                      {activeStorage} Storage
                    </span>
                  )}
                  {activeBadge && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-white dark:bg-white/5 border border-gray-200/60 dark:border-white/10 text-[11px] sm:text-xs font-medium font-dmSans text-menuHeading dark:text-gray-200 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 shrink-0 text-header dark:text-gray-400" />
                      {activeBadge}
                    </span>
                  )}
                </div>
              )}

              {/* ── Colour Swatches — Click to select ── */}
              <div className="w-full pb-5 sm:pb-6 mb-6 sm:mb-7 border-b border-gray-200/60 dark:border-white/10">
                <div className="flex items-center justify-between gap-2 sm:gap-4 mb-3">
                  <span className="font-dmSans text-xs font-bold uppercase tracking-wider text-header dark:text-gray-400">
                    Available in {variants.length} colors
                  </span>
                  {activeColor && (
                    <span className="font-dmSans text-xs font-semibold text-menuHeading dark:text-white">
                      Selected: {activeColor}{activeStorage ? ` · ${activeStorage}` : ""}
                    </span>
                  )}
                </div>

                <div
                  role="radiogroup"
                  aria-label={`${product.name} color variants`}
                  className="flex items-center flex-wrap gap-2.5 sm:gap-3">
                  {variants.map((variant, index) => {
                    const isSelected = index === safeIndex;
                    const colorLabel = variant.color ?? `Variant ${index + 1}`;

                    return (
                      <button
                        key={variant._id ?? index}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        aria-label={`Select ${colorLabel} (${variant.storage || ""})`}
                        onClick={() => setActiveVariantIndex(index)}
                        className={[
                          "relative flex h-9 w-9 sm:h-10 sm:w-10 min-w-9 sm:min-w-10 items-center justify-center rounded-full",
                          "cursor-pointer transition-all duration-200",
                          "focus:outline-none focus-visible:ring-2 focus-visible:ring-menuHeading dark:focus-visible:ring-white focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#121429]",
                          isSelected
                            ? "ring-2 ring-menuHeading dark:ring-white ring-offset-2 dark:ring-offset-[#121429] scale-110"
                            : "opacity-80 hover:opacity-100 hover:scale-105",
                        ].join(" ")}>
                        <span
                          className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border border-black/15 dark:border-white/20 shadow-inner"
                          style={{ backgroundColor: colorLabel.toLowerCase() }}
                        />
                        {isSelected && (
                          <span className="sr-only">(currently selected)</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Dynamic Price & Primary CTA ── */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:justify-start gap-4 sm:gap-6 w-full">
                <div>
                  <span className="block font-dmSans text-xs font-medium text-header dark:text-gray-400">
                    Price
                  </span>
                  <span className="font-dmSans text-2xl sm:text-3xl font-bold text-menuHeading dark:text-white">
                    {activePrice > 0 ? `$${activePrice.toLocaleString()}` : ""}
                  </span>
                </div>

                <Link
                  to={`/productdetails/${product._id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] font-dmSans font-bold text-sm px-8 py-3.5 shadow-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-menuHeading dark:focus-visible:ring-white w-full sm:w-auto text-center">
                  <span>Explore Product</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════ */}
            {/* RIGHT COLUMN: Desktop Hero Visual inside Studio Canvas (5 cols) */}
            {/* ═══════════════════════════════════════════════════════════════ */}
            <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center p-6 lg:p-8 lg:pr-12">
              <ProductCanvas />
            </div>

          </div>
        </div>
      </Container>
    </section>
  );
};

export default TrendingProductSpotlight;
