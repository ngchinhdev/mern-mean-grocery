import { type IProduct } from "src/interfaces/IProduct";

import ProductItem from "./ProductItem";

interface ProductListProps {
  products: IProduct[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <ul className="mx-auto mt-8 grid max-w-screen-2xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {products?.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </ul>
  );
}
