import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import {
  getAllProducts,
  getProductsByCategoryId,
} from "../../services/apiProducts";

import bannerImg1 from "../../assets/cta-bg-1.webp";
import bannerImg2 from "../../assets/cta-bg-2.webp";
import bannerImg3 from "../../assets/cta-bg-3.webp";

import Banner from "./Banner";
import CategorySlider from "./CategorySlider";
import ProductList from "../../ui/ProductList";
import FilterBar from "./FilterBar";
import MoreInfo from "../../layouts/MoreInfo";

export default function ProductFeature() {
  const queryOptions = {
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  };

  const { categoryId } = useParams();

  if (categoryId) {
    queryOptions.queryKey = [`productsByCategory-${categoryId}`];
    queryOptions.queryFn = () => getProductsByCategoryId(categoryId);
  }

  const { data: products } = useQuery(queryOptions);

  return (
    <>
      <section className="bg-gray-50 px-3 pb-8 sm:px-10">
        <div className="grid-col mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:gap-6">
          <Banner image={bannerImg1} title="Fresh & Natural" />
          <Banner image={bannerImg2} title="Fresh & Natural" />
          <Banner image={bannerImg3} title="Fresh & Natural" />
        </div>
        <CategorySlider />
        <FilterBar itemLength={products?.length} />
        {!products?.length ? (
          <p>No products found.</p>
        ) : (
          <ProductList products={products} />
        )}
      </section>
      <MoreInfo />
    </>
  );
}
