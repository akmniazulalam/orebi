import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Intro from "../Intro";
import Container from "../Container";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  ShieldCheck,
  ShoppingBag,
  LogOut,
  ArrowRight,
  UserCheck,
} from "lucide-react";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  if (!user) return null;

  const firstName = user.firstName || "";
  const lastName = user.lastName || "";
  const fullName = `${firstName} ${lastName}`.trim() || user.email || "Customer";

  const getInitials = () => {
    if (firstName && lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase();
    }
    if (firstName) {
      return firstName.slice(0, 2).toUpperCase();
    }
    return (user.email || "CU").slice(0, 2).toUpperCase();
  };

  return (
    <>
      <Intro text="My Account" pText="My Account" />
      <section className="bg-background py-10 font-dmSans">
        <Container className="px-4 xl:px-0">
          {/* Profile Overview Card */}
          <div className="mb-8 rounded-2xl border border-gray-200 bg-bHeaderBg p-6 sm:p-8 shadow-sm dark:bg-white/5 dark:border-white/10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gray-900 text-xl font-bold text-white shadow-md dark:bg-white dark:text-gray-900">
                  {getInitials()}
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h1 className="text-2xl font-bold text-menuHeading dark:text-white">
                      {fullName}
                    </h1>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      <UserCheck className="h-3.5 w-3.5" /> Verified Account
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-header dark:text-white/70">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/orders"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gray-900 px-5 text-sm font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100">
                  <ShoppingBag className="h-4 w-4" /> My Orders
                </Link>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 dark:bg-red-950/40 px-5 text-sm font-semibold text-red-600 dark:text-red-300 transition hover:bg-red-100 cursor-pointer">
                  <LogOut className="h-4 w-4" /> Log Out
                </button>
              </div>
            </div>
          </div>

          {/* Account Details Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Personal Info Card */}
            <div className="rounded-2xl border border-gray-200 bg-bHeaderBg p-6 shadow-sm dark:bg-white/5 dark:border-white/10">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/10 text-menuHeading dark:text-white">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-menuHeading dark:text-white text-lg">
                    Personal Details
                  </h2>
                  <p className="text-xs text-header dark:text-white/60">
                    Your profile information
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
                  <span className="text-header dark:text-white/60 font-medium">First Name</span>
                  <span className="font-semibold text-menuHeading dark:text-white">
                    {firstName || "—"}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
                  <span className="text-header dark:text-white/60 font-medium">Last Name</span>
                  <span className="font-semibold text-menuHeading dark:text-white">
                    {lastName || "—"}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
                  <span className="text-header dark:text-white/60 font-medium">Full Name</span>
                  <span className="font-semibold text-menuHeading dark:text-white">
                    {fullName}
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-header dark:text-white/60 font-medium">Email Address</span>
                  <span className="font-semibold text-menuHeading dark:text-white">
                    {user.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Account Status Card */}
            <div className="rounded-2xl border border-gray-200 bg-bHeaderBg p-6 shadow-sm dark:bg-white/5 dark:border-white/10">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-white/10">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-white/10 text-menuHeading dark:text-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-bold text-menuHeading dark:text-white text-lg">
                    Account Overview
                  </h2>
                  <p className="text-xs text-header dark:text-white/60">
                    Account security & status
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
                  <span className="text-header dark:text-white/60 font-medium">Account Role</span>
                  <span className="font-semibold capitalize text-menuHeading dark:text-white">
                    {user.role || "Customer"}
                  </span>
                </div>

                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-white/5">
                  <span className="text-header dark:text-white/60 font-medium">Account Status</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    Active & Verified
                  </span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-header dark:text-white/60 font-medium">Authentication</span>
                  <span className="font-semibold text-menuHeading dark:text-white">
                    Secure Session
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-white/10 flex justify-between items-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white hover:underline">
                  Continue Shopping <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Account;
