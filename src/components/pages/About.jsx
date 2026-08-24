import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Headphones,
  Laptop,
  Smartphone,
  Watch,
  Keyboard,
  Mouse,
  Monitor,
  BatteryCharging,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  UserCheck,
  ChevronRight,
  PackageSearch,
} from "lucide-react";
import Container from "../Container";
import Intro from "../Intro";
import { fetchProducts } from "@/services/productService";
import { normalizeProductForDisplay } from "@/lib/productUtils";

// Reusing existing local asset images directly
import aboutHeroImg from "@/assets/about_hero.png";
import aboutCtaImg from "@/assets/about_cta.png";
import aboutHeroLightImg from "@/assets/about_hero_light.png";
import aboutCtaLightImg from "@/assets/about_cta_light.png";

const CATEGORY_CARDS = [
  {
    num: "01",
    id: "audio",
    name: "Audio",
    icon: Headphones,
    query: "audio",
    description: "Headphones, earbuds & wireless sound for every moment.",
  },
  {
    num: "02",
    id: "laptops",
    name: "Laptops",
    icon: Laptop,
    query: "laptops",
    description: "Powerful laptops for work, study, creativity & gaming.",
  },
  {
    num: "03",
    id: "smartphones",
    name: "Smartphones",
    icon: Smartphone,
    query: "smartphones",
    description:
      "Modern devices with advanced cameras & seamless connectivity.",
  },
  {
    num: "04",
    id: "accessories",
    name: "Accessories",
    icon: Mouse,
    query: "accessories",
    description: "Wireless Mouse, Wireless Keyboard, Power Bank & more.",
    isAccessory: true,
  },
  {
    num: "05",
    id: "smartwatches",
    name: "Smartwatches",
    icon: Watch,
    query: "smartwatches",
    description: "Track your health, stay active & live smarter every day.",
  },
  {
    num: "06",
    id: "monitors",
    name: "Monitors",
    icon: Monitor,
    query: "monitors",
    description: "High-quality displays for work, gaming, and entertainment.",
  },
];

const WHY_CHOOSE_CARDS = [
  {
    icon: Sparkles,
    title: "Curated Products",
    description:
      "A focused selection of technology and accessories chosen for genuine daily utility.",
  },
  {
    icon: ShoppingBag,
    title: "Simple Shopping",
    description:
      "Compare options and move from browsing to checkout without unnecessary complexity.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description:
      "Protected checkout pathways and session authentication for peace of mind.",
  },
  {
    icon: UserCheck,
    title: "Customer Focused",
    description:
      "Clear product information, straightforward details, and dependable service come first.",
  },
];

const BRAND_VALUES = [
  {
    number: "01",
    title: "Quality",
    description:
      "We focus on products that offer practical value, reliable performance, and durable design for long-term daily use.",
  },
  {
    number: "02",
    title: "Practicality",
    description:
      "Technology should simplify daily tasks, entertain effortlessly, and fit naturally into real-world modern routines.",
  },
  {
    number: "03",
    title: "Modern Living",
    description:
      "From desk accessories to smart wearables, Orebi is built around today's connected and active digital lifestyle.",
  },
];

