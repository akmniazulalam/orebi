import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Headphones,
  Laptop,
  Smartphone,
  Watch,
  Mouse,
  Sparkles,
  Search,
  X,
  Clock,
  Calendar,
  User,
  Share2,
  BookOpen,
  CheckCircle2,
  ShoppingBag,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import toast from "react-hot-toast";
import Container from "../Container";
import Intro from "../Intro";
import { JOURNAL_CATEGORIES, JOURNAL_ARTICLES } from "@/data/journalData";

const CATEGORY_ICONS = {
  all: Sparkles,
  audio: Headphones,
  laptops: Laptop,
  smartphones: Smartphone,
  accessories: Mouse,
  smartwatches: Watch,
};

const Journal = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveArticle(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when reading modal is open
  useEffect(() => {
    if (activeArticle) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeArticle]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: JOURNAL_ARTICLES.length };
    JOURNAL_ARTICLES.forEach((article) => {
      const key = article.categoryQuery.toLowerCase();
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return JOURNAL_ARTICLES.filter((article) => {
      const matchesCategory =
        selectedCategory === "all" ||
        article.categoryQuery.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesSearch =
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Featured article: if viewing all and no search query, use the main featured one.
  // Otherwise, use the first article in filtered list if available.
  const featuredArticle = useMemo(() => {
    if (selectedCategory === "all" && !searchQuery.trim()) {
      return JOURNAL_ARTICLES.find((a) => a.featured) || JOURNAL_ARTICLES[0];
    }
    return filteredArticles.length > 0 ? filteredArticles[0] : null;
  }, [selectedCategory, searchQuery, filteredArticles]);

  // Grid articles (exclude the featured one if viewing default all view to avoid visual duplicate)
  const gridArticles = useMemo(() => {
    if (selectedCategory === "all" && !searchQuery.trim() && featuredArticle) {
      return filteredArticles.filter((a) => a.id !== featuredArticle.id);
    }
    return filteredArticles;
  }, [selectedCategory, searchQuery, featuredArticle, filteredArticles]);

  // Newsletter submission
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = newsletterEmail.trim();

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubmittingNewsletter(true);
    setTimeout(() => {
      setIsSubmittingNewsletter(false);
      setNewsletterEmail("");
      toast.success("Thank you for subscribing to Orebi Journal!");
    }, 400);
  };

  // Share article link
  const handleShareArticle = (article) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Journal link copied to clipboard!");
    } else {
      toast.success("Ready to share: " + article.title);
    }
  };

  return (
    <>
      <Intro text="Journal" pText="Journal" />

      {/* Main page wrapper adhering to Orebi theme tokens */}
      <div className="bg-background text-foreground font-dmSans pb-16 pt-4">
        <Container className="space-y-16 sm:space-y-20 lg:space-y-24">
          {/* ================= 1. JOURNAL HERO ================= */}
          <section className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121429] p-8 sm:p-12 lg:p-16 shadow-sm dark:shadow-2xl">
            {/* Subtle ambient glow in dark mode */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full bg-indigo-600/10 blur-[100px]" />
            <div className="pointer-events-none absolute left-1/3 bottom-0 h-64 w-64 rounded-full bg-purple-600/10 blur-[90px]" />

            <div className="relative z-10 max-w-3xl space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                <Sparkles className="h-3.5 w-3.5" />
                OREBI JOURNAL
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-menuHeading sm:text-4xl lg:text-5xl xl:text-6xl leading-[1.15]">
                Ideas, insights & inspiration for better tech.
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-header dark:text-slate-300 leading-relaxed font-normal">
                In-depth buying guides, hardware breakdowns, ergonomic workspace
                setups, and expert perspectives curated by the Orebi team to
                help you make smarter technology choices.
              </p>

              {/* Search and Quick Filters Bar */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-header/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search guides, topics & keywords..."
                    className="h-11 w-full rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121429] pl-11 pr-10 text-xs sm:text-sm text-menuHeading placeholder:text-header/60 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-header/60 hover:text-menuHeading"
                      aria-label="Clear search">
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <a
                  href="#articles-feed"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] px-6 py-3 text-xs font-semibold shadow-sm hover:opacity-90 transition">
                  Browse Articles <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </section>

          {/* ================= 2. FEATURED STORY ================= */}
          {featuredArticle && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 block">
                    FEATURED STORY
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-menuHeading">
                    Editor's Highlight
                  </h2>
                </div>
                <button
                  onClick={() => setActiveArticle(featuredArticle)}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-500 dark:text-indigo-400 hover:underline">
                  Read complete story <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              {/* Horizontal Featured Editorial Card */}
              <div
                onClick={() => setActiveArticle(featuredArticle)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121429] shadow-sm dark:shadow-xl transition duration-300 hover:border-indigo-500/50 hover:shadow-md dark:hover:shadow-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left/Image Area */}
                  <div className="relative aspect-16/10 sm:aspect-video lg:aspect-auto lg:col-span-7 overflow-hidden bg-gray-100 dark:bg-[#121429]">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-4 left-4">
                      <span className="rounded-full bg-black/70 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                        {featuredArticle.category} • Featured
                      </span>
                    </div>
                  </div>

                  {/* Right/Content Area */}
                  <div className="p-6 sm:p-10 lg:p-12 lg:col-span-5 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-xs text-header dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {featuredArticle.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {featuredArticle.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-menuHeading leading-snug group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                        {featuredArticle.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-header dark:text-slate-300 leading-relaxed font-normal">
                        {featuredArticle.excerpt}
                      </p>

                      {/* Tag badges */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {featuredArticle.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-gray-100 dark:bg-[#121429] px-2.5 py-0.5 text-[11px] font-medium text-header dark:text-slate-400">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-indigo-600/20 text-indigo-500 dark:text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xs font-bold">
                          {featuredArticle.author.avatar}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-menuHeading">
                            {featuredArticle.author.name}
                          </p>
                          <p className="text-[10px] text-header dark:text-slate-400">
                            {featuredArticle.author.role}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-500 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                        Read Story <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ================= 3. EXPLORE BY CATEGORY ================= */}
          <section id="articles-feed" className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 dark:border-white/10 pb-6">
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 block">
                  EXPLORE BY CATEGORY
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-menuHeading">
                  Curated Tech Editorial
                </h2>
              </div>

              {/* Active Results info */}
              <div className="text-xs text-header dark:text-slate-400">
                Showing{" "}
                <span className="font-bold text-menuHeading">
                  {filteredArticles.length}
                </span>{" "}
                {filteredArticles.length === 1 ? "article" : "articles"}
                {selectedCategory !== "all" && (
                  <span>
                    {" "}
                    in{" "}
                    <span className="font-semibold text-indigo-500 dark:text-indigo-400 capitalize">
                      {selectedCategory}
                    </span>
                  </span>
                )}
                {searchQuery && (
                  <span>
                    {" "}
                    matching "<span className="font-semibold">{searchQuery}</span>"
                  </span>
                )}
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
              {JOURNAL_CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.id] || Sparkles;
                const isSelected = selectedCategory === cat.id;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                      isSelected
                        ? "bg-menuHeading text-white dark:bg-white dark:text-[#262626] shadow-sm"
                        : "bg-gray-100 dark:bg-[#121429] text-header dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-menuHeading"
                    }`}>
                    <Icon
                      className={`h-3.5 w-3.5 ${
                        isSelected
                          ? "text-indigo-400 dark:text-indigo-600"
                          : "text-indigo-500 dark:text-indigo-400"
                      }`}
                    />
                    <span>{cat.name}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        isSelected
                          ? "bg-white/20 dark:bg-black/10 text-white dark:text-[#262626]"
                          : "bg-gray-200 dark:bg-white/10 text-header dark:text-slate-400"
                      }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* ================= 4. ARTICLE GRID ================= */}
            {gridArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 pt-2">
                {gridArticles.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => setActiveArticle(article)}
                    className="group flex flex-col justify-between rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121429] p-5 sm:p-6 shadow-sm dark:shadow-xl transition duration-300 hover:border-indigo-500/50 hover:shadow-md dark:hover:shadow-2xl cursor-pointer">
                    <div className="space-y-4">
                      {/* Image container */}
                      <div className="relative aspect-16/10 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-[#121429]">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="rounded-full bg-black/70 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                            {article.category}
                          </span>
                        </div>
                      </div>

                      {/* Meta */}
                      <div className="flex items-center gap-2 text-[11px] text-header dark:text-slate-400 font-medium">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-bold text-menuHeading line-clamp-2 leading-snug group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-header dark:text-slate-400 line-clamp-3 leading-relaxed font-normal">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Footer / CTA */}
                    <div className="pt-4 mt-6 border-t border-gray-100 dark:border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center text-[10px] font-bold">
                          {article.author.avatar}
                        </div>
                        <span className="text-xs text-header dark:text-slate-400 font-medium">
                          {article.author.name}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-500 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              /* ================= 7. EMPTY STATE ================= */
              <div className="py-16 text-center rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121429] p-8 shadow-sm">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 dark:text-indigo-400 mb-4">
                  <BookOpen className="h-8 w-8" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-menuHeading mb-2">
                  No articles found
                </h3>
                <p className="text-xs sm:text-sm text-header dark:text-slate-400 max-w-md mx-auto mb-6">
                  We couldn't find any journal stories matching your current
                  selection. Try searching with different keywords or resetting
                  your category filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchQuery("");
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] px-6 py-2.5 text-xs font-semibold shadow-sm hover:opacity-90 transition">
                  View All Topics
                </button>
              </div>
            )}
          </section>

          {/* ================= 6. NEWSLETTER / CTA SECTION ================= */}
          <section className="relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10 bg-linear-to-br from-gray-50 via-white to-gray-100 dark:from-[#121429] dark:via-[#161833] dark:to-[#0D0F1F] p-8 sm:p-12 lg:p-16 shadow-sm dark:shadow-2xl">
            <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400 block">
                  NEWSLETTER & INSIGHTS
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-menuHeading">
                  Stay ahead of what's next in tech.
                </h2>
                <p className="text-xs sm:text-sm text-header dark:text-slate-300 leading-relaxed max-w-xl font-normal">
                  Join over 15,000 technology enthusiasts who receive our weekly
                  digest featuring exclusive hardware buying guides, desk setup
                  inspirations, and curated gear reviews.
                </p>
              </div>

              <div className="lg:col-span-5">
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="h-12 w-full rounded-full border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121429] px-5 text-xs sm:text-sm text-menuHeading placeholder:text-header/60 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
                  />
                  <button
                    type="submit"
                    disabled={isSubmittingNewsletter}
                    className="h-12 w-full sm:w-auto shrink-0 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] px-8 text-xs font-bold shadow-md hover:opacity-90 transition disabled:opacity-50 cursor-pointer">
                    {isSubmittingNewsletter ? "Subscribing..." : "Subscribe"}
                  </button>
                </form>
                <p className="mt-2.5 text-[11px] text-header/70 dark:text-slate-500 text-center sm:text-left">
                  Zero spam. Unsubscribe anytime with one click.
                </p>
              </div>
            </div>
          </section>
        </Container>
      </div>

      {/* ================= ARTICLE READER MODAL ================= */}
      {activeArticle && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveArticle(null)}>
          <div
            className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121429] p-6 sm:p-10 shadow-2xl text-foreground"
            onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-6 right-6 h-9 w-9 rounded-full bg-gray-100 dark:bg-white/10 text-menuHeading hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center transition cursor-pointer"
              aria-label="Close article">
              <X className="h-5 w-5" />
            </button>

            {/* Article Header */}
            <div className="space-y-4 pr-10">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {activeArticle.category}
                </span>
                <span className="text-header dark:text-slate-400">•</span>
                <span className="text-header dark:text-slate-400">
                  {activeArticle.date}
                </span>
                <span className="text-header dark:text-slate-400">•</span>
                <span className="text-header dark:text-slate-400">
                  {activeArticle.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-menuHeading leading-snug">
                {activeArticle.title}
              </h2>

              {/* Author Row */}
              <div className="flex items-center gap-3 pt-2">
                <div className="h-10 w-10 rounded-full bg-indigo-600/20 text-indigo-500 dark:text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-xs font-bold">
                  {activeArticle.author.avatar}
                </div>
                <div>
                  <p className="text-xs font-bold text-menuHeading">
                    {activeArticle.author.name}
                  </p>
                  <p className="text-[11px] text-header dark:text-slate-400">
                    {activeArticle.author.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="my-8 aspect-video w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#121429]">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Article Body Content */}
            <div className="space-y-6 text-sm sm:text-base text-header dark:text-slate-300 leading-relaxed font-normal">
              <p className="text-base sm:text-lg font-medium text-menuHeading leading-relaxed">
                {activeArticle.content.intro}
              </p>

              {activeArticle.content.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2 pt-2">
                  <h4 className="text-lg font-bold text-menuHeading">
                    {sec.heading}
                  </h4>
                  <p>{sec.body}</p>
                </div>
              ))}

              {/* Key Takeaways Box */}
              {activeArticle.content.keyTakeaways && (
                <div className="rounded-2xl border border-indigo-500/20 bg-indigo-50/50 dark:bg-indigo-950/20 p-6 space-y-3 my-6">
                  <h5 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
                    KEY TAKEAWAYS FOR BUYERS
                  </h5>
                  <ul className="space-y-2.5">
                    {activeArticle.content.keyTakeaways.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-menuHeading">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-indigo-500 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="pt-2">{activeArticle.content.conclusion}</p>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleShareArticle(activeArticle)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 dark:border-white/10 px-5 py-2.5 text-xs font-semibold text-menuHeading hover:bg-gray-100 dark:hover:bg-white/5 transition w-full sm:w-auto cursor-pointer">
                  <Share2 className="h-3.5 w-3.5" /> Share Article
                </button>
              </div>

              <Link
                to={`/shop?category=${encodeURIComponent(activeArticle.categoryQuery)}`}
                onClick={() => setActiveArticle(null)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] px-6 py-2.5 text-xs font-bold shadow-md hover:opacity-90 transition w-full sm:w-auto">
                <ShoppingBag className="h-3.5 w-3.5" /> Shop {activeArticle.category} Gear
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Journal;