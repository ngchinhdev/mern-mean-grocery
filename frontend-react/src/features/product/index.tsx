import Banner from "./Banner";

import bannerImg1 from "../../assets/cta-bg-1.webp";
import bannerImg2 from "../../assets/cta-bg-2.webp";
import bannerImg3 from "../../assets/cta-bg-3.webp";

import CategorySlider from "./CategorySlider";
import ProductList from "../../ui/ProductList";
import FilterBar from "./FilterBar";
import MoreInfo from "../../layouts/MoreInfo";

export default function ProductFeature() {
  return (
    <>
      <section className="mb-8 bg-gray-50 px-3 sm:px-10">
        <div className="grid-col mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:gap-6">
          <Banner image={bannerImg1} title="Fresh & Natural" />
          <Banner image={bannerImg2} title="Fresh & Natural" />
          <Banner image={bannerImg3} title="Fresh & Natural" />
        </div>
        <CategorySlider />
        <FilterBar />
        <ProductList />
      </section>
      <MoreInfo />
    </>
  );
}
