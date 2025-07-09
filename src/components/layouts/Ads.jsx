import Container from "./../Container";
import AdOne from "/src/assets/adOne.png";
import AdTwo from "/src/assets/adTwo.png";
import AdThree from "/src/assets/adThree.png";
import Image from "../Image";
import { Link } from "react-router-dom";


const Ads = () => {
  return (
    <section className="pt-40">
      <Container>
        <div className="grid grid-cols-2 gap-8">
          <Link to={"/shop"}>
            <Image
              src={AdOne}
              alt={AdOne}
              className={"w-full h-full object-cover"}
            />
          </Link>
          <div className="grid grid-rows-2 gap-8">
            <Link to={"/shop"}>
              <Image
                src={AdTwo}
                alt={AdTwo}
                className={"w-full h-full object-cover"}
              />
            </Link>
            <Link to={"/shop"}>
              <Image
                src={AdThree}
                alt={AdThree}
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
