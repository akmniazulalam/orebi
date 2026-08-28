import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

const ToggleButtons = ({ isOpen, onClose, closeMobileNav }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleItemClick = () => {
    if (onClose) {
      onClose();
    }
    if (closeMobileNav) {
      closeMobileNav();
    }
  };

  const handleLogout = async () => {
    handleItemClick();
    await logout();
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 absolute right-0 transition-all duration-300 top-10 animate-slide shadow-xl rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#121429] overflow-hidden min-w-[200px]">
      {user ? (
        <div className="divide-y divide-gray-100 dark:divide-white/10">
          <Link
            to="/account"
            onClick={handleItemClick}
            className="block font-dmSans font-bold text-sm text-menuHeading dark:text-white py-3.5 px-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
            My Account
          </Link>
          <Link
            to="/orders"
            onClick={handleItemClick}
            className="block font-dmSans font-medium text-sm text-menuHeading dark:text-white py-3.5 px-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
            My Orders
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-full text-left font-dmSans font-medium text-sm text-red-600 dark:text-red-400 py-3.5 px-5 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer">
            Log Out
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-100 dark:divide-white/10">
          <Link
            to="/login"
            onClick={handleItemClick}
            className="block font-dmSans font-bold text-sm text-menuHeading dark:text-white py-3.5 px-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
            Log In
          </Link>
          <Link
            to="/signup"
            onClick={handleItemClick}
            className="block font-dmSans font-medium text-sm text-header dark:text-gray-300 py-3.5 px-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer">
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default ToggleButtons;
