import React, { useEffect, useMemo, useState } from "react";
import Container from "../Container";
import {
  ShoppingCart,
  Check,
  Star,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Loader2,
  ChevronRight,
  Package,
  Layers,
  Info,
} from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import useCart from "@/store/cart";
import useWishlist from "@/store/wishlist";
import { FaTshirt } from "react-icons/fa";
import { fetchProductById } from "@/services/productService";
import { buildCartLineItem, findVariantByOptions } from "@/lib/cartUtils";
import { getPrimaryVariant, getUniqueVariantColors } from "@/lib/productUtils";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const addToCart = useCart((state) => state.addToCart);
  const toggleWishlistStore = useWishlist((state) => state.toggleWishlist);
  const wishlistItems = useWishlist((state) => state.items);

  const [quantity, setQuantity] = useState(1);
  const [singleProduct, setSingleProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRam, setSelectedRam] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [activeImage, setActiveImage] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  // --- Animation State (Preserved Framer Motion Add to Cart) ---
  const [animating, setAnimating] = useState(false);
  const [showText, setShowText] = useState(true);
  const [showShirt, setShowShirt] = useState(false);
  const [showTick, setShowTick] = useState(false);
  const [moveCart, setMoveCart] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const [shirtReturn, setShirtReturn] = useState(false);
  const [fillColor, setFillColor] = useState(false);
  const cartControls = useAnimation();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleClick = async () => {
    if (animating) return;

    if (!selectedVariant) {
      toast.error("Please select a variant");
      return;
    }

    if (Number(selectedVariant.stock ?? 0) <= 0) {
      toast.error("This variant is currently out of stock");
      return;
    }

    addToCart(buildCartLineItem(singleProduct, selectedVariant, quantity));

    try {
      // HIDE TEXT
      setShowText(false);
      setAnimating(true);

      // MOVE CART TO CENTER
      await cartControls.start({
        x: 56,
        transition: {
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        },
      });

      await sleep(120);

      // BORDER STRETCH EFFECT
      setShowPortal(true);

      await sleep(80);

      // SHIRT COMES OUT
      setShowShirt(true);

      // SHIRT GOING UP
      await sleep(320);

      // BORDER NORMAL AGAIN
      setShowPortal(false);

      // SHIRT STAYS UP
      await sleep(250);

      // SHIRT RETURNS TO CART
      setShirtReturn(true);

      await sleep(350);

      setFillColor(true);

      // HIDE SHIRT
      setShowShirt(false);
      setShirtReturn(false);

      // SUCCESS TICK + SINGLE SUCCESS TOAST
      setShowTick(true);
      toast.success("Added to cart!", { id: "add-to-cart" });

      await sleep(650);

      // CART DRIVE
      setMoveCart(true);

      await cartControls.start({
        x: 270,
        transition: {
          duration: 1,
          ease: "easeInOut",
        },
      });

      await sleep(50);

      // START RESET
      setMoveCart(false);
      setShowTick(false);
      setFillColor(false);
      setResetting(true);

      cartControls.set({
        x: -64,
      });

      setTimeout(async () => {
        setShowText(true);

        await Promise.all([
          cartControls.start({
            x: 0,
            transition: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            },
          }),
        ]);

        setResetting(false);
        setAnimating(false);
      }, 50);
    } catch (err) {
      setAnimating(false);
      setShowText(true);
      setShowShirt(false);
      setShowTick(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setLoadError(null);

    fetchProductById(id)
      .then((product) => {
        if (!isMounted) return;
        if (!product) {
          setLoadError("Product not found");
          return;
        }
        setSingleProduct(product);
        const primary = getPrimaryVariant(product.variants);
        setSelectedColor(primary?.color || "");
        setSelectedSize(primary?.size || "");
        setSelectedRam(primary?.ram || "");
        setSelectedStorage(primary?.storage || "");
        setActiveImage(
          primary?.images?.[0] || product.image || product.thumbnail || "",
        );
        setQuantity(1);
      })
      .catch(() => {
        if (isMounted) setLoadError("Failed to load product");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Derive all unique images for gallery
  const allImages = useMemo(() => {
    if (!singleProduct) return [];
    const images = [];
    if (singleProduct.image && !images.includes(singleProduct.image)) {
      images.push(singleProduct.image);
    }
    if (singleProduct.thumbnail && !images.includes(singleProduct.thumbnail)) {
      images.push(singleProduct.thumbnail);
    }
    (singleProduct.variants || []).forEach((v) => {
      if (Array.isArray(v.images)) {
        v.images.forEach((img) => {
          if (img && !images.includes(img)) {
            images.push(img);
          }
        });
      }
    });
    return images.length > 0 ? images : [];
  }, [singleProduct]);

  // Dynamic Selected Variant Matching
  const selectedVariant = useMemo(() => {
    if (!singleProduct?.variants?.length) return null;

    const match = singleProduct.variants.find((v) => {
      const colorMatch = !selectedColor || v.color === selectedColor;
      const sizeMatch = !selectedSize || v.size === selectedSize;
      const ramMatch = !selectedRam || v.ram === selectedRam;
      const storageMatch = !selectedStorage || v.storage === selectedStorage;
      return colorMatch && sizeMatch && ramMatch && storageMatch;
    });

    return (
      match ||
      findVariantByOptions(singleProduct.variants, {
        color: selectedColor,
        size: selectedSize,
      }) ||
      singleProduct.variants[0]
    );
  }, [
    singleProduct,
    selectedColor,
    selectedSize,
    selectedRam,
    selectedStorage,
  ]);

  // Sync image when variant changes
  useEffect(() => {
    if (selectedVariant?.images?.[0]) {
      setActiveImage(selectedVariant.images[0]);
    }
  }, [selectedVariant]);

  // Variant Option Extraction
  const colorOptions = useMemo(
    () => getUniqueVariantColors(singleProduct?.variants ?? []),
    [singleProduct],
  );

  const sizeOptions = useMemo(() => {
    const sizes = new Set();
    (singleProduct?.variants ?? []).forEach((v) => {
      if (v.size?.trim()) sizes.add(v.size.trim());
    });
    return [...sizes];
  }, [singleProduct]);

  const ramOptions = useMemo(() => {
    const rams = new Set();
    (singleProduct?.variants ?? []).forEach((v) => {
      if (v.ram?.trim()) rams.add(v.ram.trim());
    });
    return [...rams];
  }, [singleProduct]);

  const storageOptions = useMemo(() => {
    const storages = new Set();
    (singleProduct?.variants ?? []).forEach((v) => {
      if (v.storage?.trim()) storages.add(v.storage.trim());
    });
    return [...storages];
  }, [singleProduct]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    const match = singleProduct?.variants?.find(
      (v) => v.color === color && (!selectedSize || v.size === selectedSize),
    );
    if (match?.size) setSelectedSize(match.size);
    if (match?.ram) setSelectedRam(match.ram);
    if (match?.storage) setSelectedStorage(match.storage);
    setQuantity(1);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    const match = singleProduct?.variants?.find(
      (v) => v.size === size && (!selectedColor || v.color === selectedColor),
    );
    if (match?.color) setSelectedColor(match.color);
    setQuantity(1);
  };

  const handleRamSelect = (ram) => {
    setSelectedRam(ram);
    setQuantity(1);
  };

  const handleStorageSelect = (storage) => {
    setSelectedStorage(storage);
    setQuantity(1);
  };

  const currentStock = Number(selectedVariant?.stock ?? 0);
  const isOutOfStock = currentStock <= 0;

  const handleIncrement = () => {
    if (quantity < currentStock) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Maximum available stock is ${currentStock}`);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Synchronize local wishlist state whenever product or wishlist store items change
  useEffect(() => {
    if (singleProduct?._id) {
      const exists = wishlistItems.some((item) => item._id === singleProduct._id);
      setIsWishlisted(exists);
    }
  }, [singleProduct, wishlistItems]);

  const toggleWishlist = () => {
    if (!singleProduct?._id) return;
    
    const nextState = !isWishlisted;
    // 1. Immediate React UI update
    setIsWishlisted(nextState);

    // 2. Persist to store / localStorage
    toggleWishlistStore(singleProduct);

    // 3. Exactly one toast notification per click
    if (nextState) {
      toast.success("Added to Wishlist", { icon: "❤️", id: `wl-toast-${singleProduct._id}` });
    } else {
      toast("Removed from Wishlist", { icon: "🤍", id: `wl-toast-${singleProduct._id}` });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-20 font-dmSans">
        <Loader2 className="h-10 w-10 animate-spin text-menuHeading dark:text-white mb-4" />
        <p className="text-base text-header font-medium">
          Loading product details...
        </p>
      </div>
    );
  }

  if (loadError || !singleProduct) {
    return (
      <Container>
        <div className="py-20 text-center font-dmSans max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-950 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-menuHeading dark:text-white mb-2">
            {loadError || "Product Not Found"}
          </h2>
          <p className="text-sm text-header/70 mb-6">
            The product you are looking for may have been removed or is
            temporarily unavailable.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-menuHeading text-white dark:bg-white dark:text-menuHeading font-bold rounded-xl hover:opacity-90 transition-opacity">
            Return to Shop
          </Link>
        </div>
      </Container>
    );
  }

  const price = Number(selectedVariant?.price ?? 0);
  const formattedPrice = `$${price.toFixed(2)}`;
  // Comparison price for discount badge preview
  const originalPrice = price > 0 ? (price * 1.25).toFixed(2) : null;

  return (
    <div className="bg-white dark:bg-[#151921] transition-colors duration-300">
      {/* Breadcrumb Header */}
      <div className="bg-bHeaderBg/40 dark:bg-[#191E28] py-4 border-b border-gray-100 dark:border-white/5 mb-8">
        <Container>
          <nav className="flex items-center gap-2 text-xs md:text-sm font-dmSans text-header/70 dark:text-white/60">
            <Link
              to="/"
              className="hover:text-menuHeading dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              to="/shop"
              className="hover:text-menuHeading dark:hover:text-white transition-colors">
              Shop
            </Link>
            {singleProduct.category && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <Link to={`/shop?category=${encodeURIComponent(singleProduct.category)}&page=1`} className="capitalize">
                  {singleProduct.category}
                </Link>
              </>
            )}
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="font-semibold text-menuHeading dark:text-white truncate max-w-50 md:max-w-100">
              {singleProduct.name}
            </span>
          </nav>
        </Container>
      </div>

      <Container>
        {/* Main 2-Column Product Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* LEFT COLUMN: Gallery (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image Frame */}
            <div className="relative aspect-square md:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F5F5F3] dark:bg-[#1E232E] border border-gray-100 dark:border-white/10 flex items-center justify-center p-6 transition-all">
              {/* Badge overlay */}
              {selectedVariant?.badge && (
                <span className="absolute top-4 left-4 z-10 uppercase px-3 py-1 bg-menuHeading text-white dark:text-[#262626] font-dmSans font-bold text-xs tracking-wider rounded-lg shadow-sm">
                  {selectedVariant.badge}
                </span>
              )}

              {activeImage ? (
                <img
                  src={activeImage}
                  alt={singleProduct.name}
                  className="w-full h-full object-contain max-h-[480px] hover:scale-105 transition-transform duration-500 ease-out"
                />
              ) : (
                <Package className="w-24 h-24 text-gray-300 dark:text-gray-600" />
              )}
            </div>

            {/* Thumbnail Navigation Strip */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
                {allImages.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-[#F5F5F3] dark:bg-[#1E232E] border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeImage === img
                        ? "border-menuHeading dark:border-white shadow-md scale-95"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}>
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Product Information & Purchase (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            {/* Category & Rating */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              {singleProduct.category && (
                <span className="inline-block uppercase tracking-wider font-dmSans font-bold text-[11px] py-1 px-2.5 rounded-lg border border-gray-200 dark:border-white/15 text-menuHeading dark:text-white bg-gray-50 dark:bg-[#121429]">
                  {singleProduct.category}
                </span>
              )}

              <div className="flex items-center gap-1.5 font-dmSans text-xs">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 stroke-amber-400"
                    />
                  ))}
                </div>
                <span className="font-bold text-menuHeading dark:text-white">
                  4.9
                </span>
                <span className="text-header/60 dark:text-white/60">
                  (128 reviews)
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold font-dmSans text-menuHeading dark:text-white leading-tight">
              {singleProduct.name}
            </h1>

            {/* Price & Stock Pill */}
            <div className="flex items-baseline gap-4 py-2 border-y border-gray-100 dark:border-white/10">
              <span className="text-3xl font-bold font-dmSans text-menuHeading dark:text-white">
                {formattedPrice}
              </span>

              {originalPrice && (
                <span className="text-lg font-dmSans text-header/50 line-through">
                  ${originalPrice}
                </span>
              )}

              {/* Stock Status Badge */}
              <div className="ml-auto">
                {isOutOfStock ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-dmSans bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Out of Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-dmSans bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    In Stock ({currentStock} available)
                  </span>
                )}
              </div>
            </div>

            {/* Product Summary */}
            {singleProduct.description && (
              <p className="text-sm font-dmSans text-header/80 dark:text-white/75 leading-relaxed">
                {singleProduct.description}
              </p>
            )}

            {/* VARIANT SELECTORS */}
            <div className="space-y-5 pt-2">
              {/* Color Options */}
              {colorOptions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase tracking-wider font-bold font-dmSans text-menuHeading dark:text-white">
                      Color:{" "}
                      <span className="font-normal text-header/70">
                        {selectedColor}
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {colorOptions.map((color) => {
                      const isSelected = selectedColor === color;
                      return (
                        <button
                          key={color}
                          type="button"
                          onClick={() => handleColorSelect(color)}
                          className={`group relative flex items-center justify-center p-1 rounded-full cursor-pointer transition-all ${
                            isSelected
                              ? "ring-2 ring-menuHeading dark:ring-white scale-110"
                              : "hover:scale-105 opacity-80 hover:opacity-100"
                          }`}>
                          <span
                            className="w-7 h-7 rounded-full border border-gray-300 dark:border-white/20 shadow-inner"
                            style={{ backgroundColor: color }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Size Options */}
              {sizeOptions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase tracking-wider font-bold font-dmSans text-menuHeading dark:text-white">
                      Size:{" "}
                      <span className="font-normal text-header/70">
                        {selectedSize}
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {sizeOptions.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          type="button"
                          onClick={() => handleSizeSelect(size)}
                          className={`px-4 py-2 text-xs font-bold font-dmSans rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "border-menuHeading bg-menuHeading text-white dark:border-white dark:bg-white dark:text-[#262626] shadow-sm"
                              : "border-gray-200 dark:border-white/10 bg-white dark:bg-[#1E232E] text-menuHeading dark:text-white hover:border-menuHeading/40"
                          }`}>
                          {size}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* RAM Options (If present in variant schema) */}
              {ramOptions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase tracking-wider font-bold font-dmSans text-menuHeading dark:text-white">
                      Memory (RAM):{" "}
                      <span className="font-normal text-header/70">
                        {selectedRam}
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {ramOptions.map((ram) => (
                      <button
                        key={ram}
                        type="button"
                        onClick={() => handleRamSelect(ram)}
                        className={`px-4 py-2 text-xs font-bold font-dmSans rounded-xl border transition-all cursor-pointer ${
                          selectedRam === ram
                            ? "border-menuHeading bg-menuHeading text-white dark:border-white dark:bg-white dark:text-[#262626]"
                            : "border-gray-200 dark:border-white/10 text-menuHeading dark:text-white"
                        }`}>
                        {ram}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Storage Options (If present in variant schema) */}
              {storageOptions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase tracking-wider font-bold font-dmSans text-menuHeading dark:text-white">
                      Storage:{" "}
                      <span className="font-normal text-header/70">
                        {selectedStorage}
                      </span>
                    </label>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {storageOptions.map((storage) => (
                      <button
                        key={storage}
                        type="button"
                        onClick={() => handleStorageSelect(storage)}
                        className={`px-4 py-2 text-xs font-bold font-dmSans rounded-xl border transition-all cursor-pointer ${
                          selectedStorage === storage
                            ? "border-menuHeading bg-menuHeading text-white dark:border-white dark:bg-white dark:text-[#262626]"
                            : "border-gray-200 dark:border-white/10 text-menuHeading dark:text-white"
                        }`}>
                        {storage}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Counter */}
              <div className="space-x-3">
                <label className="text-xs uppercase tracking-wider font-bold font-dmSans text-menuHeading dark:text-white">
                  Quantity:
                </label>
                <div className="inline-flex items-center border border-gray-200 dark:border-white/15 rounded-xl bg-white dark:bg-[#1E232E] overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg text-menuHeading dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-40 transition-colors cursor-pointer">
                    -
                  </button>
                  <span className="w-12 text-center font-dmSans font-bold text-sm text-menuHeading dark:text-white">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    disabled={quantity >= currentStock || isOutOfStock}
                    className="w-10 h-10 flex items-center justify-center font-bold text-lg text-menuHeading dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 disabled:opacity-40 transition-colors cursor-pointer">
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS (CTAs) */}
            <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-4">
              {/* PRIMARY CTA: Framer Motion Add to Cart Animation Button */}
              <button
                type="button"
                onClick={handleClick}
                disabled={isOutOfStock || animating}
                className={`relative ${
                  moveCart
                    ? "overflow-hidden"
                    : resetting
                      ? "overflow-hidden"
                      : "overflow-visible"
                } min-h-[52px] flex-1 rounded-xl text-white bg-menuHeading dark:bg-white dark:text-menuHeading text-base font-bold font-dmSans cursor-pointer transition-all duration-300 flex items-center justify-center shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95`}>
                {/* TEXT */}
                <motion.span
                  initial={false}
                  animate={
                    !showText
                      ? {
                          opacity: 0,
                          x: -30,
                          transition: {
                            opacity: { duration: 0.15 },
                            x: { delay: 0.15, duration: 0 },
                          },
                        }
                      : resetting
                        ? {
                            opacity: [0, 1],
                            x: [-60, 0],
                          }
                        : {
                            opacity: 1,
                            x: 0,
                          }
                  }
                  transition={{
                    duration: resetting ? 1 : 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="ml-8 transition-colors duration-300 text-white dark:text-[#262626]">
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </motion.span>

                {/* ELASTIC BORDER BUMP */}
                <AnimatePresence>
                  {showPortal && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0.7 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0.8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 top-[-19px] -translate-x-1/2 z-40 pointer-events-none">
                      <div className="relative w-32 h-6">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 500 120"
                          width="100%"
                          height="100%"
                          preserveAspectRatio="none">
                          <path
                            d="M 0 96 L 0 90 C 80 90, 170 75, 250 20 C 330 75, 420 90, 500 90 L 500 96 Z"
                            fill="#262626"
                            className="fill-menuHeading"
                          />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CINEMATIC SHIRT */}
                <AnimatePresence>
                  {showShirt && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: "-24%",
                        y: 6,
                        rotate: 0,
                      }}
                      animate={
                        shirtReturn
                          ? {
                              opacity: 1,
                              x: "-24%",
                              y: 6,
                              rotate: 0,
                            }
                          : {
                              opacity: 1,
                              x: "-24%",
                              y: -95,
                              scale: 1.2,
                              rotate: 0,
                            }
                      }
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="absolute left-[47%] top-0.5 z-50 pointer-events-none">
                      <FaTshirt
                        size={24}
                        className={`drop-shadow-xl transition-colors duration-300 ${
                          shirtReturn
                            ? "text-white dark:text-[#262626]"
                            : "text-menuHeading dark:text-white"
                        }`}
                        strokeWidth={2.5}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CART */}
                <motion.div
                  animate={cartControls}
                  className="absolute left-24 md:left-33.5">
                  <motion.div
                    className="relative w-9 h-7"
                    animate={
                      resetting
                        ? {
                            x: [-80, 0],
                            opacity: [0, 1],
                          }
                        : {
                            x: 0,
                            opacity: 1,
                            rotate: moveCart ? -12 : 0,
                            y: moveCart ? -2 : 0,
                          }
                    }
                    transition={{
                      duration: resetting ? 1 : 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      transformOrigin: "8px 22px",
                    }}>
                    <ShoppingCart
                      size={28}
                      className={`text-menuHeading ${
                        fillColor
                          ? "fill-white dark:fill-[#262626]"
                          : "fill-none"
                      } transition-colors duration-300 text-white dark:text-[#262626]`}
                      strokeWidth={2.2}
                    />

                    {/* SUCCESS TICK */}
                    {showTick && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.35 }}
                        className="absolute left-2.5 top-2 z-20">
                        <Check
                          size={11}
                          className="text-emerald-500 stroke-[4]"
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              </button>

              {/* SECONDARY CTA: Wishlist Button */}
              <button
                type="button"
                onClick={toggleWishlist}
                aria-label={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                aria-pressed={isWishlisted}
                className={`min-h-[52px] sm:w-auto w-full px-5 rounded-xl border-2 font-dmSans font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer flex-shrink-0 ${
                  isWishlisted
                    ? "border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400"
                    : "border-gray-200 dark:border-white/15 bg-white dark:bg-[#1E232E] text-menuHeading dark:text-white hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 dark:hover:border-rose-400 dark:hover:bg-rose-950/20 dark:hover:text-rose-400"
                }`}>
                <Heart
                  className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
                    isWishlisted ? "fill-rose-500 text-rose-500" : ""
                  }`}
                />
                <span className="whitespace-nowrap">
                  {isWishlisted ? "Wishlisted" : "Wishlist"}
                </span>
              </button>
            </div>

            {/* TRUST & SERVICE PROMISES */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-100 dark:border-white/10 font-dmSans">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-[#1E232E]/60">
                <Truck className="w-5 h-5 text-menuHeading dark:text-white flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-menuHeading dark:text-white">
                    Free Express Shipping
                  </h4>
                  <p className="text-[11px] text-header/60 dark:text-white/50">
                    On orders over $50
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-[#1E232E]/60">
                <RotateCcw className="w-5 h-5 text-menuHeading dark:text-white flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-menuHeading dark:text-white">
                    30-Day Easy Returns
                  </h4>
                  <p className="text-[11px] text-header/60 dark:text-white/50">
                    Hassle-free guarantee
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-[#1E232E]/60">
                <ShieldCheck className="w-5 h-5 text-menuHeading dark:text-white flex-shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-menuHeading dark:text-white">
                    100% Secure Checkout
                  </h4>
                  <p className="text-[11px] text-header/60 dark:text-white/50">
                    Encrypted payment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILED INFORMATION TABS */}
        <div className="border-t border-gray-100 dark:border-white/10 pt-10 mb-16">
          <div className="flex items-center gap-8 border-b border-gray-100 dark:border-white/10 overflow-x-auto pb-3 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`font-dmSans text-base md:text-lg font-bold transition-all relative pb-2 cursor-pointer ${
                activeTab === "overview"
                  ? "text-menuHeading dark:text-white"
                  : "text-header/50 dark:text-white/40 hover:text-menuHeading"
              }`}>
              Overview & Details
              {activeTab === "overview" && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-menuHeading dark:bg-white"
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("specifications")}
              className={`font-dmSans text-base md:text-lg font-bold transition-all relative pb-2 cursor-pointer ${
                activeTab === "specifications"
                  ? "text-menuHeading dark:text-white"
                  : "text-header/50 dark:text-white/40 hover:text-menuHeading"
              }`}>
              Specifications
              {activeTab === "specifications" && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-menuHeading dark:bg-white"
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("shipping")}
              className={`font-dmSans text-base md:text-lg font-bold transition-all relative pb-2 cursor-pointer ${
                activeTab === "shipping"
                  ? "text-menuHeading dark:text-white"
                  : "text-header/50 dark:text-white/40 hover:text-menuHeading"
              }`}>
              Shipping & Returns
              {activeTab === "shipping" && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-menuHeading dark:bg-white"
                />
              )}
            </button>
          </div>

          {/* TAB CONTENT */}
          <div className="font-dmSans text-sm md:text-base text-header/80 dark:text-white/75 leading-relaxed max-w-4xl">
            {activeTab === "overview" && (
              <div className="space-y-4 animate-fade-in">
                <p>
                  {singleProduct.description ||
                    `Experience premium quality with ${singleProduct.name}. Crafted with attention to detail and designed for durability, style, and everyday comfort.`}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-[#1E232E]">
                    <Sparkles className="w-5 h-5 text-menuHeading dark:text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-menuHeading dark:text-white text-sm mb-1">
                        Premium Craftsmanship
                      </h4>
                      <p className="text-xs text-header/70 dark:text-white/60">
                        Built using sustainable, high-grade materials for
                        optimal durability.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 dark:bg-[#1E232E]">
                    <Layers className="w-5 h-5 text-menuHeading dark:text-white flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-menuHeading dark:text-white text-sm mb-1">
                        Versatile Design
                      </h4>
                      <p className="text-xs text-header/70 dark:text-white/60">
                        Seamlessly fits into modern lifestyles with clean
                        aesthetics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "specifications" && (
              <div className="animate-fade-in">
                <div className="border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-[#1E232E]">
                  <table className="w-full text-left border-collapse text-sm">
                    <tbody>
                      <tr className="border-b border-gray-100 dark:border-white/5">
                        <td className="py-3 px-4 font-bold text-menuHeading dark:text-white w-1/3 bg-gray-50 dark:bg-[#121429]">
                          Product Name
                        </td>
                        <td className="py-3 px-4">{singleProduct.name}</td>
                      </tr>
                      {singleProduct.category && (
                        <tr className="border-b border-gray-100 dark:border-white/5">
                          <td className="py-3 px-4 font-bold text-menuHeading dark:text-white w-1/3 bg-gray-50 dark:bg-[#121429]">
                            Category
                          </td>
                          <td className="py-3 px-4 capitalize">
                            {singleProduct.category}
                          </td>
                        </tr>
                      )}
                      {selectedVariant?.sku && (
                        <tr className="border-b border-gray-100 dark:border-white/5">
                          <td className="py-3 px-4 font-bold text-menuHeading dark:text-white w-1/3 bg-gray-50 dark:bg-[#121429]">
                            SKU
                          </td>
                          <td className="py-3 px-4">{selectedVariant.sku}</td>
                        </tr>
                      )}
                      {selectedColor && (
                        <tr className="border-b border-gray-100 dark:border-white/5">
                          <td className="py-3 px-4 font-bold text-menuHeading dark:text-white w-1/3 bg-gray-50 dark:bg-[#121429]">
                            Selected Color
                          </td>
                          <td className="py-3 px-4">{selectedColor}</td>
                        </tr>
                      )}
                      {selectedSize && (
                        <tr className="border-b border-gray-100 dark:border-white/5">
                          <td className="py-3 px-4 font-bold text-menuHeading dark:text-white w-1/3 bg-gray-50 dark:bg-[#121429]">
                            Selected Size
                          </td>
                          <td className="py-3 px-4">{selectedSize}</td>
                        </tr>
                      )}
                      {selectedRam && (
                        <tr className="border-b border-gray-100 dark:border-white/5">
                          <td className="py-3 px-4 font-bold text-menuHeading dark:text-white w-1/3 bg-gray-50 dark:bg-[#121429]">
                            Memory (RAM)
                          </td>
                          <td className="py-3 px-4">{selectedRam}</td>
                        </tr>
                      )}
                      {selectedStorage && (
                        <tr className="border-b border-gray-100 dark:border-white/5">
                          <td className="py-3 px-4 font-bold text-menuHeading dark:text-white w-1/3 bg-gray-50 dark:bg-[#121429]">
                            Storage
                          </td>
                          <td className="py-3 px-4">{selectedStorage}</td>
                        </tr>
                      )}
                      <tr>
                        <td className="py-3 px-4 font-bold text-menuHeading dark:text-white w-1/3 bg-gray-50 dark:bg-[#121429]">
                          Stock Availability
                        </td>
                        <td className="py-3 px-4">
                          {currentStock > 0
                            ? `${currentStock} items in stock`
                            : "Out of stock"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4 animate-fade-in">
                <p>
                  We strive to process and dispatch all orders within 24 hours.
                  Enjoy fast, reliable delivery right to your doorstep.
                </p>
                <div className="space-y-2">
                  <h4 className="font-bold text-menuHeading dark:text-white">
                    Shipping Options:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-header/80 dark:text-white/70">
                    <li>
                      Standard Delivery (3-5 business days): $5.00 or FREE on
                      orders over $50
                    </li>
                    <li>Express Delivery (1-2 business days): $15.00</li>
                  </ul>
                </div>
                <div className="space-y-2 pt-2">
                  <h4 className="font-bold text-menuHeading dark:text-white">
                    Return & Refund Policy:
                  </h4>
                  <p className="text-sm">
                    Not satisfied with your purchase? Return any item within 30
                    days of delivery in original condition for a full refund or
                    exchange.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetails;
