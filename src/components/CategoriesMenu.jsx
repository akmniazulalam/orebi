import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  return (
    <>
      {isOpen && (
        <div
          className={`w-65.75 z-10 absolute left-0 transition-all duration-300 bg-menuHeading dark:bg-[#262626] animate-slide`}>
          {categories.map((item) => (
            <button
              key={item._id || item.name}
              type="button"
              onClick={() => handleCategoryClick(item.name)}
              className="w-full text-left py-4.75 px-5.25 border-b-2 border-[#2D2D2D] flex justify-between items-center font-dmSans text-sm text-white opacity-70 hover:opacity-100 hover:font-bold hover:pl-9 transition-all duration-300 cursor-pointer focus:outline-none focus-visible:opacity-100">
              {item.name} <span>&#62;</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default CategoriesMenu;
