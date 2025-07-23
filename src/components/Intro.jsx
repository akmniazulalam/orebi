import React from "react";
import Heading from "./Heading";
import Container from "./Container";


const Intro = (props) => {
  return (
    <section className="py-[125px]">
      <Container>
        <Heading
          text={props.text}
          className={"font-dmSans font-bold text-5xl text-menuHeading"}
          as={"h1"}
        />
        <p className="font-dmSans text-[12px] text-header pt-[22px]">Home  &gt;  {props.pText}</p>
      </Container>
    </section>
  );
};

export default Intro;
