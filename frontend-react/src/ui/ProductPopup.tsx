import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/store";

import { IProduct } from "src/interfaces/product";
import { PUBLIC_ENDPOINTS } from "src/constants/url";
import {
  formatCurrency,
  formatDiscount,
  sanitizeHTML,
} from "src/utils/helpers";
import { addItem } from "src/store/cart/cartSlice";
import AddToCartControl from "./AddToCartControl";
import DialogPopup from "./Dialog";

interface ProductPopupProps {
  isOpen: boolean;
  onClose: () => void;
  product?: IProduct;
}

export default function ProductPopup({
  isOpen,
  onClose,
  product,
}: ProductPopupProps) {
  const [quantityAddCart, setQuantityAddCart] = useState(1);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    setQuantityAddCart(1);
  }, [product?._id]);

  if (!product) return;

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
        quantity: quantityAddCart,
        category: product.categoryId.name,
      }),
    );
  };

  const handleNavigate = () => {
    navigate("/products/category/" + product.categoryId._id);
    onClose();
  };

  const discount =
    ((product.orgPrice - product.price) / product.orgPrice) * 100;

  return (
    <DialogPopup
      widthSet="48rem"
      isConfirmation={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full max-w-3xl flex-col overflow-hidden md:flex-row lg:flex-row">
        <Link to={`/product/${product._id}`}>
          <div className="flex h-full flex-shrink-0 cursor-pointer items-center justify-center">
            {discount > 0 ? (
              <span className="text-dark absolute left-4 top-4 z-10 rounded bg-orange-500 px-2 py-1 text-sm font-medium text-white">
                {formatDiscount(discount)}% Off
              </span>
            ) : (
              ""
            )}
            <img
              alt="product"
              loading="lazy"
              width="420"
              height="420"
              className="p-6 md:p-3"
              src={PUBLIC_ENDPOINTS.IMAGE_PRODUCTS + "/" + product.images[0]}
            />
          </div>
        </Link>
        <div className="flex w-full flex-col px-5 text-left md:px-8">
          <div className="-mt-1.5 mb-2 block md:mb-2.5">
            <Link to={`/product/${product._id}`}>
              <h1 className="text-heading cursor-pointer text-lg font-semibold hover:text-black md:text-xl lg:text-2xl">
                {product.name}
              </h1>
            </Link>
            <div className="relative">
              <span className="inline-flex items-center justify-center rounded-full bg-primary-100 px-2 py-0 text-xs font-semibold text-primary-500">
                Stock :
                <span className="pl-1 font-bold text-orange-700">
                  {product.quantity}
                </span>
              </span>
            </div>
          </div>
          <p
            className="line-clamp-4 text-sm leading-6 text-gray-500 md:leading-6"
            dangerouslySetInnerHTML={{
              __html: sanitizeHTML(product.description),
            }}
          />
          <div className="my-4 flex items-center">
            <div className="product-price font-bold">
              <span className="inline-block text-2xl">
                {formatCurrency(product.price)}
              </span>
              <del className="ms-2 text-lg font-normal text-gray-400">
                {product.orgPrice > product.price
                  ? formatCurrency(product.orgPrice)
                  : ""}
              </del>
            </div>
          </div>
          <div className="mb-1"></div>
          {product.quantity > 0 ? (
            <AddToCartControl
              quantityAddCart={quantityAddCart}
              onAddToCart={handleAddToCart}
              onDecreaseQuantity={handleDecreaseQuantity}
              onIncreaseQuantity={handleIncreaseQuantity}
            />
          ) : (
            <p className="text-red-500">Out of stock</p>
          )}
          <div className="mt-4 flex items-center">
            <div className="space-s-3 sm:space-s-4 flex w-full items-center justify-between">
              <div>
                <span className="d-block py-1 text-sm font-semibold">
                  <span className="text-gray-700">Category:</span>
                  <button
                    type="button"
                    onClick={handleNavigate}
                    className="ml-2 font-medium text-gray-600 underline hover:text-primary-600"
                  >
                    {product.categoryId.name}
                  </button>
                </span>
              </div>
              <div>
                <Link
                  to={"/product/" + product._id}
                  className="font-sans text-sm font-medium text-orange-500"
                >
                  More Info
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <p className="text-xs text-gray-600 sm:text-sm">
              Call Us To Order By Mobile Number :
              <span className="font-semibold text-primary-700">
                +0044235234
              </span>
            </p>
          </div>
        </div>
      </div>
    </DialogPopup>
  );
}
