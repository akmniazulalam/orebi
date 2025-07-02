import Container from "../Container";
import Heading from "../Heading";
import Image from "../Image";
import Logo from "../../assets/logo_two.png";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import Flex from "../Flex";

const Footer = () => {
  return (
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
            </div>
            <Flex className={"gap-x-5 pt-16"}>
              <FaFacebookF className="text-menuHeading"/>
              <FaLinkedinIn className="text-[19px] text-menuHeading"/>
              <BsInstagram className="text-menuHeading"/>
            </Flex>
          </div>
          <div className="flex flex-col justify-between">
            <Image src={Logo} alt={Logo} className={"w-[120px]"} />
            <p className="font-dmSans text-footerTexts text-[14px]">
              2020 Orebi Minimal eCommerce Figma Template by Adveits
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Footer;
