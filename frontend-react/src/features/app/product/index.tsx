import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import {
  getAllProducts,
  getProductsByCategoryId,
  getProductsBySearch,
} from "../../../services/apiProducts";

import bannerImg1 from "../../../assets/cta-bg-1.webp";
import bannerImg2 from "../../../assets/cta-bg-2.webp";
import bannerImg3 from "../../../assets/cta-bg-3.webp";

import Banner from "./Banner";
import CategorySlider from "./CategorySlider";
import ProductList from "../../../ui/ProductList";
import FilterBar from "./FilterBar";
import NotFound from "src/ui/NotFound";
import Loader from "src/ui/Loader";

export type SortType = "0" | "1" | "-1";

export default function ProductFeature() {
  const [sortType, setSortOption] = useState<SortType>("0");
  const { categoryId, search } = useParams();

  const queryOptions = useMemo(() => {
    if (categoryId) {
      return {
        queryKey: [`productsByCategory-${categoryId}`],
        queryFn: () => getProductsByCategoryId(categoryId),
      };
    } else if (search) {
      return {
        queryKey: [`productsBySearch-${search}`],
        queryFn: () => getProductsBySearch(search),
      };
    } else {
      return {
        queryKey: ["allProducts"],
        queryFn: getAllProducts,
      };
    }
  }, [categoryId, search]);

  const { data: products, error, isLoading } = useQuery(queryOptions);

  const sortedProducts = useMemo(() => {
    if (!products) return [];
    const sorted = [...products];
    if (sortType === "1") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "-1") {
      sorted.sort((a, b) => b.price - a.price);
    }
    return sorted;
  }, [products, sortType]);

  const handleSetSortType = (type: SortType) => {
    setSortOption(type);
  };

  return (
    <section className="bg-gray-50 px-3 pb-8 sm:px-10">
      <div className="grid-col mx-auto grid w-full max-w-screen-2xl grid-cols-1 gap-4 py-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:gap-6">
        <Banner image={bannerImg1} title="Fresh & Natural" />
        <Banner image={bannerImg2} title="Fresh & Natural" />
        <Banner image={bannerImg3} title="Fresh & Natural" />
      </div>
      <CategorySlider />
      <FilterBar
        itemLength={products?.length}
        sortType={sortType}
        onSetSortType={handleSetSortType}
      />
      {isLoading ? (
        <Loader />
      ) : !products?.length || error ? (
        <NotFound message="No products found" bigSize={false} />
      ) : (
        <ProductList products={sortedProducts} />
      )}
    </section>
  );
}
