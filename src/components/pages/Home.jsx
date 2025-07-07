import Banner from "../layouts/Banner";
import Information from "../layouts/Information";
import Ads from "../layouts/Ads";
import NewArrivals from "../layouts/NewArrivals";
import BestSellers from "../layouts/BestSellers";
import AdsTwo from "../layouts/AdsTwo";
import SpecialOffers from "../layouts/SpecialOffers";

const Home = () => {
  return (
    <>
      <Banner />
      <Information />
      <Ads/>
      <NewArrivals/>
      <BestSellers/>
      <AdsTwo/>
      <SpecialOffers/>
    </>
  );
};

export default Home;
