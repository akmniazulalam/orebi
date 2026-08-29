import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Intro from "../Intro";
import Container from "../Container";
import Heading from "../Heading";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const fromLocation = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMsg("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMsg("Email address is required.");
      toast.error("Email address is required.");
      return;
    }

    if (!password) {
      setErrorMsg("Password is required.");
      toast.error("Password is required.");
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await login(trimmedEmail, password);

      if (result.success) {
        toast.success(result.message || "Login Successful");
        navigate(fromLocation, { replace: true });
      } else {
        const msg = result.message || "Invalid credentials. Please try again.";
        setErrorMsg(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = "An unexpected error occurred. Please try again later.";
      setErrorMsg(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Intro text={"Login"} pText={"Login"} />
      <Container>
        <p className="font-dmSans text-base leading-7.5 text-header max-w-161">
          Welcome back to Orebi. Please sign in to your account to view your order history, checkout faster, and manage your account details.
        </p>
        <hr className="text-infoBg my-15" />
        <Heading
          className={"pb-10 font-dmSans font-bold text-[39px] text-menuHeading"}
          text={"Returning Customer"}
          as={"h2"}
        />

        {location.state?.successMessage && !errorMsg && (
          <div className="max-w-263.75 mb-6 p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 font-dmSans text-sm font-semibold">
            {location.state.successMessage}
          </div>
        )}

        {errorMsg && (
          <div className="max-w-263.75 mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 font-dmSans text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-263.75 w-full gap-y-6 grid">
          <div className="flex flex-col sm:flex-row gap-y-6 sm:gap-y-0 gap-x-10">
            <div className="w-full">
              <label
                htmlFor="login-email"
                className="block font-dmSans font-bold text-base text-menuHeading mb-2">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="company@domain.com"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg dark:border-white/10 focus:outline-0 w-full"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="login-password"
                className="block font-dmSans font-bold text-base text-menuHeading mb-2">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg dark:border-white/10 focus:outline-0 w-full"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 py-3 px-10 mt-6 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] text-sm font-bold font-dmSans cursor-pointer hover:opacity-90 transition-opacity duration-200 shadow-sm justify-self-start disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Logging in...</span>
              </>
            ) : (
              "Log in"
            )}
          </button>
        </form>
        <hr className="text-infoBg my-15" />
        <Heading
          className={"font-dmSans font-bold text-[39px] text-menuHeading"}
          text={"New Customer"}
          as={"h2"}
        />
        <p className="font-dmSans text-base leading-7.5 text-header max-w-161 py-11">
          Create an account with us to enjoy personalized shopping, track your orders, and receive exclusive offers.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center justify-center py-3 px-10 mt-6 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] text-sm font-bold font-dmSans cursor-pointer hover:opacity-90 transition-opacity duration-200 shadow-sm text-center">
          Continue
        </Link>
      </Container>
    </>
  );
};

export default Login;