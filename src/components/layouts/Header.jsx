import Container from "../Container";
import Image from "./../Image";
import Logo from "../../assets/logo.png";
import Flex from "../Flex";
import MenuIcon from "../../assets/icons/MenuIcon";
import Heading from "../Heading";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import CategoriesMenu from "../CategoriesMenu";
import { useState } from "react";
import ToggleButtons from "../ToggleButtons";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const [showButton, setShowButton] = useState(false);

  const toggleButtons = () => {
    setShowButton(!showButton);
  };

  return (
    <>
      <section className="py-7">
        <Container>
          <Flex>
            <Link to={"/"}>
              <Image src={Logo} alt={Logo} />
            </Link>
            <div className="m-auto">
              <ul className="flex gap-x-11">
                <Link to={"/"}>
                  <li className="font-dmSans text-header text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                    Home
                  </li>
                </Link>
                <Link to={"/shop"}>
                  <li className="font-dmSans text-header text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                    Shop
                  </li>
                </Link>
                <Link to={"/about"}>
                  <li className="font-dmSans text-header text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                    About
                  </li>
                </Link>
                <Link to={"/contacts"}>
                  <li className="font-dmSans text-header text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                    Contacts
                  </li>
                </Link>
                <Link to={"/journal"}>
                  <li className="font-dmSans text-header text-[14px] font-normal hover:text-menuHeading hover:font-bold transition-all duration-300">
                    Journal
                  </li>
                </Link>
              </ul>
            </div>
          </Flex>
        </Container>
      </section>
      <section className="py-6 bg-bHeaderBg">
        <Container>
          <Flex className={"justify-between"}>
            <div onClick={toggleMenu} className="cursor-pointer relative">
              <Flex>
                <MenuIcon />

                <Heading
                  className={"font-dmSans text-[14px] text-[#262626] pl-3"}
                  text={"Shop by Category"}
                  as={"h4"}
                />
                {<CategoriesMenu isOpen={showMenu} />}
              </Flex>
            </div>
            <div className="relative">
              <input
                type="search"
                placeholder="Search Products"
                className="placeholder:text-[#C4C4C4] placeholder:font-dmSans placeholder:text-[14px] p-5 bg-white w-[600px] focus:outline-0"
              />
              <span className="absolute top-1/2 right-4 -translate-y-1/2">
                <FaSearch />
              </span>
            </div>
            <Flex>
              <div
                className="flex items-center gap-x-1 relative cursor-pointer"
                onClick={toggleButtons}>
                <FaUser className="text-[#262626]" />
                {showButton ? (
                  <FaCaretUp className="text-[#262626]" />
                ) : (
                  <FaCaretDown className="text-[#262626]" />
                )}
                {<ToggleButtons isOpen={showButton} />}
              </div>
              <FaShoppingCart className="text-[#262626] ml-6" />
            </Flex>
          </Flex>
        </Container>
      </section>
    </>
  );
};

export default Header;
