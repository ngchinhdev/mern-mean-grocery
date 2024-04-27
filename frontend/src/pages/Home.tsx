import DiscountProduct from "../components/home/DiscountProduct";
import DownloadApp from "../components/home/DownloadApp";
import FeatureCategory from "../components/home/FeatureCategory";
import HeroSection from "../components/home/HeroSection";
import MoreInfo from "../components/home/MoreInfo";
import PopularProduct from "../components/home/PopularProduct";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureCategory />
      <PopularProduct />
      <DownloadApp />
      <DiscountProduct />
      <MoreInfo />
    </>
  );
}
