import { useQuery } from "@tanstack/react-query";

import { getProductsByCategoryId } from "src/services/apiProducts";
import ProductList from "../../../ui/ProductList";
import NotFound from "src/ui/NotFound";

export default function DiscountProduct() {
  const { data: products, error } = useQuery({
    queryKey: ["discountProducts"],
    queryFn: () => getProductsByCategoryId("ok"),
  });

  return (
    <>
      <div className="mx-auto lg:w-3/4 xl:w-2/4">
        <h2 className="mb-2 text-xl font-semibold lg:text-2xl">
          Latest Discounted Products
        </h2>
        <p className="text-base leading-6 text-gray-600">
          See Our latest discounted products below. Choose your daily needs from
          here and get a special discount with free shipping.
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
