import DiscountProduct from "./DiscountProduct";
import DownloadApp from "./DownloadApp";
import FeatureCategory from "./FeatureCategory";
import HeroSection from "./HeroSection";
import PopularProduct from "./PopularProduct";

export default function HomeFeature() {
  return (
    <>
      <HeroSection />
      <FeatureCategory />
      <section className="bg-gray-50 px-3 py-10 text-center sm:px-10 lg:py-16">
        <div className="mx-auto max-w-screen-2xl">
          <PopularProduct />
        </div>
      </section>
      <DownloadApp />
      <section className="bg-gray-50 px-3 py-10 text-center sm:px-10 lg:py-16">
        <div className="mx-auto max-w-screen-2xl">
          <DiscountProduct />
        </div>
      </section>
    </>
  );
}
