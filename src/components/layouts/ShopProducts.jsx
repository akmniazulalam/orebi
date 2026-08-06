import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  PackageSearch,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCart from "@/store/cart";
import { buildCartLineItem } from "@/lib/cartUtils";
import {
  getPrimaryVariant,
  getUniqueVariantColors,
  getUniqueVariantSizes,
  normalizeProductForDisplay,
} from "@/lib/productUtils";
import {
  fetchCategories,
  fetchProducts,
  fetchProductsWithMeta,
} from "@/services/productService";

const SORT_OPTIONS = [
  { value: "latest", label: "Latest" },
  { value: "oldest", label: "Oldest" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "price-asc", label: "Price Low to High" },
  { value: "price-desc", label: "Price High to Low" },
  { value: "stock-asc", label: "Stock Low to High" },
  { value: "stock-desc", label: "Stock High to Low" },
];

const LIMIT_OPTIONS = [12, 24, 36, 48];

const STOCK_OPTIONS = [
  { value: "all", label: "All stock" },
  { value: "in-stock", label: "In stock" },
  { value: "out-of-stock", label: "Out of stock" },
];

const DEFAULT_QUERY = {
  search: "",
  category: "",
  sort: "latest",
  page: 1,
  limit: 12,
  minPrice: "",
  maxPrice: "",
  stock: "all",
};

function toPositiveInt(value, fallback) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function parseQuery(searchParams) {
  return {
    search: searchParams.get("search") || DEFAULT_QUERY.search,
    category: searchParams.get("category") || DEFAULT_QUERY.category,
    sort: searchParams.get("sort") || DEFAULT_QUERY.sort,
    page: toPositiveInt(searchParams.get("page"), DEFAULT_QUERY.page),
    limit: LIMIT_OPTIONS.includes(Number(searchParams.get("limit")))
      ? Number(searchParams.get("limit"))
      : DEFAULT_QUERY.limit,
    minPrice: searchParams.get("minPrice") || DEFAULT_QUERY.minPrice,
    maxPrice: searchParams.get("maxPrice") || DEFAULT_QUERY.maxPrice,
    stock: searchParams.get("stock") || DEFAULT_QUERY.stock,
  };
}

function buildApiParams(query) {
  const params = {
    page: query.page,
    limit: query.limit,
    sort: query.sort,
  };

  if (query.search) params.search = query.search;
  if (query.category) params.category = query.category;
  if (query.minPrice) params.minPrice = query.minPrice;
  if (query.maxPrice) params.maxPrice = query.maxPrice;
  if (query.stock !== "all") params.stock = query.stock;

  return params;
}

function getProductStock(product) {
  return (product.variants || []).reduce(
    (sum, variant) => sum + (Number(variant.stock) || 0),
    0,
  );
}

