import Container from "./../Container";
import AdOne from "/src/assets/promo_left_light.png";
import AdTwo from "/src/assets/promo_right_top.png";
import AdThree from "/src/assets/promo_right_bottom.png";
import AdOneDark from "/src/assets/promo_left_dark.png";
import AdTwoDark from "/src/assets/promo_right_top_dark.png";
import AdThreeDark from "/src/assets/promo_right_bottom_dark.png";
import Image from "../Image";
import { Link } from "react-router-dom";


const Ads = () => {
  return (
    <section className="py-12 md:py-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <Link to={"/shop"} className="block rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <Image
              src={AdOne}
              alt="Featured collection promotion"
              className={"w-full h-full object-cover"}
            />
          </Link>
          <div className="grid grid-rows-2 gap-4 md:gap-8">
            <Link to={"/shop"} className="block rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <Image
                src={AdTwo}
                alt="Electronics sale promotion"
                className={"w-full h-full object-cover"}
              />
            </Link>
            <Link to={"/shop"} className="block rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <Image
                src={AdThree}
                alt="Special offer promotion"
                className={"w-full h-full object-cover"}
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Ads;
