import { useState } from "react";

import { type IProduct } from "src/interfaces/product";
import ProductItem from "./ProductItem";
import ProductPopup from "./ProductPopup";

interface ProductListProps {
  products: IProduct[];
}

export default function ProductList({ products }: ProductListProps) {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | undefined>(
    undefined,
  );
  const [isOpenPopup, setIsOpenPopup] = useState(false);

  const handleOpenPopup = (product: IProduct) => {
    setSelectedProduct(product);
    setIsOpenPopup(true);
  };

  const handleClosePopup = () => {
    setIsOpenPopup(false);
    setSelectedProduct(undefined);
  };

  return (
    <ul className="mx-auto mt-8 grid max-w-screen-2xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {products?.map((product) => (
        <ProductItem
          key={product._id}
          product={product}
          onOpenPopup={handleOpenPopup}
        />
      ))}
      <ProductPopup
        isOpen={isOpenPopup}
        product={selectedProduct}
        onClose={handleClosePopup}
      />
    </ul>
  );
}
