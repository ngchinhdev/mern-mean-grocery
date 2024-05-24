import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { IProduct } from "src/interfaces/product";
import { addItem } from "src/store/cart/cartSlice";
import { formatCurrency, sanitizeHTML } from "src/utils/helpers";
import { AppDispatch } from "src/store/store";
import AddToCartControl from "src/ui/AddToCartControl";

interface DetailProps {
  product: IProduct;
}

export default function Detail({ product }: DetailProps) {
  const [quantityAddCart, setQuantityAddCart] = useState(1);

  useEffect(() => {
    setQuantityAddCart(1);
  }, [product._id]);

  const dispatch = useDispatch<AppDispatch>();

  const handleIncreaseQuantity = () => {
    setQuantityAddCart((quantityAddCart) => quantityAddCart + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantityAddCart((quantityAddCart) =>
      quantityAddCart > 1 ? quantityAddCart - 1 : 1,
    );
  };

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product._id,
        image: product.images[0],
        name: product.name,
        price: product.price,
        quantity: 1,
        category: product.categoryId.name,
      }),
    );
  };

  return (
    <div className="w-3/5 md:w-2/3 md:pr-6 xl:pr-6">
      <div className="mb-6">
        <h1 className="mb-1 text-lg font-semibold leading-7 text-gray-800 md:text-xl lg:text-2xl">
          {product.name}
        </h1>
        <div className="relative">
          <span className="inline-flex items-center justify-center rounded-full bg-green-100 px-2 py-0 text-xs font-semibold text-green-500">
            Stock :
            <span className="pl-1 font-bold text-orange-700">
              {product.quantity}
            </span>
          </span>
        </div>
      </div>
      <div className="product-price font-bold">
        <span className="inline-block text-2xl">
          {formatCurrency(product.price)}
        </span>
      </div>
      <div className="mb-4"></div>
      <div>
        <div className="text-sm leading-6 text-gray-500 md:leading-7">
          <p
            dangerouslySetInnerHTML={{
              __html: sanitizeHTML(product.description),
            }}
          />
          <br />
          <span className="read-or-hide">More Info</span>
        </div>
        <AddToCartControl
          quantityAddCart={quantityAddCart}
          onAddToCart={handleAddToCart}
          onDecreaseQuantity={handleDecreaseQuantity}
          onIncreaseQuantity={handleIncreaseQuantity}
        />
        <div className="mt-4 flex flex-col">
          <span className="d-block py-1 text-sm font-semibold">
            <span className="text-gray-800">Category:</span>
            <Link to={"/products/category/" + product.categoryId._id}>
              <button
                type="button"
                className="ml-2 font-medium text-gray-600 underline hover:text-teal-600"
              >
                {product.categoryId.name}
              </button>
            </Link>
          </span>
        </div>
        <div className="mt-8">
          <p className="text-xs font-medium text-gray-700 sm:text-sm">
            Call Us To Order By Mobile Number :
            <span className="font-semibold text-emerald-700">+0044235234</span>
          </p>
        </div>
      </div>
    </div>
  );
}
