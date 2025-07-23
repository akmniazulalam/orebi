import Container from "../Container";
import Heading from "../Heading";
import Image from "../Image";
import Cap from "/src/assets/cap.png"
import TeaTable from "/src/assets/teaTable.png"
import HeadPhone from "/src/assets/headPhone.png"
import SunGlass from "/src/assets/sunGlass.png"
import Badge from "../Badge";
import ActiveButtons from "../ActiveButtons";
import ProductTexts from "../ProductTexts"
import Flex from '../Flex';
import Black from '../Black';

const SpecialOffers = () => {
  return (
    <section className="pt-[120px]">
      <Container>
        <Heading
          className={"font-dmSans font-bold text-[39px] text-menuHeading pb-14"}
          text={"Special Offers"}
          as={"h3"}
        />
        <Flex className={"gap-x-8"}>
          <div>
            <div className="relative w-full group/img">
              <Image
                src={Cap}
                alt={"Cap"}
                className={"w-full h-full object-cover"}
              />
              <Badge
                badgeT={"New"}
                className={"absolute top-[19px] left-[19px]"}
              />
              <ActiveButtons
                className={
                  "absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
                }
              />
            </div>
            <ProductTexts />
            <Black/>
          </div>
          <div>
            <div className="relative w-full group/img">
              <Image
                src={TeaTable}
                alt={"TeaTable"}
                className={"w-full h-full object-cover"}
              />
              <Badge
                badgeT={"New"}
                className={"absolute top-[19px] left-[19px]"}
              />
              <ActiveButtons
                className={
                  "absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
                }
              />
            </div>
            <ProductTexts />
            <Black/>
          </div>
          <div>
            <div className="relative w-full group/img">
              <Image
                src={HeadPhone}
                alt={"HeadPhone"}
                className={"w-full h-full object-cover"}
              />
              <Badge
                badgeT={"New"}
                className={"absolute top-[19px] left-[19px]"}
              />
              <ActiveButtons
                className={
                  "absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
                }
              />
            </div>
            <ProductTexts />
            <Black/>
          </div>
          <div>
            <div className="relative w-full group/img">
              <Image
                src={SunGlass}
                alt={"SunGlass"}
                className={"w-full h-full object-cover"}
              />
              <Badge
                badgeT={"New"}
                className={"absolute top-[19px] left-[19px]"}
              />
              <ActiveButtons
                className={
                  "absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
                }
              />
            </div>
            <ProductTexts />
            <Black/>
          </div>
        </Flex>
      </Container>
    </section>
  )
}

export default SpecialOffers