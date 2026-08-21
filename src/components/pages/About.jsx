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
  Layers,
  Award,
  Zap,
  ChevronRight,
  PackageSearch,
} from "lucide-react";
import Container from "../Container";
import Intro from "../Intro";
import { Button } from "@/components/ui/button";
import { fetchCategories, fetchProducts } from "@/services/productService";
import { getPrimaryVariant, normalizeProductForDisplay } from "@/lib/productUtils";

// Reusing existing local asset images
import headPhoneImg from "@/assets/headPhone.png";
import smartWatchImg from "@/assets/smartWatch.png";
import adOneImg from "@/assets/adOne.png";
import adTwoImg from "@/assets/adTwo.png";

const CATEGORY_DATA = [
  {
    id: "audio",
    name: "Audio",
    icon: Headphones,
    query: "audio",
    badge: "Headphones & Earbuds",
    description:
      "High-fidelity headphones, wireless earbuds, and speakers engineered for immersive sound everywhere you go.",
  },
  {
    id: "laptops",
    name: "Laptops",
    icon: Laptop,
    query: "laptops",
    badge: "Work & Gaming",
    description:
      "Powerful portable laptops designed for everyday productivity, creative workflows, study, and gaming.",
  },
  {
    id: "smartphones",
    name: "Smartphones",
    icon: Smartphone,
    query: "smartphones",
    badge: "Next-Gen Mobile",
    description:
      "Modern mobile devices featuring crisp displays, advanced camera systems, and seamless connectivity.",
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: Keyboard,
    query: "accessories",
    badge: "Mouse • Keyboard • Power Bank",
    description:
      "Essential digital peripherals including Wireless Mouse, Wireless Keyboards, and high-capacity Power Banks.",
    isAccessory: true,
  },
  {
    id: "smartwatches",
    name: "Smartwatches",
    icon: Watch,
    query: "smartwatches",
    badge: "Fitness & Wearables",
    description:
      "Smart wearables to monitor health metrics, track workouts, manage notifications, and complement your style.",
  },
];

const WHY_CHOOSE_ITEMS = [
  {
    icon: Sparkles,
    title: "Curated Products",
    description:
      "Explore a focused selection of technology and accessories designed for genuine everyday needs.",
  },
  {
    icon: ShoppingBag,
    title: "Simple Shopping",
    description:
      "Find products, compare options, and move from browsing to checkout without unnecessary complexity.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    description:
      "Your shopping experience is built with secure session authentication and protected checkout pathways.",
  },
  {
    icon: CheckCircle2,
    title: "Customer Focused",
    description:
      "Clear product information, straightforward navigation, and transparent details come first.",
  },
];

const BRAND_VALUES = [
  {
    number: "01",
    title: "Quality",
    description:
      "We focus on products that offer practical value, reliable performance, and durable materials for everyday use.",
  },
  {
    number: "02",
    title: "Practicality",
    description:
      "Technology should simplify daily tasks, entertain seamlessly, and fit naturally into modern routines.",
  },
  {
    number: "03",
    title: "Modern Living",
    description:
      "From smart wearables to essential desk accessories, Orebi is built around today’s connected digital lifestyle.",
  },
];

