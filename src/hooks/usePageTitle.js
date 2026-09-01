import { useEffect } from "react";

const BRAND = "Orebi";

/**
 * usePageTitle – sets document.title reactively for the current page.
 *
 * Usage:
 *   usePageTitle("Home");
 *   // → sets "Orebi — Home"
 *
 *   usePageTitle("Samsung Galaxy S26 Ultra", true);
 *   // → sets "Samsung Galaxy S26 Ultra — Orebi"
 *   //   (product-first format for detail pages)
 *
 * @param {string} title   – Page or product name.
 * @param {boolean} [productFirst=false] – When true, formats as "{title} — Orebi"
 *                                         instead of "Orebi — {title}".
 */
const usePageTitle = (title, productFirst = false) => {
  useEffect(() => {
    if (!title) {
      document.title = BRAND;
      return;
    }

    document.title = productFirst
      ? `${title} — ${BRAND}`
      : `${BRAND} — ${title}`;

    // Restore brand-only title on unmount so stale titles never leak
    return () => {
      document.title = BRAND;
    };
  }, [title, productFirst]);
};

export default usePageTitle;
