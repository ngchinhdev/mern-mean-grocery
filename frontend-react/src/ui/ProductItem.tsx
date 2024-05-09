import { BsBagPlusFill } from "react-icons/bs";

import { type IProduct } from "../interfaces/IProduct";
import { SERVER_IMAGES_PRODUCT_URL } from "../constants/url";

type ProductItemProps = {
  product: IProduct;
};

export default function ProductItem({ product }: ProductItemProps) {
  const discount =
    ((product.orgPrice - product.price) / product.orgPrice) * 100;

  return (
    <li>
      <div className="relative overflow-hidden rounded-md bg-white px-2 py-3 shadow-sm">
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
            ${discount}% Off
          </div>
        ) : (
          ""
        )}
        <div className="flex cursor-pointer items-center justify-center overflow-hidden px-2 py-3 transition-transform duration-300 ease-in-out hover:scale-105 lg:px-4 lg:py-5">
          <img
            src={`${SERVER_IMAGES_PRODUCT_URL}/${product.images[0]}`}
            alt={product.name}
            className="h-40 w-40 object-cover"
          />
        </div>
        <div className="px-2 pb-2 text-start">
          <h3 className="mb-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-lg font-semibold">
                ${product.price}
              </span>
              <del className="text-base text-gray-400">
                {product.orgPrice > product.price ? "$" + product.orgPrice : ""}
              </del>
            </div>
            <span className="cursor-pointer rounded-md border border-gray-200 p-2 text-primary-600 hover:bg-primary-600 hover:text-white">
              <BsBagPlusFill className="text-lg text-inherit" />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