function getProductCategories(categories, products) {
  const counts = new Map();

  for (const product of products) {
    const category = product?.category?.trim();
    if (!category) continue;

    const key = category.toLowerCase();
    const existing = counts.get(key);
    counts.set(key, {
      name: existing?.name || category,
      count: (existing?.count || 0) + 1,
    });
  }

  for (const category of categories) {
    const name = category?.name?.trim();
    if (!name) continue;

    const key = name.toLowerCase();
    const existing = counts.get(key);
    counts.set(key, {
      name,
      count: existing?.count || 0,
    });
  }

  return Array.from(counts.values()).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

function getPageNumbers(currentPage, totalPages) {
  const windowSize = 5;
  const start = Math.max(1, currentPage - Math.floor(windowSize / 2));
  const end = Math.min(totalPages, start + windowSize - 1);
  const adjustedStart = Math.max(1, end - windowSize + 1);

  return Array.from(
    { length: end - adjustedStart + 1 },
    (_, index) => adjustedStart + index,
  );
}

function FilterPanel({
  categories,
  query,
  priceDraft,
  onPriceDraftChange,
  onFilterChange,
  onApplyPrice,
  onClearFilters,
}) {
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-dmSans text-lg font-bold text-menuHeading">
            Filters
          </h2>
          <p className="mt-1 font-dmSans text-sm text-header/60">
            Refine the catalog
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className={"cursor-pointer"}>
          Clear
        </Button>
      </div>

      <section aria-labelledby="category-filter-heading">
        <h3
          id="category-filter-heading"
          className="font-dmSans text-sm font-bold uppercase tracking-[0.12em] text-menuHeading">
          Category
        </h3>
        <div className="mt-3 space-y-2">
          <button
            type="button"
            onClick={() => onFilterChange({ category: "" })}
            className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left font-dmSans text-sm transition ${
              !query.category
                ? "border-menuHeading bg-menuHeading text-white dark:text-[#262626]"
                : "border-infoBg text-header hover:border-menuHeading"
            }`}>
            <span>All categories</span>
          </button>
          {categories.map((category) => {
            const selected =
              query.category.toLowerCase() === category.name.toLowerCase();

            return (
              <button
                key={category.name}
                type="button"
                onClick={() => onFilterChange({ category: category.name })}
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left font-dmSans text-sm transition ${
                  selected
                    ? "border-menuHeading bg-menuHeading text-white dark:text-[#262626]"
                    : "border-infoBg text-header hover:border-menuHeading"
                }`}>
                <span className="truncate">{category.name}</span>
                <span
                  className={`ml-3 rounded-full px-2 py-0.5 text-xs ${
                    selected
                      ? "bg-white/20"
                      : "bg-infoBg text-header/70 dark:bg-white/10"
                  }`}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="price-filter-heading">
        <h3
          id="price-filter-heading"
          className="font-dmSans text-sm font-bold uppercase tracking-[0.12em] text-menuHeading">
          Price Range
        </h3>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <label className="space-y-1">
            <span className="font-dmSans text-xs text-header/60">Min</span>
            <Input
              type="number"
              min="0"
              value={priceDraft.minPrice}
              aria-label="Minimum price"
              placeholder="0"
              className="h-10"
              onChange={(event) =>
                onPriceDraftChange((current) => ({
                  ...current,
                  minPrice: event.target.value,
                }))
              }
            />
          </label>
          <label className="space-y-1">
            <span className="font-dmSans text-xs text-header/60">Max</span>
            <Input
              type="number"
              min="0"
              value={priceDraft.maxPrice}
              aria-label="Maximum price"
              placeholder="500"
              className="h-10"
              onChange={(event) =>
                onPriceDraftChange((current) => ({
                  ...current,
                  maxPrice: event.target.value,
                }))
              }
            />
          </label>
        </div>
        <Button
          type="button"
          variant="outline"
          className="mt-3 h-10 w-full cursor-pointer"
          onClick={onApplyPrice}>
          Apply price
        </Button>
      </section>

      <section aria-labelledby="stock-filter-heading">
        <h3
          id="stock-filter-heading"
          className="font-dmSans text-sm font-bold uppercase tracking-[0.12em] text-menuHeading">
          Stock Status
        </h3>
        <div className="mt-3 grid gap-2">
          {STOCK_OPTIONS.map((option) => {
            const selected = query.stock === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => onFilterChange({ stock: option.value })}
                className={`rounded-xl border px-3 py-2.5 text-left font-dmSans text-sm cursor-pointer transition ${
                  selected
                    ? "border-menuHeading bg-menuHeading text-white dark:text-[#262626]"
                    : "border-infoBg text-header hover:border-menuHeading"
                }`}>
                {option.label}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function ActiveFilters({ query, onFilterChange, onClearFilters }) {
  const filters = [];

  if (query.search) filters.push({ key: "search", label: `Search: ${query.search}` });
  if (query.category) filters.push({ key: "category", label: query.category });
  if (query.minPrice || query.maxPrice) {
    filters.push({
      key: "price",
      label: `$${query.minPrice || "0"} - ${query.maxPrice ? `$${query.maxPrice}` : "Any"}`,
    });
  }
  if (query.stock !== "all") {
    filters.push({
      key: "stock",
      label: STOCK_OPTIONS.find((option) => option.value === query.stock)?.label,
    });
  }
  if (query.sort !== DEFAULT_QUERY.sort) {
    filters.push({
      key: "sort",
      label: SORT_OPTIONS.find((option) => option.value === query.sort)?.label,
    });
  }

  if (!filters.length) return null;

  const clearFilter = (key) => {
    if (key === "price") {
      onFilterChange({ minPrice: "", maxPrice: "" });
      return;
    }

    onFilterChange({ [key]: DEFAULT_QUERY[key] });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          onClick={() => clearFilter(filter.key)}
          className="inline-flex items-center gap-1.5 rounded-full border border-infoBg bg-white px-3 py-1.5 font-dmSans text-xs text-header shadow-sm transition hover:border-menuHeading dark:bg-white/5">
          {filter.label}
          <X className="h-3.5 w-3.5" />
        </button>
      ))}
      <Button type="button" variant="ghost" size="sm" onClick={onClearFilters} className={"cursor-pointer"}>
        Clear all
      </Button>
    </div>
  );
}

