import Banner from "../layouts/Banner";
import Information from "../layouts/Information";
import CategoryPromotionGrid from "../layouts/CategoryPromotionGrid";
import NewArrivals from "../layouts/NewArrivals";
import BestSellers from "../layouts/BestSellers";
import TrendingProductSpotlight from "../layouts/TrendingProductSpotlight";
import SpecialOffers from "../layouts/SpecialOffers";
import usePageTitle from "@/hooks/usePageTitle";

const Home = () => {
  usePageTitle("Home");
  return (
    <>
      <Banner />
      <Information />
      <CategoryPromotionGrid />
      <NewArrivals />
      <BestSellers />
      <TrendingProductSpotlight />
      <SpecialOffers />
    </>
  );
};

export default Home;
