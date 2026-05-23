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
import CartDropdowns from "../CartDropdowns";
import useCart from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  // Dark mode sync
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setDarkMode(isDark);
  }, []);
  // Dark toggle
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  const items = useCart((state) => state.items);

  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const dropdownRef = useRef(null); // ekhane useRef sob somoy e ekta object return kore. jetar moddhe ekta property thake current naame. useRef direct ekta html element mane html tag ke access kore. jodi kono element er moddhe mane html tag e ei useRef take use kora hoy tahole useRef er object ta te current er moddhe sei html tag ta add hoy. kintu jokhon ekta page render hoy tokhon sathe sathe DOM element ta toiri hoye jayna. tokhon ei useRef tar moddhe current e oi element take payna. tai safe thakar jonno initially null rakha hoy. useRef ke html tag e directly use kora jayna tai ekta variable e niye tarpor oi variable take html tag e ref naame ekta prop niye use korte hoy.
  const cartRef = useRef(null);

  const toggleRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const toggleButtons = () => {
    setShowButton((p) => !p);
  };

  useEffect(() => {
    // event listener add ba remove korar kaaj take side effect bole. ar side effect er kaaj korte hole useEffect lage. etar moddhe na dile barbar event listener add ba remove hote thakbe. function multiple times run hobe. memory leak hobe. kintu ekhane useEffect e dependency array ta empty rakhay ei component ba page ta mount ba render hole ekbar e event listener add hobe. tai useEffect er moddhe rakha.
    const clickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        // ekhane check kora hocche first e je ei useRef ta te ki kono html element ba tag ache kina. jodi thake tahole ei useRef er object property current er moddhe thakbe oi tag ta. ar ekhane event.target mane hocche jei tag e useRef ta ache sei tag ta te action hocche kina. cartRef.current.contains diye oi useRef er tag ta te action hocche kina seta dekhche. ekhane action mane hocche mousedown ta jeta pore use kora hoyeche function call korar somoy. to ekhane duita check hocche, prothome dekhche je useRef ta tag e ache kina abong mousedown jei action ta hocche seta ei useRef er baire hocche kina. karon ekhane ! ei sign use kora hoyeche jeta diye bujhano hocche je mousedown action ta ei ref er baire kothao hocche. jodi baire kothao hoy tahole showcart false kore dibe mane cart er dropdown ta off hoye jabe.
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", clickOutside); // ekhane mousedown hocche onClick er cheyeo druto kaaj kore. click korle khub fast ei function ta run hobe. jodi document er jekono jaygay jodi mousedown hoy tahole ei function ta call hobe.

    return () => {
      // eta hocche cleanup function. return diye arrow function use kore likhte hoy. eta tokhon run hobe jokhon ei component unmount hobe mane ei page ta close hoye jabe. onno page e chole jabe tokhon. page change hole. normally ekbar jodi event listener add hoye jay tahole setake browser permanently add kore rakhe. jodi onno kono page eo chole jawa hoy tao ei event ta add thake. page change hole ei component ta unmount hoye jay. tokhon ekhane joto state true chilo segulo false hoye jay. tai dropdown ta jodi open o thake tao off hoye jay onno page e gele. kintu event listener je add kora holo seta tokhon o royei jay. tai onno page e giyeo jodi kono jaygay click kora hoy tokhon event add hote thake. jotobar click kora hobe totobar add hote thakbe. ei function ta cholte thakbe. memory usage barbe, performance issue korte pare, lag korte pare, react warning dite pare. tai manually ei event take remove kore dite hoy. jokhon kono event listener add kora hobe setake erokom return diye arrow function e remove o kore dite hoy jetake cleanup function bole.
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
              <Image src={Logo} alt={Logo} className={"dark:invert"} />
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
            <div className="relative" ref={dropdownRef}>
              <div onClick={toggleMenu} className="cursor-pointer ">
                <Flex>
                  <MenuIcon />

                  <Heading
                    className={"font-dmSans text-[14px] text-menuHeading pl-3"}
                    text={"Shop by Category"}
                    as={"h4"}
                  />
                </Flex>
              </div>
              {<CategoriesMenu isOpen={showMenu} />}
            </div>
            <div className="relative">
              <input
                type="search"
                placeholder="Search Products"
                className="placeholder:text-[#C4C4C4] placeholder:font-dmSans placeholder:text-[14px] p-5 bg-white dark:bg-[#1F1F1F] w-150 focus:outline-0"
              />
              <span className="absolute top-1/2 right-4 -translate-y-1/2">
                <FaSearch />
              </span>
            </div>
            <Flex>
              {/* Dark Mode */}
              <Button
                variant="ghost"
                onClick={toggleDarkMode}
                className="h-9 w-9 cursor-pointer mr-5">
                {darkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-menuHeading" />
                )}
              </Button>
              <div className="relative" ref={toggleRef}>
                <div
                  className="flex items-center gap-x-1 cursor-pointer"
                  onClick={toggleButtons}>
                  <FaUser className="text-menuHeading" />
                  {showButton ? (
                    <FaCaretUp className="text-menuHeading" />
                  ) : (
                    <FaCaretDown className="text-menuHeading" />
                  )}
                </div>
                {<ToggleButtons isOpen={showButton} />}
              </div>
              <div className="relative" ref={cartRef}>
                <FaShoppingCart
                  className="text-menuHeading ml-6 cursor-pointer"
                  onClick={() => setShowCart(!showCart)}
                />
                {showCart && (
                  <CartDropdowns
                    items={items}
                    onClick={() => setShowCart(!showCart)}
                  />
                )}
              </div>
            </Flex>
          </Flex>
        </Container>
      </section>
    </>
  );
};

export default Header;
