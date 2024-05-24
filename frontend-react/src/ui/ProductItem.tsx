import { useDispatch } from "react-redux";
import { BsBagPlusFill } from "react-icons/bs";

import { type IProduct } from "../interfaces/product";
import { PUBLIC_ENDPOINTS } from "../constants/url";
import { formatCurrency, formatDiscount } from "../utils/helpers";
import { AppDispatch } from "../store/store";
import { addItem } from "../store/cart/cartSlice";

type ProductItemProps = {
  product: IProduct;
  onOpenPopup: (product: IProduct) => void;
};

export default function ProductItem({
  product,
  onOpenPopup,
}: ProductItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const discount =
    ((product.orgPrice - product.price) / product.orgPrice) * 100;

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
    <li>
      <div className="relative h-full overflow-hidden rounded-md bg-white px-2 py-3 shadow-sm">
        <div className="absolute left-0 top-0 z-10 rounded-full bg-gray-100 px-2 py-0 text-xs font-medium text-primary-600">
          {product.quantity > 0 ? (
            <span>
              Stock:
              <span className="pl-1 font-bold text-orange-700">
                {product.quantity}
              </span>
            </span>
          ) : (
            <span className="pl-1 font-bold text-orange-700">Stock Out</span>
          )}
        </div>
        {discount > 0 ? (
          <div className="text-dark absolute right-0 top-0 z-10 rounded bg-orange-500 px-2 py-1 text-xs font-medium text-white">
            {formatDiscount(discount)}% Off
          </div>
        ) : (
          ""
        )}
        <div
          className="flex cursor-pointer items-center justify-center overflow-hidden px-2 py-3 transition-transform duration-300 ease-in-out hover:scale-105 lg:px-4 lg:py-5"
          onClick={() => onOpenPopup(product)}
        >
          <img
            src={`${PUBLIC_ENDPOINTS.IMAGE_PRODUCTS}/${product.images[0]}`}
            alt={product.name}
            className="h-40 w-40 object-contain"
          />
        </div>
        <div className="px-2 pb-2 text-start">
          <h3 className="mb-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-lg font-semibold">
                {formatCurrency(product.price)}
              </span>
              <del className="text-base text-gray-400">
                {product.orgPrice > product.price
                  ? formatCurrency(product.orgPrice)
                  : ""}
              </del>
            </div>
            <span
              className="cursor-pointer rounded-md border border-gray-200 p-2 text-primary-600 hover:bg-primary-600 hover:text-white"
              onClick={handleAddToCart}
            >
              <BsBagPlusFill className="text-lg text-inherit" />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
