import React from "react";
import Heading from "./Heading";
import Container from "./Container";


const Intro = (props) => {
  return (
    <section className="py-10 md:py-17">
      <Container>
        <Heading
          text={props.text}
          className={"font-dmSans font-bold text-3xl md:text-[40px] text-menuHeading"}
          as={"h1"}
        />
        <p className="font-dmSans text-[12px] text-header pt-5.5">Home  &gt;  {props.pText}</p>
      </Container>
    </section>
  );
};

export default Intro;
