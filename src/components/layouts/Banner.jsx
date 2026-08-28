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

import bannerOneMobileLight from "@/assets/home_hero_one_mobile_light.png";
import bannerTwoMobileLight from "@/assets/home_hero_two_mobile_light.png";
import bannerThreeMobileLight from "@/assets/home_hero_three_mobile_light.png";

import bannerOneMobileDark from "@/assets/home_hero_one_mobile_dark.png";
import bannerTwoMobileDark from "@/assets/home_hero_two_mobile_dark.png";
import bannerThreeMobileDark from "@/assets/home_hero_three_mobile_dark.png";

const SLIDES = [
  {
    id: 1,
    lightImage: bannerOneLight,
    darkImage: bannerOneDark,
    mobileLightImage: bannerOneMobileLight,
    mobileDarkImage: bannerOneMobileDark,
    eyebrow: "WORKSPACE ESSENTIALS",
    title: "Build Your Perfect Workspace",
    description:
      "Upgrade with premium monitors, ergonomic mounts, and essentials for productivity and comfort.",
    buttonText: "Shop Monitors",
    link: "/shop?category=laptops",
  },
  {
    id: 2,
    lightImage: bannerTwoLight,
    darkImage: bannerTwoDark,
    mobileLightImage: bannerTwoMobileLight,
    mobileDarkImage: bannerTwoMobileDark,
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
    mobileLightImage: bannerThreeMobileLight,
    mobileDarkImage: bannerThreeMobileDark,
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
    <section
      aria-label="Hero Showcase Slider"
      className="relative overflow-hidden">
      <Slider ref={sliderRef} {...settings}>
        {SLIDES.map((slide) => {
          // Select mobile images on < 768px and desktop images on >= 768px with theme support
          const bgImage = isMobile
            ? isDark
              ? slide.mobileDarkImage
              : slide.mobileLightImage
            : isDark
              ? slide.darkImage
              : slide.lightImage;

          return (
            <div key={slide.id} className="outline-none focus:outline-none">
              <div
                className="relative w-full h-125 xs:h-132.5 sm:h-145 md:h-61 lg:h-81 xl:h-101 2xl:h-119 bg-cover bg-bottom md:bg-center bg-no-repeat flex items-start md:items-center transition-[background-image] duration-300"
                style={{ backgroundImage: `url(${bgImage})` }}>
                {/* Content Container positioned on clean negative space */}
                <div className="relative w-full 2xl:max-w-315 xl:max-w-5xl lg:max-w-3xl md:max-w-xl sm:max-w-xl mx-auto px-5 xs:px-6 sm:px-8 md:px-0">
                  <div className="max-w-[320px] xs:max-w-85 sm:max-w-md md:max-w-lg lg:max-w-138 pt-7 xs:pt-8 sm:pt-10 md:py-20 space-y-2 xs:space-y-2.5 sm:space-y-3 md:space-y-2.5 lg:space-y-5 relative z-10">
                    <span className="text-[11px] xs:text-[12px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.18em] md:tracking-[0.22em] text-menuHeading dark:text-gray-300 font-dmSans block">
                      {slide.eyebrow}
                    </span>

                    <h2 className="text-[21px] xs:text-[23px] sm:text-2xl md:text-3xl lg:text-[40px] xl:text-6xl font-bold tracking-tight text-menuHeading dark:text-white leading-[1.18] md:leading-[1.14] font-dmSans max-w-70 xs:max-w-75 sm:max-w-sm md:max-w-none">
                      {slide.title}
                    </h2>

                    <p className="text-[11.5px] xs:text-[12.5px] sm:text-sm md:text-base text-menuHeading dark:text-slate-300 leading-normal sm:leading-[1.4] font-normal md:font-medium font-dmSans max-w-67.5 xs:max-w-72.5 sm:max-w-sm md:max-w-111.5">
                      {slide.description}
                    </p>

                    <div className="pt-1 md:pt-3">
                      <Link
                        to={slide.link}
                        className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] px-4 xs:px-5 sm:px-6 md:px-5 lg:px-7 py-2 xs:py-2.5 sm:py-2.5 md:py-2.5 lg:py-3 text-[11.5px] xs:text-[12.5px] sm:text-[12px] md:text-sm font-bold font-dmSans shadow-md hover:bg-black/85 dark:hover:bg-white/90 hover:shadow-lg transition-all duration-300 group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2">
                        <span>{slide.buttonText}</span>
                        <ArrowRight className="h-3 w-3 xs:h-3.5 xs:w-3.5 md:h-4 md:w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </div>

                    {/* Custom Progress Indicator (Vertical on Desktop, Horizontal below CTA on Mobile) */}
                    <div className="relative md:absolute md:-left-14 lg:-left-12 xl:-left-15 pt-2 xs:pt-3 md:pt-0 md:top-1/2 md:-translate-y-1/2 flex flex-row md:flex-col items-center md:items-start gap-2.5 md:gap-y-3 z-20 pointer-events-auto">
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
                        className="relative w-20 xs:w-24 sm:w-32 h-0.75 md:w-1 md:h-36 lg:h-40 bg-gray-300/80 dark:bg-white/20 rounded-full overflow-hidden cursor-pointer"
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
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default Banner;
