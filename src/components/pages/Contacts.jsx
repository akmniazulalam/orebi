import React from "react";
import Intro from "../Intro";
import Container from "../Container";
import Heading from "../Heading";

const Contacts = () => {
  return (
    <>
      <Intro text={"Contacts"} pText={"Contacts"} />
      <Container>
        <div className="max-w-195 w-full gap-y-6 grid">
          <Heading
            className={"pb-10 font-dmSans font-bold text-2xl sm:text-3xl md:text-[36px] text-menuHeading tracking-tight"}
            text={"Fill up a Form"}
            as={"h2"}
          />
          <div className="w-full">
            <label className="block font-dmSans font-bold text-sm text-menuHeading mb-2">Name</label>
            <input
              type="text"
              placeholder="Your name here"
              className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading bg-transparent pt-2 pb-4 border-b border-gray-200 dark:border-white/10 focus:outline-none focus:border-menuHeading dark:focus:border-white/30 w-full transition-colors duration-200"
            />
          </div>
          <div className="w-full">
            <label className="block font-dmSans font-bold text-sm text-menuHeading mb-2">Email</label>
            <input
              type="email"
              placeholder="Your email here"
              className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading bg-transparent pt-2 pb-4 border-b border-gray-200 dark:border-white/10 focus:outline-none focus:border-menuHeading dark:focus:border-white/30 w-full transition-colors duration-200"
            />
          </div>
          <div className="w-full">
            <label className="block font-dmSans font-bold text-sm text-menuHeading mb-2">Message</label>
            <textarea
              name="message"
              id="message"
              rows={"4"}
              placeholder="Your message here"
              className="border-b border-gray-200 dark:border-white/10 w-full resize-none pt-2 bg-transparent focus:outline-none focus:border-menuHeading dark:focus:border-white/30 placeholder:font-dmSans placeholder:text-sm placeholder:text-header text-menuHeading transition-colors duration-200"></textarea>
          </div>
        </div>
        <button className="inline-flex items-center justify-center mt-6 py-3 px-10 rounded-full bg-menuHeading text-white dark:bg-white dark:text-[#262626] text-sm font-bold font-dmSans cursor-pointer hover:opacity-90 transition-opacity duration-200 shadow-sm">
          Post
        </button>
        <div className="mt-20 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.5035102997617!2d90.41018447511445!3d23.729417778684667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8f7d6d3bf2b%3A0x5c61cf1a938edf6a!2sBaitul%20Mukarram%20National%20Mosque!5e0!3m2!1sen!2sbd!4v1777662755935!5m2!1sen!2sbd"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="border-0 w-full block"
          ></iframe>
        </div>
      </Container>
    </>
  );
};

export default Contacts;
