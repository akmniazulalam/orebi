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
import { useEffect, useRef, useState } from "react";
import ToggleButtons from "../ToggleButtons";
import { useDispatch, useSelector } from "react-redux";
import CartDropdowns from "../CartDropdowns";
import removeFromCart from '/src/features/cart/addToCartSlice'

const Header = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const [showCart, setShowCart] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const [showButton, setShowButton] = useState(false);

  const dropdownRef = useRef(null);
  const cartRef = useRef(null);

  const toggleRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const toggleButtons = () => {
    setShowButton((p) => !p);
  };

  

  useEffect(() => {
    const clickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }

      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setShowButton(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <div
              ref={dropdownRef}
              onClick={toggleMenu}
              className="cursor-pointer relative">
              <Flex>
                <MenuIcon />

                <Heading
                  className={"font-dmSans text-[14px] text-menuHeading pl-3"}
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
                className="placeholder:text-[#C4C4C4] placeholder:font-dmSans placeholder:text-[14px] p-5 bg-white w-150 focus:outline-0"
              />
              <span className="absolute top-1/2 right-4 -translate-y-1/2">
                <FaSearch />
              </span>
            </div>
            <Flex>
              <div
                className="flex items-center gap-x-1 relative cursor-pointer"
                onClick={toggleButtons}
                ref={toggleRef}>
                <FaUser className="text-menuHeading" />
                {showButton ? (
                  <FaCaretUp className="text-menuHeading" />
                ) : (
                  <FaCaretDown className="text-menuHeading" />
                )}
                {<ToggleButtons isOpen={showButton} />}
              </div>
              <div className="relative" ref={cartRef}>
                <FaShoppingCart className="text-menuHeading ml-6 cursor-pointer" onClick={() => setShowCart(!showCart)}/>
                {
                  showCart && <CartDropdowns items={cartItems} onClick={() => setShowCart(!showCart)} />
                }
              </div>
            </Flex>
          </Flex>
        </Container>
      </section>
    </>
  );
};

export default Header;
