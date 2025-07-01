import Container from "../Container";
import Image from "./../Image";
import Logo from "../../assets/logo.png";
import Flex from "../Flex";

const Header = () => {
  return (
    <section className="py-7">
      <Container>
        <Flex className={"justify-center relative"}>
          <Image className={"absolute left-0"} src={Logo} alt={Logo} />
          <div className="text-center">
            <ul className="flex gap-x-11">
              <li className="font-dmSans text-header text-[14px]">Home</li>
              <li className="font-dmSans text-header text-[14px]">Shop</li>
              <li className="font-dmSans text-header text-[14px]">About</li>
              <li className="font-dmSans text-header text-[14px]">Contacts</li>
              <li className="font-dmSans text-header text-[14px]">Journal</li>
            </ul>
          </div>
        </Flex>
      </Container>
    </section>
  );
};

export default Header;
