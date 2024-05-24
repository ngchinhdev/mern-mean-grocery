import { IProduct } from "src/interfaces/product";
import NotFound from "src/ui/NotFound";
import ProductList from "src/ui/ProductList";

interface RelatedProductsProps {
  products: IProduct[] | undefined;
  error: unknown;
}

export default function RelatedProducts({
  products,
  error,
}: RelatedProductsProps) {
  return (
    <>
      <h3 className="mb-3 text-lg font-semibold leading-7 lg:text-xl">
        Related Products
      </h3>
      {error || !products?.length ? (
        <NotFound bigSize={false} message="No related products found" />
      ) : (
        <ProductList products={products} />
      )}
    </>
  );
}
