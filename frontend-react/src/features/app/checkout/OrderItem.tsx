import { FaRegTrashCan } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

export default function OrderItem() {
  return (
    <div className="group relative flex h-auto w-full items-center justify-start border-b border-gray-100 bg-white px-4 py-3 transition-all last:border-b-0 hover:bg-gray-50">
      <div className="relative mr-4 flex flex-shrink-0 cursor-pointer overflow-hidden rounded-full border border-gray-100 shadow-sm">
        <img
          src="https://i.postimg.cc/Z5yQ47YB/Rainbow-Chard-Package-per-lb.jpg"
          width="40"
          height="40"
          alt="Rainbow Chard"
        />
      </div>
      <div className="flex w-full flex-col overflow-hidden">
        <a
          className="text-heading line-clamp-1 truncate text-sm font-medium text-gray-700"
          href="/product/rainbow-chard"
        >
          Rainbow Chard
        </a>
        <span className="mb-1 text-xs text-gray-400">Item Price $7.07</span>
        <div className="flex items-center justify-between">
          <div className="text-heading text-sm font-bold leading-5 md:text-base">
            <span>€7.07</span>
          </div>
          <div className="w-22 flex h-8 flex-wrap items-center justify-evenly rounded-md border border-gray-100 bg-white p-1 text-gray-600 md:w-24 lg:w-24">
            <button>
              <FaMinus />
            </button>
            <p className="text-dark px-1 text-sm font-semibold">1</p>
            <button>
              <FaPlus />
            </button>
          </div>
          <button className="cursor-pointer text-lg text-red-400 hover:text-red-600">
            <FaRegTrashCan />
          </button>
        </div>
      </div>
    </div>
  );
}
