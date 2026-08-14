import Container from "../Container";
import Heading from "../Heading";
import Image from "../Image";
import Logo from "../../assets/logo_two.png";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import Flex from "../Flex";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-bHeaderBg py-12 mt-25">
        <Container>
          <div className="flex flex-col lg:flex-row justify-between gap-y-10 lg:gap-y-0">
            <div className="w-full lg:w-[58%]">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 md:gap-0 justify-between">
                <div className="menu">
                  <Heading
                    text={"Menu"}
                    as={"h3"}
                    className={
                      "uppercase font-dmSans font-bold text-base text-menuHeading pb-5"
                    }
                  />
                  <ul className="flex flex-col gap-y-2">
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Home
                      </li>
                    </Link>
                    <Link to={"/shop"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Shop
                      </li>
                    </Link>
                    <Link to={"/about"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        About
                      </li>
                    </Link>
                    <Link to={"/contacts"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Contact
                      </li>
                    </Link>
                    <Link to={"/journal"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Journal
                      </li>
                    </Link>
                  </ul>
                </div>
                <div className="shop">
                  <Heading
                    text={"shop"}
                    as={"h3"}
                    className={
                      "uppercase font-dmSans font-bold text-base text-menuHeading pb-5"
                    }
                  />
                  <ul className="flex flex-col gap-y-2">
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Audio
                      </li>
                    </Link>
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Laptops
                      </li>
                    </Link>
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Smartphones
                      </li>
                    </Link>
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        	Accessories
                      </li>
                    </Link>
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Category 5
                      </li>
                    </Link>
                  </ul>
                </div>
                <div className="help">
                  <Heading
                    text={"help"}
                    as={"h3"}
                    className={
                      "uppercase font-dmSans font-bold text-base text-menuHeading pb-5"
                    }
                  />
                  <ul className="flex flex-col gap-y-2">
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Privacy Policy
                      </li>
                    </Link>
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Terms & Conditions
                      </li>
                    </Link>
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Special E-shop
                      </li>
                    </Link>
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Shipping
                      </li>
                    </Link>
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Secure Payments
                      </li>
                    </Link>
                  </ul>
                </div>
                <div>
                  <Heading
                    text={"(052) 611-5711 \n company@domain.com"}
                    as={"h3"}
                    className={
                      "font-dmSans font-bold text-base text-menuHeading pb-5 leading-7 whitespace-pre-line"
                    }
                  />
                  <p className="font-dmSans text-footerTexts text-[14px]">
                    575 Crescent Ave. Quakertown, PA 18951
                  </p>
                </div>
              </div>
              <Flex className={"gap-x-5 pt-16"}>
                <Link to={"https://www.facebook.com"} aria-label="Facebook">
                  <FaFacebookF className="text-menuHeading" />
                </Link>
                <Link to={"https://www.linkedin.com"} aria-label="LinkedIn">
                  <FaLinkedinIn className="text-[19px] text-menuHeading" />
                </Link>
                <Link to={"https://www.instagram.com"} aria-label="Instagram">
                  <BsInstagram className="text-menuHeading" />
                </Link>
              </Flex>
            </div>
            <div className="flex flex-col justify-between gap-y-4 lg:gap-y-0">
              <Link to={"/"}>
                <Image src={Logo} alt="Orebi logo" className={"w-30 dark:invert"} />
              </Link>
              <p className="font-dmSans text-footerTexts text-[14px]">
                © 2026 Niazul Alam. All rights reserved. Built with React.
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
