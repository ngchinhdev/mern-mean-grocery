import DiscountProduct from "./DiscountProduct";
import DownloadApp from "./DownloadApp";
import FeatureCategory from "./FeatureCategory";
import HeroSection from "./HeroSection";
import MoreInfo from "../../../layouts/app/MoreInfo";
import PopularProduct from "./PopularProduct";

export default function HomeFeature() {
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
