import { useQuery } from "@tanstack/react-query";

import { getHotProducts } from "../../../services/apiProducts";

import ProductList from "../../../ui/ProductList";
import NotFound from "src/ui/NotFound";

export default function PopularProduct() {
  const { data: products, error } = useQuery({
    queryKey: ["hotProducts"],
    queryFn: getHotProducts,
  });

  return (
    <>
      <div className="mx-auto lg:w-3/4 xl:w-2/4">
        <h2 className="mb-2 text-xl font-semibold lg:text-2xl">
          Popular Products for Daily Shopping
        </h2>
        <p className="text-base leading-6 text-gray-600">
          See all our popular products in this week. You can choose your daily
          needs products from this list and get some special offer with free
          shipping.
        </p>
      </div>
      {error || !products?.length ? (
        <NotFound bigSize={false} message="No products found" />
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
}
