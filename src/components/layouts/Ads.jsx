import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "../Container";

// Light & Dark promotional banner assets
import promoLeftLight from "/src/assets/promo_left_light.png";
import promoLeftDark from "/src/assets/promo_left_dark.png";
import promoRightTopLight from "/src/assets/promo_right_top.png";
import promoRightTopDark from "/src/assets/promo_right_top_dark.png";
import promoRightBottomLight from "/src/assets/promo_right_bottom.png";
import promoRightBottomDark from "/src/assets/promo_right_bottom_dark.png";

import promoRightTopMobileLight from "/src/assets/promo_right_top_mobile.png";
import promoRightTopMobileDark from "/src/assets/promo_right_top_dark_mobile.png";
import promoRightBottomMobileLight from "/src/assets/promo_right_bottom_mobile.png";
import promoRightBottomMobileDark from "/src/assets/promo_right_bottom_dark_mobile.png";

const Ads = () => {
  // Theme detection synced with document.documentElement (.dark class)
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  );

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Responsive state for progress bar orientation & mobile image selection (< 768px)
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      className="py-10 md:py-16 lg:py-20"
      aria-label="Promotional Categories">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* ========================================================================= */}
          {/* LEFT — SMARTPHONES (Large Card 780x780)                                    */}
          {/* Products located at top; clean negative space at bottom for text/CTA       */}
          {/* ========================================================================= */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-end w-full min-h-105 sm:min-h-120 lg:min-h-full aspect-square lg:aspect-auto">
            {/* Background promotional image */}
            <img
              src={isDark ? promoLeftDark : promoLeftLight}
              alt="Smartphones collection"
              className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />

            {/* Subtle localized bottom gradient for text contrast & polish */}
            <div className="absolute inset-0 bg-linear-to-t from-white/0 via-white/0 to-transparent dark:from-[#0B0D17]/80 dark:via-[#0B0D17]/20 dark:to-transparent pointer-events-none" />

            {/* Content Layer (positioned in the lower clean portion) */}
            <div className="relative z-10 p-6 sm:p-8 lg:px-10 lg:py-20 flex flex-col items-start justify-end">
              <span className="font-dmSans text-xs font-bold uppercase tracking-wider text-menuHeading dark:text-gray-400 mb-2">
                SMARTPHONES
              </span>
              <h3 className="font-dmSans font-bold text-2xl sm:text-3xl lg:text-[32px] leading-tight text-menuHeading dark:text-white mb-2.5">
                Find Your Perfect Phone
              </h3>
              <p className="font-dmSans text-xs sm:text-sm text-menuHeading font-medium dark:text-gray-300 leading-relaxed max-w-sm mb-5 sm:mb-6">
                Explore premium smartphones built for performance, style, and
                everyday life.
              </p>
              <Link
                to="/shop?category=smartphones"
                className="inline-flex items-center gap-2 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold font-dmSans hover:opacity-90 active:scale-[0.98] transition-all duration-200 group/btn shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-menuHeading dark:focus-visible:ring-white">
                <span>Shop Smartphones</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN — 2 Stacked Wide Cards (780x370)                              */}
          {/* Products on the right; clean negative space on the left for text/CTA       */}
          {/* ========================================================================= */}
          <div className="flex flex-col gap-6 lg:gap-8 justify-between">
            {/* RIGHT TOP — MONITORS */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 group flex items-start w-full min-h-75 sm:min-h-60 lg:min-h-62.5 aspect-780/370">
              <img
                src={
                  isMobile
                    ? isDark
                      ? promoRightTopMobileDark
                      : promoRightTopMobileLight
                    : isDark
                      ? promoRightTopDark
                      : promoRightTopLight
                }
                alt="Monitors collection"
                className="absolute inset-0 w-full h-full object-cover object-right transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />

              {/* Subtle localized left gradient for text contrast */}
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/0 to-transparent dark:from-[#0B0D17]/80 dark:via-[#0B0D17]/20 dark:to-transparent pointer-events-none" />

              {/* Content Layer (kept exclusively on the left side) */}
              <div className="relative z-10 p-6 sm:p-7 lg:p-8 flex flex-col items-start justify-center max-w-[62%] sm:max-w-[58%]">
                <span className="font-dmSans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-menuHeading dark:text-gray-400 mb-1.5">
                  MONITORS
                </span>
                <h3 className="font-dmSans font-bold text-lg sm:text-2xl lg:text-[24px] leading-tight text-menuHeading dark:text-white mb-1.5 sm:mb-2">
                  See More. Do More.
                </h3>
                <p className="font-dmSans text-xs sm:text-sm text-menuHeading font-medium dark:text-gray-300 leading-snug sm:leading-relaxed max-w-xs mb-3.5 sm:mb-4.5 line-clamp-2 sm:line-clamp-none">
                  Upgrade your workspace with immersive displays designed for
                  productivity and creativity.
                </p>
                <Link
                  to="/shop?category=monitors"
                  className="inline-flex items-center gap-2 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold font-dmSans hover:opacity-90 active:scale-[0.98] transition-all duration-200 group/btn shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-menuHeading dark:focus-visible:ring-white">
                  <span>Shop Monitors</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            {/* RIGHT BOTTOM — AUDIO */}
            <div className="relative rounded-2xl overflow-hidden border border-gray-200/80 dark:border-white/10 shadow-sm hover:shadow-md transition-all duration-300 group flex items-start w-full min-h-75 sm:min-h-60 lg:min-h-62.5 aspect-780/370">
              <img
                src={
                  isMobile
                    ? isDark
                      ? promoRightBottomMobileDark
                      : promoRightBottomMobileLight
                    : isDark
                      ? promoRightBottomDark
                      : promoRightBottomLight
                }
                alt="Audio devices collection"
                className="absolute inset-0 w-full h-full object-cover object-right transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                loading="lazy"
              />

              {/* Subtle localized left gradient for text contrast */}
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/0 to-transparent dark:from-[#0B0D17]/80 dark:via-[#0B0D17]/20 dark:to-transparent pointer-events-none" />

              {/* Content Layer (kept exclusively on the left side) */}
              <div className="relative z-10 p-6 sm:p-7 lg:p-8 flex flex-col items-start justify-center max-w-[62%] sm:max-w-[58%]">
                <span className="font-dmSans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-menuHeading dark:text-gray-400 mb-1.5">
                  AUDIO
                </span>
                <h3 className="font-dmSans font-bold text-lg sm:text-2xl lg:text-[24px] leading-tight text-menuHeading dark:text-white mb-1.5 sm:mb-2">
                  Sound That Moves You
                </h3>
                <p className="font-dmSans text-xs sm:text-sm text-menuHeading font-medium dark:text-gray-300 leading-snug sm:leading-relaxed max-w-xs mb-3.5 sm:mb-4.5 line-clamp-2 sm:line-clamp-none">
                  Experience immersive sound with headphones, earbuds, and
                  speakers made for every moment.
                </p>
                <Link
                  to="/shop?category=audio"
                  className="inline-flex items-center gap-2 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold font-dmSans hover:opacity-90 active:scale-[0.98] transition-all duration-200 group/btn shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-menuHeading dark:focus-visible:ring-white">
                  <span>Shop Audio</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Ads;
