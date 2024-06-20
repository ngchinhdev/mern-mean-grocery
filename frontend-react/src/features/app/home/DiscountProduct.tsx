import { useQuery } from "@tanstack/react-query";

import { getAllProducts } from "src/services/apiProducts";
import ProductList from "../../../ui/ProductList";
import NotFound from "src/ui/NotFound";

export default function DiscountProduct() {
  const { data: products, error } = useQuery({
    queryKey: ["discountProducts"],
    queryFn: () => getAllProducts(),
  });

  return (
    <>
      <div className="mx-auto lg:w-3/4 xl:w-2/4">
        <h2 className="mb-2 text-xl font-semibold lg:text-2xl">
          Discounted Products
        </h2>
        <p className="text-base leading-6 text-gray-600">
          See Our latest discounted products below. Choose your daily needs from
          here and get a special discount with free shipping.
        </p>
      </div>
      {error || !products?.length ? (
        <NotFound bigSize={false} message="No products found" />
      ) : (
        <ProductList
          products={products
            .sort((a, b) => b.orgPrice - b.price - (a.orgPrice - a.price))
            .slice(0, 10)}
        />
      )}
    </>
  );
}
