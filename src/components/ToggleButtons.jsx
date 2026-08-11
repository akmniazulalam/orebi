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
    <div className="z-50 absolute right-0 transition-all duration-300 top-8.75 animate-slide shadow-lg rounded-b-md overflow-hidden">
      {user ? (
        <>
          <Link
            to="/account"
            onClick={handleItemClick}
            className="block w-50 bg-similarBlack font-dmSans font-bold text-sm text-white text-center py-4 px-6 hover:bg-gray-800 transition cursor-pointer">
            My Account
          </Link>
          <Link
            to="/orders"
            onClick={handleItemClick}
            className="block w-50 bg-white font-dmSans text-sm text-menuHeading dark:text-[#262626] font-bold text-center border border-[#F0f0f0] py-4 px-6 hover:bg-gray-50 transition cursor-pointer">
            My Orders
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="w-50 bg-white font-dmSans text-sm text-red-600 dark:text-red-600 font-bold text-center border border-[#F0f0f0] py-4 px-6 hover:bg-red-50 transition cursor-pointer">
            Log Out
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            onClick={handleItemClick}
            className="block w-50 bg-similarBlack font-dmSans font-bold text-sm text-white text-center py-4 px-6 hover:bg-gray-800 transition cursor-pointer">
            Log In
          </Link>
          <Link
            to="/signup"
            onClick={handleItemClick}
            className="block w-50 bg-white font-dmSans text-sm text-menuHeading dark:text-[#262626] font-bold text-center border border-[#F0f0f0] py-4 px-6 hover:bg-gray-50 transition cursor-pointer">
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
};

export default ToggleButtons;
