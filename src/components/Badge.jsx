import React from "react";

const Badge = ({ className = "", badgeT = "" }) => {
  if (!badgeT) return null;

  let bgClass = "bg-menuHeading text-white dark:bg-white dark:text-[#262626]"; // default / New

  const lower = String(badgeT).toLowerCase();
  if (lower.includes("%") || lower.includes("off")) {
    bgClass = "bg-rose-600 text-white dark:bg-rose-500";
  } else if (lower === "sale" || lower === "hot deal") {
    bgClass = "bg-amber-500 text-white dark:bg-amber-600";
  } else if (lower.includes("bestseller") || lower.includes("best seller")) {
    bgClass = "bg-menuHeading text-white dark:bg-white dark:text-[#262626]";
  }

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-3.5 py-1 text-xs font-bold font-dmSans tracking-wide shadow-sm select-none ${bgClass} ${className}`}>
      {badgeT}
    </span>
  );
};

export default Badge;