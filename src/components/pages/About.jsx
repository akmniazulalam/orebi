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
  BatteryCharging,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  PackageSearch,
} from "lucide-react";
import Container from "../Container";
import Intro from "../Intro";
import { Button } from "@/components/ui/button";
import { fetchCategories, fetchProducts } from "@/services/productService";
import { normalizeProductForDisplay } from "@/lib/productUtils";

// Reusing existing local asset images
import headPhoneImg from "@/assets/headPhone.png";
import smartWatchImg from "@/assets/smartWatch.png";
import adOneImg from "@/assets/adOne.png";

const CATEGORY_ITEMS = [
  {
    num: "01",
    id: "audio",
    name: "Audio",
    icon: Headphones,
    query: "audio",
    subtitle: "Headphones, Earbuds & Wireless Sound",
    description:
      "High-fidelity headphones, wireless earbuds, and acoustic gear engineered for clear sound everywhere you go.",
  },
  {
    num: "02",
    id: "laptops",
    name: "Laptops",
    icon: Laptop,
    query: "laptops",
    subtitle: "Workstations & Portable Performance",
    description:
      "Powerful portable laptops designed for creative workflows, study, remote productivity, and gaming.",
  },
  {
    num: "03",
    id: "smartphones",
    name: "Smartphones",
    icon: Smartphone,
    query: "smartphones",
    subtitle: "Next-Gen Mobile Devices",
    description:
      "Modern mobile devices featuring crisp displays, fast processors, multi-lens cameras, and seamless connectivity.",
  },
  {
    num: "04",
    id: "accessories",
    name: "Accessories",
    icon: Keyboard,
    query: "accessories",
    subtitle: "Wireless Mouse • Wireless Keyboard • Power Bank",
    description:
      "Essential digital peripherals designed for modern desk setups, including Wireless Mouse, Wireless Keyboards, and high-capacity Power Banks.",
    isAccessory: true,
  },
  {
    num: "05",
    id: "smartwatches",
    name: "Smartwatches",
    icon: Watch,
    query: "smartwatches",
    subtitle: "Fitness Tracking & Smart Wearables",
    description:
      "Smart wearables to track daily health metrics, workouts, notifications, and complement active digital routines.",
  },
];

const WHY_CHOOSE_ITEMS = [
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
    icon: CheckCircle2,
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
      "From desk accessories to smart wearables, Orebi is built around today’s connected and active digital lifestyle.",
  },
];

