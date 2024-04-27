import { LuTrash2 } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

export default function CartItem() {
  return (
    <li>
      <div className="flex items-center px-4 py-3">
        <div className="me-3 h-16 w-16 overflow-hidden rounded-full border border-gray-100 shadow-sm">
          <img
            src="https://i.postimg.cc/9QpDCh3Y/jambura-pomelo-1-pcs.webp"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="text-heading line-clamp-1 truncate text-sm font-medium text-gray-700">
            Pomelo
          </h4>
          <span className="mb-1 text-xs text-gray-400">Category: Fruits</span>
          <div className="flex items-center justify-between">
            <strong className="text-heading text-sm font-bold leading-5 md:text-base">
              $50.00
            </strong>
            <div className="w-22 flex h-8 flex-wrap items-center justify-evenly rounded-md border border-gray-100 bg-white p-1 text-gray-600 md:w-24 lg:w-24">
              <button className="text-dark text-base">
                <FiMinus />
              </button>
              <p className="px-2 font-semibold">1</p>
              <button className="text-dark text-base">
                <FiPlus />
              </button>
            </div>
            <div className="text-xl text-red-500">
              <LuTrash2 />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
