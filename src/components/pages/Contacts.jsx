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
            className={
              "pb-10 font-dmSans font-bold text-[39px] text-menuHeading"
            }
            text={"Fill up a Form"}
            as={"h2"}
          />
          <div className="w-full">
            <h3 className="font-dmSans font-bold text-base text-menuHeading">
              Name
            </h3>
            <input
              type="text"
              placeholder="Your name here"
              className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
            />
          </div>
          <div className="w-full">
            <h3 className="font-dmSans font-bold text-base text-menuHeading">
              Email
            </h3>
            <input
              type="text"
              placeholder="Your email here"
              className="font-dmSans text-base placeholder:text-sm placeholder:text-header text-menuHeading pt-2 pb-4 border-b border-infoBg focus:outline-0 w-full"
            />
          </div>
          <div className="w-full">
            <h3 className="font-dmSans font-bold text-base text-menuHeading">
              Message
            </h3>
            <textarea
              name="message"
              id="message"
              rows={"4"}
              placeholder="Your message here"
              className="border-b border-infoBg w-full resize-none pt-2 focus:outline-0 placeholder:font-dmSans placeholder:text-sm placeholder:text-header"></textarea>
          </div>
        </div>
        <button className="py-3 px-18 mt-6 text-white text-sm font-bold font-dmSans bg-menuHeading cursor-pointer border border-menuHeading">
          Post
        </button>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.5035102997617!2d90.41018447511445!3d23.729417778684667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8f7d6d3bf2b%3A0x5c61cf1a938edf6a!2sBaitul%20Mukarram%20National%20Mosque!5e0!3m2!1sen!2sbd!4v1777662755935!5m2!1sen!2sbd"
          width="600"
          height="450"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          className="border-0 w-full mt-20"></iframe>
      </Container>
    </>
  );
};

export default Contacts;
