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
      <section className="bg-bHeaderBg py-12 mt-5">
        <Container>
          <div className="flex justify-between">
            <div className="w-[58%]">
              <div className="flex justify-between">
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
                        Category 1
                      </li>
                    </Link>
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Category 2
                      </li>
                    </Link>
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Category 3
                      </li>
                    </Link>
                    <Link to={"/"}>
                      <li className="font-dmSans text-footerTexts text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                        Category 4
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
                <FaFacebookF className="text-menuHeading" />
                <FaLinkedinIn className="text-[19px] text-menuHeading" />
                <BsInstagram className="text-menuHeading" />
              </Flex>
            </div>
            <div className="flex flex-col justify-between">
              <Link to={"/"}>
                <Image src={Logo} alt={Logo} className={"w-[120px]"} />
              </Link>
              <p className="font-dmSans text-footerTexts text-[14px]">
                2020 Orebi Minimal eCommerce Figma Template by Adveits
              </p>
            </div>
          </div>
        </Container>
      </section>
      {/* <section className="bg-bHeaderBg py-12 mt-5">
        <Container>
          <div className="grid grid-rows-2 gap-y-9">
            <div className="grid grid-cols-[11%_12%_16%_31%_30%] grid-rows-[230px_50px]">
              <div className="menu">
                <Heading
                  text={"Menu"}
                  as={"h3"}
                  className={
                    "uppercase font-dmSans font-bold text-base text-menuHeading pb-5"
                  }
                />
                <ul className="flex flex-col gap-y-2">
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Home
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Shop
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    About
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Contact
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Journal
                  </li>
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
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Category 1
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Category 2
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Category 3
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Category 4
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Category 5
                  </li>
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
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Privacy Policy
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Terms & Conditions
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Special E-shop
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Shipping
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Secure Payments
                  </li>
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
              <div>
                <Image src={Logo} alt={Logo} className={"w-[120px]"} />
              </div>
              <Flex className={"justify-between col-span-5"}>
                <Flex className={"gap-x-5"}>
                  <FaFacebookF className="text-menuHeading" />
                  <FaLinkedinIn className="text-[19px] text-menuHeading" />
                  <BsInstagram className="text-menuHeading" />
                </Flex>
                <p className="font-dmSans text-footerTexts text-[14px]">
                  2020 Orebi Minimal eCommerce Figma Template by Adveits
                </p>
              </Flex>
            </div>
            <div className="grid grid-cols-[11%_12%_16%_31%_30%] grid-rows-[230px_50px]">
              <div className="menu">
                <Heading
                  text={"Menu"}
                  as={"h3"}
                  className={
                    "uppercase font-dmSans font-bold text-base text-menuHeading pb-5"
                  }
                />
                <ul className="flex flex-col gap-y-2">
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Home
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Shop
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    About
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Contact
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Journal
                  </li>
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
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Category 1
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Category 2
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Category 3
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Category 4
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Category 5
                  </li>
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
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Privacy Policy
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Terms & Conditions
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Special E-shop
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Shipping
                  </li>
                  <li className="font-dmSans text-footerTexts text-[14px]">
                    Secure Payments
                  </li>
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
              <div>
                <Image src={Logo} alt={Logo} className={"w-[120px]"} />
              </div>
              <Flex className={"justify-between col-span-5"}>
                <Flex className={"gap-x-5"}>
                  <FaFacebookF className="text-menuHeading" />
                  <FaLinkedinIn className="text-[19px] text-menuHeading" />
                  <BsInstagram className="text-menuHeading" />
                </Flex>
                <p className="font-dmSans text-footerTexts text-[14px]">
                  2020 Orebi Minimal eCommerce Figma Template by Adveits
                </p>
              </Flex>
            </div>
          </div>
        </Container>
      </section> */}
    </>
  );
};

export default Footer;
