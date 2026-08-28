import Container from "../Container";
import Image from "./../Image";
import Logo from "../../assets/logo.png";
import Flex from "../Flex";
import MenuIcon from "../../assets/icons/MenuIcon";
import Heading from "../Heading";
import { FaSearch } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaCaretDown, FaCaretUp, FaTimes } from "react-icons/fa";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import CategoriesMenu from "../CategoriesMenu";
import { useCallback, useEffect, useRef, useState } from "react";
import ToggleButtons from "../ToggleButtons";
import CartDropdowns from "../CartDropdowns";
import useCart from "@/store/cart";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [darkMode, setDarkMode] = useState(false);
  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") || "",
  );
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
        try {
          localStorage.setItem("theme", "dark");
        } catch {
          // Storage may be unavailable in restricted browser contexts.
        }
      } else {
        document.documentElement.classList.remove("dark");
        try {
          localStorage.setItem("theme", "light");
        } catch {
          // Storage may be unavailable in restricted browser contexts.
        }
      }
      return newMode;
    });
  };

  const items = useCart((state) => state.items);

  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    setShowMenu(false);
    setShowButton(false);
    setShowCart(false);
  }, [location.pathname]);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const submitSearch = useCallback(
    (value) => {
      const nextParams =
        location.pathname === "/shop"
          ? new URLSearchParams(location.search)
          : new URLSearchParams();
      const trimmedValue = value.trim();

      if (trimmedValue) {
        nextParams.set("search", trimmedValue);
      } else {
        nextParams.delete("search");
      }

      nextParams.set("page", "1");

      navigate(
        {
          pathname: "/shop",
          search: `?${nextParams.toString()}`,
        },
        { replace: true },
      );
    },
    [location.pathname, location.search, navigate],
  );

  useEffect(() => {
    if (searchInput.trim() === searchQuery) return undefined;

    const timer = window.setTimeout(() => {
      submitSearch(searchInput);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [searchInput, searchQuery, submitSearch]);

  const dropdownRef = useRef(null); // ekhane useRef sob somoy e ekta object return kore. jetar moddhe ekta property thake current naame. useRef direct ekta html element mane html tag ke access kore. jodi kono element er moddhe mane html tag e ei useRef take use kora hoy tahole useRef er object ta te current er moddhe sei html tag ta add hoy. kintu jokhon ekta page render hoy tokhon sathe sathe DOM element ta toiri hoye jayna. tokhon ei useRef tar moddhe current e oi element take payna. tai safe thakar jonno initially null rakha hoy. useRef ke html tag e directly use kora jayna tai ekta variable e niye tarpor oi variable take html tag e ref naame ekta prop niye use korte hoy.
  const mobileCartRef = useRef(null);
  const desktopCartRef = useRef(null);
  const mobileToggleRef = useRef(null);
  const desktopToggleRef = useRef(null);

  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const toggleButtons = () => {
    setShowButton((p) => !p);
  };

  useEffect(() => {
    // event listener add ba remove korar kaaj take side effect bole. ar side effect er kaaj korte hole useEffect lage. etar moddhe na dile barbar event listener add ba remove hote thakbe. function multiple times run hobe. memory leak hobe. kintu ekhane useEffect e dependency array ta empty rakhay ei component ba page ta mount ba render hole ekbar e event listener add hobe. tai useEffect er moddhe rakha.
    const clickOutside = (event) => {
      const isMobileCart =
        mobileCartRef.current && mobileCartRef.current.contains(event.target);
      const isDesktopCart =
        desktopCartRef.current && desktopCartRef.current.contains(event.target);

      if (!isMobileCart && !isDesktopCart) {
        // ekhane check kora hocche first e je ei useRef ta te ki kono html element ba tag ache kina. jodi thake tahole ei useRef er object property current er moddhe thakbe oi tag ta. ar ekhane event.target mane hocche jei tag e useRef ta ache sei tag ta te action hocche kina. cartRef.current.contains diye oi useRef er tag ta te action hocche kina seta dekhche. ekhane action mane hocche mousedown ta jeta pore use kora hoyeche function call korar somoy. to ekhane duita check hocche, prothome dekhche je useRef ta tag e ache kina abong mousedown jei action ta hocche seta ei useRef er baire hocche kina. karon ekhane ! ei sign use kora hoyeche jeta diye bujhano hocche je mousedown action ta ei ref er baire kothao hocche. jodi baire kothao hoy tahole showcart false kore dibe mane cart er dropdown ta off hoye jabe.
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);
    // ekhane mousedown hocche onClick er cheyeo druto kaaj kore. click korle khub fast ei function ta run hobe. jodi document er jekono jaygay jodi mousedown hoy tahole ei function ta call hobe.

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

      const isMobileToggle =
        mobileToggleRef.current &&
        mobileToggleRef.current.contains(event.target);
      const isDesktopToggle =
        desktopToggleRef.current &&
        desktopToggleRef.current.contains(event.target);

      if (!isMobileToggle && !isDesktopToggle) {
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
      <header className="py-7 border-b border-gray-100 md:border-b-0">
        <Container>
          <Flex className="justify-between md:justify-start">
            <Link to={"/"}>
              <Image src={Logo} alt="Orebi logo" className={"dark:invert"} />
            </Link>
            {/* Desktop Navigation */}
            <div className="m-auto hidden md:block">
              <nav aria-label="Primary Navigation">
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
              </nav>
            </div>
            {/* Mobile Navigation Toggle */}
            <button
              className="md:hidden block text-menuHeading focus:outline-none cursor-pointer"
              onClick={() => setShowNav(!showNav)}
              aria-expanded={showNav}
              aria-label="Toggle navigation">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                {showNav ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </Flex>

          {/* Mobile Navigation Dropdown */}
          {showNav && (
            <div className="md:hidden pt-4 pb-2 border-t border-gray-100 dark:border-white/10 mt-4 animate-slide">
              <nav aria-label="Mobile Navigation">
                <ul className="flex flex-col gap-y-3">
                  <Link to={"/"} onClick={() => setShowNav(false)}>
                    <li className="font-dmSans text-header dark:text-gray-300 text-[14px] font-normal hover:text-menuHeading dark:hover:text-white hover:font-bold transition-all duration-200 py-1">
                      Home
                    </li>
                  </Link>
                  <Link to={"/shop"} onClick={() => setShowNav(false)}>
                    <li className="font-dmSans text-header dark:text-gray-300 text-[14px] font-normal hover:text-menuHeading dark:hover:text-white hover:font-bold transition-all duration-200 py-1">
                      Shop
                    </li>
                  </Link>
                  <Link to={"/about"} onClick={() => setShowNav(false)}>
                    <li className="font-dmSans text-header dark:text-gray-300 text-[14px] font-normal hover:text-menuHeading dark:hover:text-white hover:font-bold transition-all duration-200 py-1">
                      About
                    </li>
                  </Link>
                  <Link to={"/contacts"} onClick={() => setShowNav(false)}>
                    <li className="font-dmSans text-header dark:text-gray-300 text-[14px] font-normal hover:text-menuHeading dark:hover:text-white hover:font-bold transition-all duration-200 py-1">
                      Contacts
                    </li>
                  </Link>
                  <Link to={"/journal"} onClick={() => setShowNav(false)}>
                    <li className="font-dmSans text-header dark:text-gray-300 text-[14px] font-normal hover:text-menuHeading dark:hover:text-white hover:font-bold transition-all duration-200 py-1">
                      Journal
                    </li>
                  </Link>
                </ul>
              </nav>
            </div>
          )}
        </Container>
      </header>
      <section className="py-6 bg-bHeaderBg">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-y-4 md:gap-y-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={toggleMenu}
                  aria-expanded={showMenu}
                  aria-label="Shop by Category"
                  className="cursor-pointer text-left focus:outline-none">
                  <Flex>
                    <MenuIcon />

                    <Heading
                      className={
                        "font-dmSans text-[14px] text-menuHeading pl-3"
                      }
                      text={"Shop by Category"}
                      as={"h4"}
                    />
                  </Flex>
                </button>
                {<CategoriesMenu
                  isOpen={showMenu}
                  onClose={() => { setShowMenu(false); setShowNav(false); }}
                />}
              </div>

              {/* Mobile Header Icons Group */}
              <div className="flex items-center md:hidden">
                {/* Dark Mode */}
                <Button
                  variant="ghost"
                  onClick={toggleDarkMode}
                  aria-label="Toggle dark mode"
                  className="h-9 w-9 cursor-pointer mr-3">
                  {darkMode ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-menuHeading" />
                  )}
                </Button>
                <div className="relative" ref={mobileToggleRef}>
                  <button
                    type="button"
                    className="flex items-center gap-x-1.5 cursor-pointer focus:outline-none"
                    onClick={toggleButtons}
                    aria-expanded={showButton}
                    aria-label="Account menu">
                    <FaUser className="text-menuHeading" />
                    {user && (
                      <span className="text-xs font-bold text-menuHeading dark:text-white max-w-[80px] truncate font-dmSans">
                        {user.firstName ? user.firstName : user.email?.split("@")[0]}
                      </span>
                    )}
                    {showButton ? (
                      <FaCaretUp className="text-menuHeading" />
                    ) : (
                      <FaCaretDown className="text-menuHeading" />
                    )}
                  </button>
                  {
                    <ToggleButtons
                      isOpen={showButton}
                      onClose={() => setShowButton(false)}
                      closeMobileNav={() => setShowNav(false)}
                    />
                  }
                </div>
                <div className="relative" ref={mobileCartRef}>
                  <button
                    type="button"
                    aria-label="Shopping cart"
                    aria-expanded={showCart}
                    onClick={() => setShowCart(!showCart)}
                    className="cursor-pointer focus:outline-none ml-4 flex items-center">
                    <FaShoppingCart className="text-menuHeading" />
                  </button>
                  {showCart && (
                    <CartDropdowns
                      items={items}
                      onClick={() => setShowCart(false)}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Search Box */}
            <form
              className="relative w-full min-w-0 md:w-80 lg:w-150"
              role="search"
              onSubmit={(event) => {
                event.preventDefault();
                submitSearch(searchInput);
              }}>
              <input
                type="text"
                inputMode="search"
                value={searchInput}
                placeholder="Search Products"
                aria-label="Search Products"
                className="h-12 w-full rounded-xl border border-infoBg dark:border-white/10 bg-white py-3 pl-5 pr-24 font-dmSans text-sm text-header shadow-sm outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-header/55 hover:border-header/35 hover:shadow-md focus:border-menuHeading focus:ring-4 focus:ring-menuHeading/10 dark:border-white/10 dark:bg-[#1F1F1F] dark:text-white dark:placeholder:text-white/50 dark:hover:border-white/25 dark:focus:border-white/50 dark:focus:ring-white/10"
                onChange={(event) => setSearchInput(event.target.value)}
              />
              <button
                type="button"
                aria-label="Clear product search"
                aria-hidden={!searchInput}
                disabled={!searchInput}
                tabIndex={searchInput ? 0 : -1}
                className={`absolute right-11 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-header/55 cursor-pointer transition-all duration-200 hover:bg-infoBg hover:text-menuHeading focus:outline-none focus-visible:ring-2 focus-visible:ring-menuHeading/30 dark:text-white/55 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-white/30 ${
                  searchInput
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-90 opacity-0"
                }`}
                onClick={() => {
                  setSearchInput("");
                  submitSearch("");
                }}>
                <FaTimes aria-hidden="true" />
              </button>
              <button
                type="submit"
                aria-label="Search products"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-header/70 cursor-pointer transition-colors duration-200 hover:bg-infoBg hover:text-menuHeading focus:outline-none focus-visible:ring-2 focus-visible:ring-menuHeading/30 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white dark:focus-visible:ring-white/30">
                <FaSearch />
              </button>
            </form>

            {/* Desktop Header Icons Group */}
            <div className="hidden md:flex items-center">
              {/* Dark Mode */}
              <Button
                variant="ghost"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                className="h-9 w-9 cursor-pointer mr-5">
                {darkMode ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-menuHeading" />
                )}
              </Button>
              <div className="relative" ref={desktopToggleRef}>
                <button
                  type="button"
                  className="flex items-center gap-x-2 cursor-pointer focus:outline-none"
                  onClick={toggleButtons}
                  aria-expanded={showButton}
                  aria-label="Account menu">
                  <FaUser className="text-menuHeading" />
                  {user && (
                    <span className="text-xs font-bold text-menuHeading dark:text-white max-w-[120px] truncate font-dmSans">
                      {user.firstName
                        ? `${user.firstName} ${user.lastName || ""}`.trim()
                        : user.email?.split("@")[0]}
                    </span>
                  )}
                  {showButton ? (
                    <FaCaretUp className="text-menuHeading" />
                  ) : (
                    <FaCaretDown className="text-menuHeading" />
                  )}
                </button>
                {
                  <ToggleButtons
                    isOpen={showButton}
                    onClose={() => setShowButton(false)}
                    closeMobileNav={() => setShowNav(false)}
                  />
                }
              </div>
              <div className="relative" ref={desktopCartRef}>
                <button
                  type="button"
                  aria-label="Shopping cart"
                  aria-expanded={showCart}
                  onClick={() => setShowCart(!showCart)}
                  className="cursor-pointer focus:outline-none ml-6 flex items-center">
                  <FaShoppingCart className="text-menuHeading" />
                </button>
                {showCart && (
                  <CartDropdowns
                    items={items}
                    onClick={() => setShowCart(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Header;
