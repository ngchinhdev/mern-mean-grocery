import { LuTrash2 } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { useDispatch } from "react-redux";

import { ICartItem } from "../../../interfaces/cart";
import { PUBLIC_ENDPOINTS } from "../../../constants/url";
import { formatCurrency } from "../../../utils/helpers";
import { AppDispatch } from "src/store/store";
import {
  decreaseQuantity,
  deleteItem,
  increaseQuantity,
} from "src/store/cart/cartSlice";

interface CartItemProps {
  item: ICartItem;
}

export default function CartItem({ item }: CartItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <li>
      <div className="flex items-center px-4 py-3">
        <div className="me-3 h-16 w-16 overflow-hidden rounded-full border border-gray-100 shadow-sm">
          <img
            src={PUBLIC_ENDPOINTS.IMAGE_PRODUCTS + "/" + item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-heading line-clamp-1 truncate text-sm font-medium text-gray-700">
            {item.name}
          </h4>
          <span className="mb-1 text-xs text-gray-400">
            Category: {item.category}
          </span>
          <div className="flex items-center justify-between">
            <strong className="text-heading text-sm font-bold leading-5 md:text-base">
              {formatCurrency(item.price)}
            </strong>
            <div className="w-22 flex h-8 flex-wrap items-center justify-evenly rounded-md border border-gray-100 bg-white p-1 text-gray-600 md:w-24 lg:w-24">
              <button
                className="text-dark text-base"
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                <FiMinus />
              </button>
              <p className="px-2 font-semibold">{item.quantity}</p>
              <button
                className="text-dark text-base"
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                <FiPlus />
              </button>
            </div>
            <div
              className="cursor-pointer text-xl text-red-500"
              onClick={() => dispatch(deleteItem(item.id))}
            >
              <LuTrash2 />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
