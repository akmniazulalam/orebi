import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import apiClient from "@/lib/apiClient";
import { apiPaths } from "@/lib/productApi";

const CategoriesMenu = ({ isOpen, onClose }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get(apiPaths.categories.list)
      .then((res) => setCategories(res.data.data))
      .catch(() => setCategories([]));
  }, []);

  const handleCategoryClick = (categoryName) => {
    if (onClose) onClose();
    navigate(`/shop?category=${encodeURIComponent(categoryName)}&page=1`);
  };

  if (!isOpen) return null;

  return (
    <div className="w-68 z-30 absolute left-0 top-10 transition-all duration-300 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121429] shadow-xl overflow-hidden animate-slide">
      <div className="divide-y divide-gray-100 dark:divide-white/5">
        {categories.map((item) => (
          <button
            key={item._id || item.name}
            type="button"
            onClick={() => handleCategoryClick(item.name)}
            className="w-full text-left py-3 px-5 flex justify-between items-center font-dmSans text-sm text-menuHeading dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 hover:pl-6 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:bg-gray-50 dark:focus-visible:bg-white/5">
            <span className="capitalize">{item.name}</span>
            <ChevronRight className="h-4 w-4 text-header dark:text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesMenu;