const About = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoadingStore, setIsLoadingStore] = useState(true);

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

      <div className="bg-background font-dmSans space-y-24 sm:space-y-32 pb-24">
        <Container>
          {/* ================= 1. PAGE HERO (EDITORIAL & SPACIOUS) ================= */}
          <section className="pt-4 sm:pt-8">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              {/* Left: Editorial Hero Copy */}
              <div className="space-y-6 lg:col-span-7">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400 dark:text-gray-400">
                  ABOUT OREBI
                </span>

                <h1 className="text-4xl font-bold tracking-tight text-menuHeading dark:text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                  Technology That Fits Your Everyday Life
                </h1>

                <p className="max-w-xl text-base text-gray-600 dark:text-gray-300 sm:text-lg leading-relaxed">
                  Discover thoughtfully selected technology and accessories
                  designed to make work, entertainment, and everyday life
                  simpler and more enjoyable.
                </p>

                <div className="pt-2">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 px-8 bg-gray-900 text-white font-medium hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 cursor-pointer rounded-xl transition duration-300">
                    <Link to="/shop" className="inline-flex items-center gap-2">
                      Explore Our Collection <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right: Clean Single Visual Composition */}
              <div className="lg:col-span-5">
                <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 via-gray-100/50 to-gray-200/30 p-8 sm:p-12 dark:border-white/10 dark:from-white/5 dark:via-white/5 dark:to-transparent flex items-center justify-center">
                  {/* Backdrop Radial Decor */}
                  <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-gray-300/40 blur-3xl dark:bg-white/10" />

                  <div className="relative z-10 text-center space-y-6">
                    <img
                      src={headPhoneImg}
                      alt="Orebi Featured Tech"
                      className="mx-auto h-48 sm:h-56 w-auto object-contain transition duration-500 hover:scale-105"
                    />
                    <div className="pt-2 border-t border-gray-200 dark:border-white/10">
                      <p className="text-xs font-bold uppercase tracking-wider text-menuHeading dark:text-white">
                        Curated Tech & Peripherals
                      </p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                        Audio • Laptops • Smartphones • Accessories • Smartwatches
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= 2. OUR STORY (EDITORIAL & FLOWING) ================= */}
          <section className="py-8 border-t border-gray-200 dark:border-white/10">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
              <div className="lg:col-span-4">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                  OUR STORY
                </span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-menuHeading dark:text-white sm:text-3xl">
                  A Modern Destination for Everyday Technology
                </h2>
              </div>

              <div className="lg:col-span-8 space-y-6">
                <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-gray-300">
                  Orebi is a modern e-commerce destination for everyday
                  technology — bringing together useful, reliable, and stylish
                  products in one place. We focus on providing a seamless
                  shopping experience for essential tech across five core
                  categories:
                </p>

                {/* Horizontal Flowing Category List */}
                <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-menuHeading dark:text-white">
                  {[
                    "Audio",
                    "Laptops",
                    "Smartphones",
                    "Accessories",
                    "Smartwatches",
                  ].map((cat, idx, arr) => (
                    <React.Fragment key={cat}>
                      <Link
                        to={`/shop?category=${encodeURIComponent(cat.toLowerCase())}`}
                        className="hover:underline hover:text-gray-600 dark:hover:text-gray-300 transition">
                        {cat}
                      </Link>
                      {idx < arr.length - 1 && (
                        <span className="text-gray-300 dark:text-gray-600">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================= 3. WHAT WE OFFER (ELEGANT EDITORIAL ROWS) ================= */}
          <section className="space-y-12">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between border-b border-gray-200 dark:border-white/10 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                  WHAT WE OFFER
                </span>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-menuHeading dark:text-white sm:text-3xl">
                  Technology for Work, Entertainment & Life
                </h2>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
                Explore our five specialized categories designed for your
                digital workflow.
              </p>
            </div>

            {/* List Rows */}
            <div className="divide-y divide-gray-200 dark:divide-white/10">
              {CATEGORY_ITEMS.map((cat) => {
                const IconComp = cat.icon;
                return (
                  <div
                    key={cat.id}
                    className="group py-8 transition duration-300 hover:bg-gray-50/50 dark:hover:bg-white/[0.02] sm:px-4 rounded-xl">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-center">
                      {/* Number & Icon */}
                      <div className="sm:col-span-3 flex items-center gap-4">
                        <span className="text-xs font-bold text-gray-400 tracking-wider">
                          {cat.num}
                        </span>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-menuHeading dark:bg-white/10 dark:text-white">
                          <IconComp className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold text-menuHeading dark:text-white">
                          {cat.name}
                        </h3>
                      </div>

                      {/* Description */}
                      <div className="sm:col-span-7 space-y-1">
                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                          {cat.subtitle}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>

                      {/* Link Action */}
                      <div className="sm:col-span-2 text-left sm:text-right pt-2 sm:pt-0">
                        <Link
                          to={`/shop?category=${encodeURIComponent(cat.query)}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-menuHeading dark:text-white transition-transform duration-300 group-hover:translate-x-1 hover:underline">
                          Explore <ChevronRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================= 4. WHY CHOOSE OREBI (MINIMAL HORIZONTAL FEATURES) ================= */}
          <section className="py-12 border-t border-b border-gray-200 dark:border-white/10">
            <div className="space-y-10">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                  WHY OREBI
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-menuHeading dark:text-white sm:text-3xl">
                  Designed for Clarity & Simplicity
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {WHY_CHOOSE_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="space-y-3">
                      <Icon className="h-6 w-6 text-menuHeading dark:text-white" />
                      <h3 className="text-base font-bold text-menuHeading dark:text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ================= 5. CURATED STORE HIGHLIGHT (MINIMAL SHOWCASE) ================= */}
          <section className="space-y-8">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                  CURATED COLLECTION
                </span>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-menuHeading dark:text-white sm:text-3xl">
                  Explore Popular Selections
                </h2>
              </div>
              <Link
                to="/shop"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-menuHeading dark:text-white hover:underline">
                View Entire Catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {isLoadingStore ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-56 animate-pulse rounded-2xl bg-gray-100 dark:bg-white/5"
                  />
                ))}
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {featuredProducts.map((prod) => {
                  const display = normalizeProductForDisplay(prod);
                  return (
                    <Link
                      key={prod._id || prod.id}
                      to={`/productdetails/${display.id}`}
                      className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 transition duration-300 hover:border-gray-900 dark:border-white/10 dark:bg-white/5 dark:hover:border-white">
                      <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center p-4">
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
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            {display.category || "General"}
                          </p>
                          <h3 className="text-sm font-bold text-menuHeading dark:text-white line-clamp-1">
                            {display.name}
                          </h3>
                        </div>
                        <span className="text-sm font-bold text-menuHeading dark:text-white">
                          {display.price}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="py-8 text-center border border-gray-200 dark:border-white/10 rounded-2xl">
                <Link
                  to="/shop"
                  className="text-xs font-bold text-menuHeading dark:text-white underline">
                  Explore our full catalog on the Shop page →
                </Link>
              </div>
            )}
          </section>

          {/* ================= 6. BRAND VALUES (MINIMAL EDITORIAL COLUMNS) ================= */}
          <section className="space-y-10 border-t border-gray-200 dark:border-white/10 pt-12">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-gray-400">
                OUR VALUES
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-menuHeading dark:text-white sm:text-3xl">
                Built on Essential Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {BRAND_VALUES.map((val) => (
                <div
                  key={val.title}
                  className="space-y-3 border-t border-gray-200 dark:border-white/10 pt-6">
                  <span className="text-2xl font-extrabold text-gray-300 dark:text-white/20">
                    {val.number}
                  </span>
                  <h3 className="text-lg font-bold text-menuHeading dark:text-white">
                    {val.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 7. FINAL CTA (CLEAN & REFINED) ================= */}
          <section className="pt-8">
            <div className="rounded-3xl border border-gray-200 bg-gradient-to-br from-bHeaderBg via-white to-gray-100 p-10 sm:p-16 text-center shadow-sm dark:border-white/10 dark:from-white/5 dark:via-white/5 dark:to-transparent">
              <div className="mx-auto max-w-2xl space-y-4">
                <h2 className="text-3xl font-bold sm:text-4xl text-menuHeading dark:text-white tracking-tight">
                  Find the Right Tech for Your Everyday
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl mx-auto">
                  Explore our collection of smartphones, laptops, audio products,
                  smartwatches, and everyday accessories.
                </p>
                <div className="pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 px-8 bg-gray-900 text-white font-medium hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 cursor-pointer rounded-xl transition duration-300">
                    <Link to="/shop">Shop Now</Link>
                  </Button>
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