const About = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categoryCount, setCategoryCount] = useState(5);
  const [isLoadingStore, setIsLoadingStore] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([fetchProducts(), fetchCategories()])
      .then(([products, categories]) => {
        if (!isMounted) return;
        if (Array.isArray(products) && products.length > 0) {
          setFeaturedProducts(products.slice(0, 4));
        }
        if (Array.isArray(categories) && categories.length > 0) {
          setCategoryCount(categories.length);
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

      <div className="bg-background font-dmSans space-y-16 pb-20">
        <Container>
          {/* ================= 1. HERO SECTION ================= */}
          <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-bHeaderBg via-white to-gray-50 p-6 sm:p-10 lg:p-14 shadow-sm dark:border-white/10 dark:from-white/5 dark:via-white/5 dark:to-transparent">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
              {/* Left Column: Content */}
              <div className="space-y-6 lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-menuHeading dark:border-white/20 dark:bg-white/10 dark:text-white backdrop-blur-sm">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  About Orebi Storefront
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-menuHeading dark:text-white sm:text-4xl lg:text-5xl leading-[1.15]">
                  Technology That Fits Your Everyday Life
                </h1>

                <p className="max-w-2xl text-base text-gray-600 dark:text-gray-300 sm:text-lg leading-relaxed">
                  Discover thoughtfully selected technology and accessories
                  designed to make work, entertainment, and everyday life
                  simpler, more efficient, and enjoyable.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="h-12 px-7 bg-gray-900 text-white font-semibold hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 cursor-pointer rounded-xl">
                    <Link to="/shop" className="flex items-center gap-2">
                      Explore Our Collection <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* Micro Stats */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-white/10">
                  <div>
                    <p className="text-xl font-bold text-menuHeading dark:text-white sm:text-2xl">
                      5
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Core Categories
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-menuHeading dark:text-white sm:text-2xl">
                      100%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Curated Tech
                    </p>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-menuHeading dark:text-white sm:text-2xl">
                      Secure
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                      Storefront Checkout
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Composition */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Outer subtle glow decoration */}
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-gray-200 to-gray-400 opacity-30 blur-xl dark:from-white/10 dark:to-white/5" />

                  <div className="relative rounded-2xl border border-gray-200 bg-white p-5 shadow-lg dark:border-white/10 dark:bg-[#191E28]">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/5 flex flex-col justify-between">
                        <img
                          src={headPhoneImg}
                          alt="Audio Tech"
                          className="h-28 w-full object-contain transition-transform duration-300 hover:scale-105"
                        />
                        <div className="mt-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Audio
                          </span>
                          <p className="text-xs font-bold text-menuHeading dark:text-white">
                            High-Fidelity
                          </p>
                        </div>
                      </div>

                      <div className="overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/5 flex flex-col justify-between">
                        <img
                          src={smartWatchImg}
                          alt="Wearables"
                          className="h-28 w-full object-contain transition-transform duration-300 hover:scale-105"
                        />
                        <div className="mt-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            Smartwatches
                          </span>
                          <p className="text-xs font-bold text-menuHeading dark:text-white">
                            Active Lifestyle
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-white/5 dark:bg-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          Accessories
                        </span>
                        <p className="text-xs font-bold text-menuHeading dark:text-white">
                          Mouse • Keyboard • Power Bank
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Mouse className="h-4 w-4" />
                        <Keyboard className="h-4 w-4" />
                        <BatteryCharging className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= 2. OUR STORY ================= */}
          <section className="rounded-3xl border border-gray-200 bg-bHeaderBg p-6 sm:p-10 shadow-sm dark:border-white/10 dark:bg-white/5">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Our Story
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-menuHeading dark:text-white sm:text-3xl">
                A Modern Destination for Everyday Technology
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-gray-600 dark:text-gray-300">
                Orebi is a modern e-commerce destination for everyday
                technology — bringing together useful, reliable, and stylish
                products in one place. We focus on providing a seamless
                shopping experience for essential tech across five core
                categories:
              </p>
            </div>

            {/* Core category pill tags */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {[
                "Audio",
                "Laptops",
                "Smartphones",
                "Accessories",
                "Smartwatches",
              ].map((cat) => (
                <Link
                  key={cat}
                  to={`/shop?category=${encodeURIComponent(cat.toLowerCase())}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-menuHeading shadow-sm transition hover:border-gray-900 dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:border-white">
                  <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  {cat}
                </Link>
              ))}
            </div>
          </section>

          {/* ================= 3. WHAT WE OFFER (5 CATEGORIES) ================= */}
          <section className="space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Catalog Overview
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-menuHeading dark:text-white sm:text-3xl">
                What We Offer
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Explore our five specialized categories designed for your
                digital workflow and everyday convenience.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORY_DATA.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <article
                    key={cat.id}
                    className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-gray-900 dark:border-white/10 dark:bg-white/5 dark:hover:border-white">
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bHeaderBg text-menuHeading dark:bg-white/10 dark:text-white">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[11px] font-semibold text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
                          {cat.badge}
                        </span>
                      </div>

                      <h3 className="mt-5 text-xl font-bold text-menuHeading dark:text-white">
                        {cat.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                        {cat.description}
                      </p>

                      {cat.isAccessory && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-200">
                            <Mouse className="h-3 w-3" /> Wireless Mouse
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-200">
                            <Keyboard className="h-3 w-3" /> Wireless Keyboard
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[10px] font-semibold text-gray-700 dark:bg-white/10 dark:text-gray-200">
                            <BatteryCharging className="h-3 w-3" /> Power Bank
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="pt-6 mt-6 border-t border-gray-100 dark:border-white/10">
                      <Link
                        to={`/shop?category=${encodeURIComponent(cat.query)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-menuHeading dark:text-white hover:underline group-hover:translate-x-1 transition-transform">
                        Explore {cat.name} <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* ================= 4. WHY CHOOSE OREBI ================= */}
          <section className="rounded-3xl border border-gray-200 bg-bHeaderBg p-6 sm:p-10 lg:p-12 shadow-sm dark:border-white/10 dark:bg-white/5 space-y-10">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Core Advantages
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-menuHeading dark:text-white sm:text-3xl">
                Why Choose Orebi
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Built to provide a clean, dependable e-commerce experience.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {WHY_CHOOSE_ITEMS.map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-menuHeading dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================= 5. LIVE STORE CATALOG HIGHLIGHT ================= */}
          <section className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  Live Catalog
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-menuHeading dark:text-white sm:text-3xl">
                  Featured Products
                </h2>
              </div>
              <Button asChild variant="outline" className="cursor-pointer rounded-xl">
                <Link to="/shop" className="flex items-center gap-1.5">
                  View All Products <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {isLoadingStore ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-64 animate-pulse rounded-2xl border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-white/5"
                  />
                ))}
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {featuredProducts.map((prod) => {
                  const display = normalizeProductForDisplay(prod);
                  return (
                    <article
                      key={prod._id || prod.id}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/5">
                      <div className="relative aspect-[4/3] bg-gray-50 dark:bg-white/5 overflow-hidden">
                        {display.image ? (
                          <img
                            src={display.image}
                            alt={display.name}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-gray-400">
                            <PackageSearch className="h-10 w-10" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-4 justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                            {display.category || "General"}
                          </p>
                          <h3 className="mt-1 line-clamp-1 text-sm font-bold text-menuHeading dark:text-white">
                            {display.name}
                          </h3>
                          <p className="mt-2 text-sm font-bold text-menuHeading dark:text-white">
                            {display.price}
                          </p>
                        </div>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="mt-4 w-full justify-between cursor-pointer border border-gray-200 dark:border-white/10">
                          <Link to={`/productdetails/${display.id}`}>
                            Details <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-200 bg-bHeaderBg p-8 text-center dark:border-white/10 dark:bg-white/5">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Explore our full catalog on the Shop page.
                </p>
              </div>
            )}
          </section>

          {/* ================= 6. BRAND VALUES ================= */}
          <section className="space-y-8">
            <div className="text-center space-y-2 max-w-2xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                Our Commitment
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-menuHeading dark:text-white sm:text-3xl">
                Brand Values
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {BRAND_VALUES.map((val) => (
                <div
                  key={val.title}
                  className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
                  <span className="text-3xl font-extrabold text-gray-200 dark:text-white/20">
                    {val.number}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-menuHeading dark:text-white">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 7. FINAL CTA ================= */}
          <section className="rounded-3xl border border-gray-200 bg-gradient-to-r from-gray-900 via-gray-800 to-black p-8 sm:p-12 text-center text-white shadow-xl dark:border-white/10">
            <div className="mx-auto max-w-2xl space-y-4">
              <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl leading-tight">
                Find the Right Tech for Your Everyday
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Explore our collection of smartphones, laptops, audio products,
                smartwatches, and everyday accessories.
              </p>
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="h-12 px-8 bg-white text-gray-900 font-bold hover:bg-gray-100 cursor-pointer rounded-xl">
                  <Link to="/shop">Shop Now</Link>
                </Button>
              </div>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};

export default About;