function ProductCard({ product }) {
  const addToCart = useCart((state) => state.addToCart);
  const display = normalizeProductForDisplay(product);
  const totalStock = getProductStock(product);
  const primaryVariant = getPrimaryVariant(product.variants);
  const colors = getUniqueVariantColors(product.variants).slice(0, 4);
  const { sizes, hasMore } = getUniqueVariantSizes(product.variants, 3);
  const isOutOfStock = totalStock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error("This product is currently out of stock");
      return;
    }

    addToCart(buildCartLineItem(product, primaryVariant));
    toast.success("Added to cart");
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-infoBg bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-white/5">
      <div className="relative aspect-[4/5] overflow-hidden bg-infoBg">
        {display.image ? (
          <img
            src={display.image}
            alt={display.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-header/40">
            <PackageSearch className="h-10 w-10" />
          </div>
        )}

        {display.badge ? (
          <span className="absolute left-3 top-3 rounded-full bg-menuHeading px-3 py-1 font-dmSans text-xs font-bold text-white dark:text-[#262626]">
            {display.badge}
          </span>
        ) : null}

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 font-dmSans text-xs font-bold ${
            isOutOfStock
              ? "bg-red-500 text-white"
              : "bg-white/90 text-menuHeading dark:text-[#262626] shadow-sm"
          }`}>
          {isOutOfStock ? "Out of stock" : `${totalStock} in stock`}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="min-w-0">
          <p className="font-dmSans text-xs uppercase tracking-[0.12em] text-header/50">
            {display.category || "Uncategorized"}
          </p>
          <h3 className="mt-1 line-clamp-2 min-h-12 font-dmSans text-lg font-bold text-menuHeading">
            {display.name}
          </h3>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <p className="font-dmSans text-base font-bold text-menuHeading">
            {display.price}
          </p>
          {display.variantCount > 0 ? (
            <span className="rounded-full bg-infoBg px-2.5 py-1 font-dmSans text-xs text-header/70 dark:bg-white/10">
              {display.variantCount} variant{display.variantCount === 1 ? "" : "s"}
            </span>
          ) : null}
        </div>

        {(colors.length > 0 || sizes.length > 0) && (
          <div className="mt-4 space-y-2">
            {colors.length > 0 ? (
              <div className="flex flex-wrap gap-1.5" aria-label="Available colors">
                {colors.map((color) => (
                  <span
                    key={color}
                    className="rounded-full border border-infoBg px-2 py-1 font-dmSans text-[11px] text-header/70">
                    {color}
                  </span>
                ))}
              </div>
            ) : null}
            {sizes.length > 0 ? (
              <div className="flex flex-wrap gap-1.5" aria-label="Available sizes">
                {sizes.map((size) => (
                  <span
                    key={size}
                    className="rounded-full bg-infoBg px-2 py-1 font-dmSans text-[11px] text-header/70 dark:bg-white/10">
                    {size}
                  </span>
                ))}
                {hasMore ? (
                  <span className="rounded-full bg-infoBg px-2 py-1 font-dmSans text-[11px] text-header/70 dark:bg-white/10">
                    More
                  </span>
                ) : null}
              </div>
            ) : null}
          </div>
        )}

        <div className="mt-auto grid grid-cols-2 gap-2 pt-5">
          <Button asChild variant="outline" className="h-10">
            <Link to={display.detailPath || `/productdetails/${display.id}`} className="flex items-center justify-center gap-2">
              <Eye className="h-4 w-4" />
              Details
            </Link>
          </Button>
          <Button
            type="button"
            className="h-10 cursor-pointer"
            disabled={isOutOfStock}
            onClick={handleAddToCart}>
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </article>
  );
}

function ProductSkeletonGrid({ count = 12 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-infoBg bg-white shadow-sm dark:bg-white/5">
          <div className="aspect-[4/5] animate-pulse bg-infoBg" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-24 animate-pulse rounded bg-infoBg" />
            <div className="h-5 w-4/5 animate-pulse rounded bg-infoBg" />
            <div className="h-4 w-28 animate-pulse rounded bg-infoBg" />
            <div className="flex gap-2">
              <div className="h-6 w-16 animate-pulse rounded-full bg-infoBg" />
              <div className="h-6 w-16 animate-pulse rounded-full bg-infoBg" />
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="h-10 animate-pulse rounded-lg bg-infoBg" />
              <div className="h-10 animate-pulse rounded-lg bg-infoBg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const ShopProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = useMemo(() => parseQuery(searchParams), [searchParams]);
  const [searchInput, setSearchInput] = useState(query.search);
  const [priceDraft, setPriceDraft] = useState({
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
  });
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMetaLoading, setIsMetaLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateQuery = useCallback(
    (updates, { resetPage = true, replace = false } = {}) => {
      const next = new URLSearchParams(searchParams);
      const merged = { ...query, ...updates };

      for (const [key, value] of Object.entries(updates)) {
        const normalized = value === undefined || value === null ? "" : String(value);
        if (!normalized || (key === "stock" && normalized === "all")) {
          next.delete(key);
        } else {
          next.set(key, normalized);
        }
      }

      if (resetPage) {
        next.set("page", "1");
      }

      next.set("limit", String(merged.limit || DEFAULT_QUERY.limit));
      next.set("sort", merged.sort || DEFAULT_QUERY.sort);

      setSearchParams(next, { replace });
    },
    [query, searchParams, setSearchParams],
  );

  const clearFilters = useCallback(() => {
    setSearchInput("");
    setPriceDraft({ minPrice: "", maxPrice: "" });
    setSearchParams(
      {
        page: "1",
        limit: String(DEFAULT_QUERY.limit),
        sort: DEFAULT_QUERY.sort,
      },
      { replace: false },
    );
  }, [setSearchParams]);

  useEffect(() => {
    setSearchInput(query.search);
    setPriceDraft({
      minPrice: query.minPrice,
      maxPrice: query.maxPrice,
    });
  }, [query.search, query.minPrice, query.maxPrice]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (searchInput !== query.search) {
        updateQuery({ search: searchInput.trim() }, { replace: true });
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [query.search, searchInput, updateQuery]);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await fetchProductsWithMeta(buildApiParams(query));
      setProducts(result.products);
      setMeta(result.meta);
    } catch (err) {
      setProducts([]);
      setMeta(null);
      setError(
        err?.response?.data?.message ||
          "We could not load products right now. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    let mounted = true;

    Promise.all([fetchCategories(), fetchProducts()])
      .then(([categoryList, productList]) => {
        if (!mounted) return;
        setCategories(Array.isArray(categoryList) ? categoryList : []);
        setAllProducts(Array.isArray(productList) ? productList : []);
      })
      .catch(() => {
        if (mounted) {
          setCategories([]);
          setAllProducts([]);
        }
      })
      .finally(() => {
        if (mounted) setIsMetaLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const categoryOptions = useMemo(
    () => getProductCategories(categories, allProducts),
    [categories, allProducts],
  );

  const totalProducts = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 1;
  const pageNumbers = useMemo(
    () => getPageNumbers(query.page, totalPages),
    [query.page, totalPages],
  );

  const applyPrice = () => {
    updateQuery({
      minPrice: priceDraft.minPrice,
      maxPrice: priceDraft.maxPrice,
    });
  };

  const showingFrom = totalProducts === 0 ? 0 : (query.page - 1) * query.limit + 1;
  const showingTo = Math.min(query.page * query.limit, totalProducts);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-infoBg bg-white p-4 shadow-sm sm:p-5 lg:p-6 dark:bg-white/5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="font-dmSans text-sm font-bold uppercase tracking-[0.18em] text-header/50">
              Shop
            </p>
            <h1 className="mt-2 font-dmSans text-2xl font-bold text-menuHeading sm:text-3xl">
              Discover your next favorite product
            </h1>
            <p className="mt-2 max-w-2xl font-dmSans text-sm text-header/60">
              Search, filter, and sort live inventory from the store catalog.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:min-w-[560px]">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-header/45" />
              <Input
                value={searchInput}
                aria-label="Search products"
                placeholder="Search products, categories, SKU..."
                className="h-11 rounded-xl pl-10 pr-10 font-dmSans"
                onChange={(event) => setSearchInput(event.target.value)}
              />
              {searchInput ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setSearchInput("");
                    updateQuery({ search: "" });
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-header/50 transition hover:bg-infoBg hover:text-menuHeading">
                  <X className="h-4 w-4" />
                </button>
              ) : null}
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-11 justify-center lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}>
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-6 rounded-3xl border border-infoBg bg-white p-5 shadow-sm dark:bg-white/5">
            <FilterPanel
              categories={categoryOptions}
              query={query}
              priceDraft={priceDraft}
              onPriceDraftChange={setPriceDraft}
              onFilterChange={updateQuery}
              onApplyPrice={applyPrice}
              onClearFilters={clearFilters}
            />
          </div>
        </aside>

        <section className="min-w-0 space-y-5" aria-label="Product results">
          <div className="flex flex-col gap-4 rounded-2xl border border-infoBg bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between dark:bg-white/5">
            <div className="min-w-0">
              <p className="font-dmSans text-sm font-bold text-menuHeading">
                {isLoading
                  ? "Loading products..."
                  : `${totalProducts} product${totalProducts === 1 ? "" : "s"} found`}
              </p>
              <p className="mt-1 font-dmSans text-sm text-header/60">
                {isLoading
                  ? "Keeping the layout ready while products load."
                  : `Showing ${showingFrom}-${showingTo} of ${totalProducts}`}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="flex items-center gap-2 font-dmSans text-sm text-header/70">
                Sort
                <Select
                  value={query.sort}
                  onValueChange={(value) => updateQuery({ sort: value })}>
                  <SelectTrigger className="h-10 w-full min-w-[180px] sm:w-[190px]">
                    <SelectValue placeholder="Sort products" />
                  </SelectTrigger>
                  <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>

              <label className="flex items-center gap-2 font-dmSans text-sm text-header/70">
                Show
                <Select
                  value={String(query.limit)}
                  onValueChange={(value) =>
                    updateQuery({ limit: value }, { resetPage: true })
                  }>
                  <SelectTrigger className="h-10 w-full min-w-[110px] sm:w-[120px]">
                    <SelectValue placeholder="Show" />
                  </SelectTrigger>
                  <SelectContent>
                    {LIMIT_OPTIONS.map((limit) => (
                      <SelectItem key={limit} value={String(limit)}>
                        {limit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
            </div>
          </div>

          <ActiveFilters
            query={query}
            onFilterChange={updateQuery}
            onClearFilters={clearFilters}
          />

          {error ? (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center dark:bg-red-950/20">
              <AlertCircle className="mx-auto h-10 w-10 text-red-500" />
              <h2 className="mt-4 font-dmSans text-xl font-bold text-menuHeading">
                Something went wrong
              </h2>
              <p className="mx-auto mt-2 max-w-md font-dmSans text-sm text-header/60">
                {error}
              </p>
              <Button type="button" className="mt-5" onClick={loadProducts}>
                Retry
              </Button>
            </div>
          ) : isLoading || isMetaLoading ? (
            <ProductSkeletonGrid count={Math.min(query.limit, 12)} />
          ) : products.length === 0 ? (
            <div className="rounded-3xl border border-infoBg bg-white p-10 text-center shadow-sm dark:bg-white/5">
              <PackageSearch className="mx-auto h-12 w-12 text-header/35" />
              <h2 className="mt-4 font-dmSans text-xl font-bold text-menuHeading">
                No products found
              </h2>
              <p className="mx-auto mt-2 max-w-md font-dmSans text-sm text-header/60">
                Try adjusting your search, filters, or price range to see more
                results.
              </p>
              <Button type="button" className="mt-5 cursor-pointer" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          )}

          {!isLoading && !error && totalPages > 1 ? (
            <nav
              className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-infoBg bg-white p-4 shadow-sm sm:flex-row dark:bg-white/5"
              aria-label="Product pagination">
              <p className="font-dmSans text-sm text-header/60">
                Page {query.page} of {totalPages}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={!meta?.hasPrevPage}
                  onClick={() =>
                    updateQuery(
                      { page: Math.max(1, query.page - 1) },
                      { resetPage: false },
                    )
                  }>
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {pageNumbers.map((page) => (
                  <Button
                    key={page}
                    type="button"
                    variant={page === query.page ? "default" : "outline"}
                    aria-current={page === query.page ? "page" : undefined}
                    onClick={() =>
                      updateQuery({ page }, { resetPage: false })
                    }>
                    {page}
                  </Button>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  disabled={!meta?.hasNextPage}
                  onClick={() =>
                    updateQuery(
                      { page: Math.min(totalPages, query.page + 1) },
                      { resetPage: false },
                    )
                  }>
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </nav>
          ) : null}
        </section>
      </div>

      {mobileFiltersOpen ? (
        <div
          className="fixed inset-0 z-50 bg-black/40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Product filters">
          <button
            type="button"
            aria-label="Close filters"
            className="absolute inset-0 h-full w-full cursor-default"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[min(92vw,380px)] overflow-y-auto bg-white p-5 shadow-2xl dark:bg-[#111]">
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-menuHeading" />
                <h2 className="font-dmSans text-lg font-bold text-menuHeading">
                  Filters
                </h2>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close filters"
                onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <FilterPanel
              categories={categoryOptions}
              query={query}
              priceDraft={priceDraft}
              onPriceDraftChange={setPriceDraft}
              onFilterChange={(updates) => {
                updateQuery(updates);
                setMobileFiltersOpen(false);
              }}
              onApplyPrice={() => {
                applyPrice();
                setMobileFiltersOpen(false);
              }}
              onClearFilters={() => {
                clearFilters();
                setMobileFiltersOpen(false);
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ShopProducts;