const About = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoadingStore, setIsLoadingStore] = useState(true);
  const [isDark, setIsDark] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.classList.contains("dark")
      : false,
  );

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchProducts()
      .then((products) => {
        if (!isMounted) return;
        if (Array.isArray(products) && products.length > 0) {
          setFeaturedProducts(products.slice(0, 3));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setIsLoadingStore(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <Intro text="About Us" pText="About" />

      {/* Outer wrapper: bg-background (white in light, #0B0D17 in dark) */}
      <div className="bg-background text-foreground font-dmSans pb-10 pt-8">
        <Container className="space-y-16 sm:space-y-20 lg:space-y-24">
          {/* ================= 1. HERO SECTION ================= */}
          {/* Hero uses theme-responsive background image */}
          <section
            className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-no-repeat bg-cover bg-center shadow-sm dark:shadow-2xl"
            style={{
              backgroundImage: `url(${isDark ? aboutHeroImg : aboutHeroLightImg})`,
            }}>
            <div className="p-8 sm:p-14 lg:p-20 xl:p-24 dark:bg-black/50">
              <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 relative z-10">
                {/* Left Column */}
                <div className="space-y-7 lg:col-span-8">
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
                    ABOUT OREBI
                  </span>

                  <h1 className="text-3xl font-bold text-menuHeading dark:text-white sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.15] max-w-2xl">
                    Technology That <br className="hidden sm:inline" />
                    Fits Your Everyday Life
                  </h1>

                  <p className="max-w-xl text-xs sm:text-sm lg:text-base text-header dark:text-slate-300 leading-relaxed font-normal">
                    Discover thoughtfully selected technology and accessories
                    designed to make work, entertainment, and everyday life
                    simpler, more efficient, and enjoyable.
                  </p>

                  <div className="pt-2">
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-2 rounded-full bg-[#5B50E6] px-7 py-3.5 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition duration-300 hover:bg-[#4F46E5] hover:shadow-indigo-600/50">
                      Explore Our Collection <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= 2. OUR STORY ================= */}
          <section>
            <div className="grid grid-cols-1 gap-10 lg:gap-16 lg:grid-cols-12 items-start">
              <div className="lg:col-span-5 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400 block">
                  OUR STORY
                </span>
                {/* text-menuHeading: #262626 light / #ffffff dark */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-menuHeading leading-snug">
                  A Modern Destination <br className="hidden sm:inline" />
                  for Everyday Technology
                </h2>
              </div>

              <div className="lg:col-span-7 space-y-8">
                {/* text-header: #767676 light / #A1A1AA dark */}
                <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-header dark:text-slate-300 font-normal">
                  Orebi is a modern e-commerce destination for everyday
                  technology — bringing together useful, reliable, and stylish
                  products in one place. We focus on providing a seamless
                  shopping experience for essential tech across five core
                  categories:
                </p>

                {/* Horizontal Category Nav Bar */}
                <div className="pt-4 border-t border-gray-200 dark:border-white/10 flex flex-wrap items-center gap-x-5 gap-y-4 text-xs sm:text-sm font-semibold">
                  {[
                    { label: "Audio", icon: Headphones, query: "audio" },
                    { label: "Laptops", icon: Laptop, query: "laptops" },
                    {
                      label: "Smartphones",
                      icon: Smartphone,
                      query: "smartphones",
                    },
                    { label: "Accessories", icon: Mouse, query: "accessories" },
                    {
                      label: "Smartwatches",
                      icon: Watch,
                      query: "smartwatches",
                    },
                    {
                      label: "Monitors",
                      icon: Monitor,
                      query: "monitors",
                    },
                  ].map((cat, idx, arr) => {
                    const CatIcon = cat.icon;
                    return (
                      <React.Fragment key={cat.label}>
                        <Link
                          to={`/shop?category=${encodeURIComponent(cat.query)}`}
                          className="inline-flex items-center gap-2 text-header dark:text-slate-300 hover:text-indigo-400 transition">
                          <CatIcon className="h-4 w-4 text-indigo-400" />
                          <span>{cat.label}</span>
                        </Link>
                        {idx < arr.length - 1 && (
                          <span className="text-gray-300 dark:text-slate-600">
                            •
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* ================= 3. OUR CATEGORIES / WHAT WE OFFER ================= */}
          <section className="space-y-8 sm:space-y-10">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400 block">
                OUR CATEGORIES
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-menuHeading">
                Technology for Work, Entertainment & Life
              </h2>
            </div>

            {/* 4-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {CATEGORY_CARDS.map((cat) => {
                const IconComp = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="group relative flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121429] p-6 lg:p-7 shadow-sm dark:shadow-xl transition duration-300 hover:border-indigo-500/50 hover:bg-gray-50 dark:hover:bg-[#161833] h-full">
                    <div>
                      <div className="mb-6">
                        <IconComp className="h-8 w-8 text-indigo-400" />
                      </div>

                      <p className="text-[10px] font-bold text-header/70 dark:text-slate-500 tracking-wider mb-1.5">
                        {cat.num}
                      </p>
                      <h3 className="text-base sm:text-lg font-bold text-menuHeading mb-2.5">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-header dark:text-slate-400 leading-relaxed mb-8">
                        {cat.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 dark:border-white/5">
                      <Link
                        to={`/shop?category=${encodeURIComponent(cat.query)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 transition-transform duration-300 group-hover:translate-x-1 hover:text-indigo-300">
                        Explore {cat.name}{" "}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================= 4. WHY CHOOSE OREBI ================= */}
          <section className="space-y-8 sm:space-y-10">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400 block">
                WHY CHOOSE OREBI
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-menuHeading">
                Designed for Clarity & Simplicity
              </h2>
            </div>

            {/* 4-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {WHY_CHOOSE_CARDS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121429] p-7 sm:p-8 lg:p-9 shadow-sm dark:shadow-xl transition duration-300 hover:border-indigo-500/50 hover:bg-gray-50 dark:hover:bg-[#161833] flex flex-col justify-between h-full">
                    <div>
                      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/20 border border-indigo-500/30 text-indigo-400">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-menuHeading mb-2.5">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-header dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================= 5. CURATED COLLECTION ================= */}
          <section className="space-y-8 sm:space-y-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400 block">
                  CURATED COLLECTION
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-menuHeading">
                  Explore Popular Selections
                </h2>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                View Entire Catalog <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {isLoadingStore ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-64 animate-pulse rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-[#121429]"
                  />
                ))}
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {featuredProducts.map((prod) => {
                  const display = normalizeProductForDisplay(prod);
                  return (
                    <div
                      key={prod._id || prod.id}
                      className="group flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121429] p-6 shadow-sm dark:shadow-xl transition duration-300 hover:border-indigo-500/50 h-full">
                      <div>
                        {/* Image Box — bg-white works fine in both modes */}
                        <div className="aspect-16/10 w-full overflow-hidden rounded-xl bg-white p-5 flex items-center justify-center mb-5">
                          {display.image ? (
                            <img
                              src={display.image}
                              alt={display.name}
                              className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <PackageSearch className="h-8 w-8 text-gray-400" />
                          )}
                        </div>

                        <p className="text-[10px] font-bold uppercase tracking-wider text-header dark:text-slate-400 mb-1.5">
                          {display.category || "General"}
                        </p>
                        <h3 className="text-sm sm:text-base font-bold text-menuHeading line-clamp-2 min-h-11">
                          {display.name}
                        </h3>
                        <p className="mt-3 text-sm sm:text-base font-bold text-menuHeading">
                          {display.price}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/10">
                        <Link
                          to={`/productdetails/${display.id}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300">
                          View Details <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 text-center border border-gray-200 dark:border-white/10 rounded-2xl bg-white dark:bg-[#121429]">
                <Link
                  to="/shop"
                  className="text-xs font-bold text-indigo-400 hover:underline">
                  Explore our full catalog on the Shop page →
                </Link>
              </div>
            )}
          </section>

          {/* ================= 6. OUR VALUES ================= */}
          <section className="space-y-8 sm:space-y-10">
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-400 block">
                OUR VALUES
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-menuHeading">
                Built on Essential Principles
              </h2>
            </div>

            {/* Container Box */}
            <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121429] p-8 sm:p-12 lg:p-16 shadow-sm dark:shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-white/10">
              {BRAND_VALUES.map((val) => (
                <div
                  key={val.title}
                  className="pt-6 md:pt-0 md:px-8 lg:px-12 first:pl-0 last:pr-0 space-y-4">
                  <span className="text-3xl lg:text-4xl font-extrabold text-indigo-400 mb-2 block">
                    {val.number}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-menuHeading mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-header dark:text-slate-400 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 7. FINAL CTA ================= */}
          {/* CTA uses theme-responsive background image */}
          <section
            className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-no-repeat bg-cover bg-center shadow-sm dark:shadow-2xl"
            style={{
              backgroundImage: `url(${isDark ? aboutCtaImg : aboutCtaLightImg})`,
            }}>
            <div className="p-10 sm:p-16 dark:bg-black/50 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="space-y-5 max-w-xl">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-menuHeading dark:text-white tracking-tight">
                  Find the Right Tech for Your Everyday
                </h2>
                <p className="text-xs sm:text-sm lg:text-base text-header dark:text-slate-200 leading-relaxed">
                  Explore our collection of smartphones, laptops, audio
                  products, smartwatches, and everyday accessories.
                </p>
                <div className="pt-4">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 rounded-full bg-menuHeading text-white dark:bg-white dark:text-gray-900 px-8 py-3.5 text-xs font-bold shadow-xl transition duration-300 hover:opacity-90 dark:hover:bg-gray-100">
                    Shop Now <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};

export default About;
