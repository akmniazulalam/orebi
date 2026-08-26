import Slider from "react-slick";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import bannerOneLight from "/src/assets/home_hero_one_light.png";
import bannerTwoLight from "/src/assets/home_hero_two_light.png";
import bannerThreeLight from "/src/assets/home_hero_three_light.png";
import bannerOneDark from "/src/assets/home_hero_one_dark.png";
import bannerTwoDark from "/src/assets/home_hero_two_dark.png";
import bannerThreeDark from "/src/assets/home_hero_three_dark.png";


const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 4;
  const sliderRef = useRef(null);
  const progressBarRef = useRef(null); // ✅ Progress bar-er reference
  const isMobile = window.innerWidth < 768;
  const settings = {
    dots: false,
    slidesToScroll: 1,
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex + 1),
  };

  const percentage = (currentSlide / totalSlides) * 100;

  // ✅ Click handler for the entire progress bar
  const handleProgressBarClick = (event) => {
    if (progressBarRef.current && sliderRef.current) {
      const bar = progressBarRef.current;
      const totalHeight = bar.offsetHeight; // Total height of the progress bar div
      const clickY = event.clientY - bar.getBoundingClientRect().top; // Y-position of the click relative to the bar

      // Calculate the slide index based on the click position
      const slideIndex = Math.floor((clickY / totalHeight) * totalSlides);

      // Ensure the index is within bounds and navigate
      if (slideIndex >= 0 && slideIndex < totalSlides) {
        sliderRef.current.slickGoTo(slideIndex);
      }
    }
  };

  return (
    <div className="relative">
      <Link to={"/shop"}>
        <Slider ref={sliderRef} {...settings}>
          <div className="bg-[url(/src/assets/bannerBg.png)] bg-no-repeat bg-cover bg-center py-20 md:py-[243.5px]"></div>
          <div className="bg-[url(/src/assets/Frame.png)] bg-no-repeat bg-center bg-cover py-[78.75px] md:py-60 drop-shadow-[0px_4px_2px_#00000045]"></div>
          <div className="bg-[url(/src/assets/bannerBg.png)] bg-no-repeat bg-cover bg-center py-20 md:py-[243.5px]"></div>
          <div className="bg-[url(/src/assets/Frame.png)] bg-no-repeat bg-center bg-cover py-[78.75px] md:py-60 drop-shadow-[0px_4px_2px_#00000045]"></div>
        </Slider>
      </Link>

      {/* Custom Progress Bar container */}
      <div className="absolute left-11.5 md:left-20 top-[76%] md:top-[40%] flex items-center md:items-start">
        <span className="mr-1 md:mr-3 w-6 text-sm md:text-lg font-semibold text-menuHeading dark:text-[#262626] font-dmSans">
          {currentSlide.toString().padStart(2, "0")}
        </span>

        {/* Clickable Progress Bar */}
        <div
          ref={progressBarRef} // Reference for the progress bar div
          className="relative w-34 h-0.75 md:w-0.75 md:h-37.5 bg-white cursor-pointer" // Added cursor-pointer
          onClick={handleProgressBarClick} // Added click handler
        >
          <div
            className="absolute top-0 left-0 h-0.75 md:w-0.75 bg-menuHeading dark:bg-[#262626] transition-all duration-500"
            style={
              isMobile
                ? { width: `${percentage}%` }
                : { height: `${percentage}%` }
            }></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
