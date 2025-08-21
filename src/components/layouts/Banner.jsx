import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useState } from "react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 4;

  const settings = {
    dots: false, // default dots off
    slidesToScroll: 1,
    slidesToShow: 1,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex + 1), // track current slide
  };

  // progress calculation
  const percentage = (currentSlide / totalSlides) * 100;

  return (
    <div className="relative">
      <Link to={"/shop"}>
        <Slider {...settings}>
          <div className="bg-[url(/src/assets/bannerBg.png)] bg-no-repeat bg-cover bg-center py-[243.5px]"></div>
          <div className="bg-[url(/src/assets/Frame.png)] bg-no-repeat bg-center bg-cover py-[240px] drop-shadow-[0px_4px_2px_#00000045]"></div>
          <div className="bg-[url(/src/assets/bannerBg.png)] bg-no-repeat bg-cover bg-center py-[243.5px]"></div>
          <div className="bg-[url(/src/assets/Frame.png)] bg-no-repeat bg-center bg-cover py-[240px] drop-shadow-[0px_4px_2px_#00000045]"></div>
        </Slider>
      </Link>

      {/* ✅ Custom Progress Dots */}
      <div className="absolute left-20 top-[40%]  h-[150px] flex items-start">
        {/* Current Slide Number */}
        <span className="mr-3 w-6 text-lg font-semibold text-menuHeading font-dmSans">
          {currentSlide.toString().padStart(2, "0")}
        </span>
        {/* Gray line */}
        <div className="relative w-[3px] h-full bg-white">
          {/* Black progress fill */}
          <div
            className="absolute top-0 left-0 w-[3px] bg-menuHeading transition-all duration-500"
            style={{ height: `${percentage}%` }}
          ></div>
        </div>

      </div>
    </div>
  );
};

export default Banner;
