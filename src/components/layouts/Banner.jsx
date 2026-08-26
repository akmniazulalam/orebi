import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import bannerOneLight from "@/assets/home_hero_one_light.png";
import bannerTwoLight from "@/assets/home_hero_two_light.png";
import bannerThreeLight from "@/assets/home_hero_three_light.png";

import bannerOneDark from "@/assets/home_hero_one_dark.png";
import bannerTwoDark from "@/assets/home_hero_two_dark.png";
import bannerThreeDark from "@/assets/home_hero_three_dark.png";

const SLIDES = [
  {
    id: 1,
    lightImage: bannerOneLight,
    darkImage: bannerOneDark,
    eyebrow: "WORKSPACE ESSENTIALS",
    title: "Build Your Perfect Workspace",
    description:
      "Upgrade your setup with premium monitors, ergonomic mounts, and essentials designed for productivity and comfort.",
    buttonText: "Shop Monitors",
    link: "/shop?category=laptops",
  },
  {
    id: 2,
    lightImage: bannerTwoLight,
    darkImage: bannerTwoDark,
    eyebrow: "GAMING COLLECTION",
    title: "Level Up Your Gaming Setup",
    description:
      "Powerful displays and gaming essentials built for immersive performance and unforgettable sessions.",
    buttonText: "Shop Gaming",
    link: "/shop?category=audio",
  },
  {
    id: 3,
    lightImage: bannerThreeLight,
    darkImage: bannerThreeDark,
    eyebrow: "PREMIUM TECH",
    title: "Upgrade Your Everyday Setup",
    description:
      "Discover premium technology and smart accessories designed to make your workspace better.",
    buttonText: "Explore Collection",
    link: "/shop",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 3;
  const sliderRef = useRef(null);
  const progressBarRef = useRef(null);

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

  // Responsive state for progress bar orientation
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

  const settings = {
    dots: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: true,
    beforeChange: (_oldIndex, newIndex) => setCurrentSlide(newIndex + 1),
  };

  const percentage = (currentSlide / totalSlides) * 100;

  // Click handler for progress bar
  const handleProgressBarClick = (event) => {
    if (progressBarRef.current && sliderRef.current) {
      const bar = progressBarRef.current;
      const rect = bar.getBoundingClientRect();
      const isHorizontal = bar.offsetWidth > bar.offsetHeight;

      let ratio = 0;
      if (isHorizontal) {
        const clickX = event.clientX - rect.left;
        ratio = clickX / rect.width;
      } else {
        const clickY = event.clientY - rect.top;
        ratio = clickY / rect.height;
      }

      const slideIndex = Math.floor(
        Math.max(0, Math.min(ratio, 0.999)) * totalSlides,
      );
      if (slideIndex >= 0 && slideIndex < totalSlides) {
        sliderRef.current.slickGoTo(slideIndex);
      }
    }
  };

  return (
    <section aria-label="Hero Showcase Slider" className="relative overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {SLIDES.map((slide) => {
          const bgImage = isDark ? slide.darkImage : slide.lightImage;

          return (
            <div key={slide.id} className="outline-none focus:outline-none">
              <div
                className="relative w-full bg-cover bg-right md:bg-center bg-no-repeat flex items-center transition-[background-image] duration-300"
                style={{ backgroundImage: `url(${bgImage})` }}>
                {/* Subtle mobile readability gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-bHeaderBg/90 via-bHeaderBg/55 to-transparent dark:from-[#0B0D17]/90 dark:via-[#0B0D17]/55 dark:to-transparent md:hidden pointer-events-none" />

                {/* Content Container positioned on clean negative space (left side) */}
                <div className="w-full max-w-7xl mx-auto">
                  <div className="max-w-[85%] sm:max-w-md md:max-w-lg lg:max-w-138 py-12 sm:py-16 md:py-20 space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-6 relative z-10">
                    <span className="text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.22em] text-header dark:text-gray-300 font-dmSans block">
                      {slide.eyebrow}
                    </span>

                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-menuHeading dark:text-white leading-[1.14] font-dmSans">
                      {slide.title}
                    </h2>

                    <p className="text-xs sm:text-sm md:text-base text-header dark:text-slate-300 leading-relaxed font-normal font-dmSans max-w-xs sm:max-w-sm md:max-w-md">
                      {slide.description}
                    </p>

                    <div className="pt-2 sm:pt-3">
                      <Link
                        to={slide.link}
                        className="inline-flex items-center gap-2 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] px-6 sm:px-8 py-3 sm:py-3.5 text-xs sm:text-sm font-bold font-dmSans shadow-md hover:bg-black/85 dark:hover:bg-white/90 hover:shadow-lg transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
                        <span>{slide.buttonText}</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>

      {/* Custom Progress Indicator (Vertical on Desktop, Horizontal on Mobile) */}
      <div className="absolute left-6 sm:left-10 md:left-8 lg:left-12 bottom-5 md:bottom-auto md:top-1/2 md:-translate-y-1/2 flex flex-row md:flex-col items-center md:items-start gap-2.5 md:gap-y-3 z-20 pointer-events-auto">
        <span className="text-xs sm:text-sm md:text-base font-bold text-menuHeading dark:text-white font-dmSans tracking-wider select-none">
          {currentSlide.toString().padStart(2, "0")}
        </span>

        {/* Clickable Progress Track */}
        <div
          ref={progressBarRef}
          role="progressbar"
          aria-valuenow={currentSlide}
          aria-valuemin={1}
          aria-valuemax={totalSlides}
          aria-label={`Slide ${currentSlide} of ${totalSlides}`}
          className="relative w-24 sm:w-32 h-1 md:w-1 md:h-36 lg:h-40 bg-gray-300/80 dark:bg-white/20 rounded-full overflow-hidden cursor-pointer"
          onClick={handleProgressBarClick}>
          <div
            className="absolute top-0 left-0 bg-menuHeading dark:bg-white rounded-full transition-all duration-500 ease-out"
            style={
              isMobile
                ? { width: `${percentage}%`, height: "100%" }
                : { height: `${percentage}%`, width: "100%" }
            }
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
