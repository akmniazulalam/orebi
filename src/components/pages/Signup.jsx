import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Intro from "../Intro";
import Container from "../Container";
import Heading from "../Heading";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agreePolicy, setAgreePolicy] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMsg("");

    const trimmedFirstName = firstName.trim();
    const trimmedLastName = lastName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedFirstName || !trimmedLastName) {
      const msg = "First name and last name are required.";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    if (!trimmedEmail) {
      const msg = "Email address is required.";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    if (!password) {
      const msg = "Password is required.";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    if (password !== repeatPassword) {
      const msg = "Passwords do not match.";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    if (!agreePolicy) {
      const msg = "Please read and agree to the Privacy Policy.";
      setErrorMsg(msg);
      toast.error(msg);
      return;
    }

    try {
      setIsSubmitting(true);
      const result = await signup(
        trimmedFirstName,
        trimmedLastName,
        trimmedEmail,
        password,
      );

      if (result.success) {
        toast.success("Account created successfully. Please sign in.");
        navigate("/login", {
          replace: true,
          state: {
            successMessage: "Account created successfully. Please sign in.",
          },
        });
      } else {
        const msg = result.message || "Registration failed. Please try again.";
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
      <Intro text={"Signup"} pText={"Signup"} />
      <Container>
        <p className="font-dmSans text-base leading-7.5 text-header max-w-161">
          Create an account with Orebi to manage your orders, track shipments, and enjoy a seamless checkout experience.
        </p>
        <hr className="text-infoBg my-15" />

        {errorMsg && (
          <div className="max-w-263.75 mb-6 p-4 rounded-xl border border-red-200 bg-red-50 text-red-700 font-dmSans text-sm">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full">
          <Heading
            className={"pb-10 font-dmSans font-bold text-[39px] text-menuHeading"}
            text={"Your Personal Details"}
            as={"h2"}
          />
          <div className="max-w-263.75 w-full gap-y-6 grid">
            <div className="flex flex-col sm:flex-row gap-y-6 sm:gap-y-0 gap-x-10">
              <div className="w-full">
                <label
                  htmlFor="signup-firstname"
                  className="block font-dmSans font-bold text-base text-menuHeading mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="signup-firstname"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="signup-lastname"
                  className="block font-dmSans font-bold text-base text-menuHeading mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="signup-lastname"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-y-6 sm:gap-y-0 gap-x-10">
              <div className="w-full">
                <label
                  htmlFor="signup-email"
                  className="block font-dmSans font-bold text-base text-menuHeading mb-2">
                  Email address <span className="text-red-500">*</span>
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="company@domain.com"
                  className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="signup-phone"
                  className="block font-dmSans font-bold text-base text-menuHeading mb-2">
                  Telephone
                </label>
                <input
                  id="signup-phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
                />
              </div>
            </div>
          </div>

          <hr className="text-infoBg my-15" />

          <Heading
            className={"pb-10 font-dmSans font-bold text-[39px] text-menuHeading"}
            text={"Your Password"}
            as={"h2"}
          />
          <div className="max-w-263.75 w-full gap-y-6 grid">
            <div className="flex flex-col sm:flex-row gap-y-6 sm:gap-y-0 gap-x-10">
              <div className="w-full">
                <label
                  htmlFor="signup-password"
                  className="block font-dmSans font-bold text-base text-menuHeading mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="signup-repeat-password"
                  className="block font-dmSans font-bold text-base text-menuHeading mb-2">
                  Repeat Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="signup-repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="Repeat Password"
                  className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
                />
              </div>
            </div>
          </div>

          <hr className="text-infoBg my-15" />

          <div className="flex items-center gap-x-2">
            <input
              type="checkbox"
              id="check"
              checked={agreePolicy}
              onChange={(e) => setAgreePolicy(e.target.checked)}
              className="cursor-pointer"
            />
            <label
              htmlFor="check"
              className="font-dmSans text-sm text-header cursor-pointer">
              I have read and agree to the Privacy Policy
            </label>
          </div>

          <div className="flex items-center gap-x-6 pt-5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3 px-18 mt-6 text-white text-sm font-bold font-dmSans bg-menuHeading cursor-pointer border border-menuHeading disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                "Create Account"
              )}
            </button>
            <Link
              to="/login"
              className="py-3 px-8 mt-6 text-sm font-bold font-dmSans text-menuHeading hover:underline">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </Container>
    </>
  );
};

export default Signup;
