import Image from "./Image";
import Badge from "./Badge";
import ActiveButtons from "./ActiveButtons";
import Slider from "react-slick";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";
import ProductTexts from "./ProductTexts";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  autoplaySpeed: 2000,
  pauseOnHover: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 768,
      settings: { slidesToShow: 2 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 320,
      settings: { slidesToShow: 1 },
    },
  ],
};

const ProductList = ({ products, addToCart, isSlide = false }) => {
  if (isSlide) {
    return (
      <div className="-mx-4">
        <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="w-full px-4">
            <div className="relative group/img">
              <Image
              src={product.image}
              alt={product.name}
              className={"w-full h-full object-cover"}
            />
            <Badge
              badgeT={product.badge}
              className={"absolute top-[19px] left-[19px]"}
            />
            <ActiveButtons
              className={
                "absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
              }
              addToCart={addToCart}
              product={product}
            />
            </div>
            <ProductTexts/>
          </div>
        ))}
      </Slider>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product.id} className="relative w-full group/img">
          <Image
            src={product.image}
            alt={product.name}
            className={"w-full h-full object-cover"}
          />
          <Badge
            badgeT={product.badge}
            className={"absolute top-[19px] left-[19px]"}
          />
          <ActiveButtons
            className={
              "absolute bottom-0 left-0 w-full group-hover/img:opacity-100 transition-all duration-400"
            }
            addToCart={() => addToCart(product)}
            product={product}
          />
          
        </div>
      ))}
    </div>
  );
};

export default ProductList;
