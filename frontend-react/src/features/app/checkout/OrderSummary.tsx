import { useSelector } from "react-redux";

import OrderItem from "./OrderItem";
import { RootState } from "src/store/store";
import { formatCurrency } from "src/utils/helpers";
import { getTotalPrice } from "src/store/cart/cartSlice";
import { useState } from "react";

interface OrderSummaryProps {
  onEnterCoupon: (coupon: string) => void;
}

export default function OrderSummary({ onEnterCoupon }: OrderSummaryProps) {
  const [couponValue, setCouponValue] = useState("");

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalPrice = useSelector((state: RootState) =>
    getTotalPrice(state.cart),
  );

  return (
    <div className="top-28 flex h-full flex-col md:sticky md:order-2 md:ml-6 md:w-full lg:sticky lg:order-2 lg:ml-10 lg:w-2/5 xl:ml-14">
      <div className="order-1 rounded-lg border bg-white p-5 sm:order-2 lg:px-8 lg:py-8">
        <h2 className="pb-4 text-lg font-semibold">Order Summary</h2>
        <div className="scrollbar-hide block max-h-64 w-full overflow-y-scroll bg-gray-50">
          {cartItems.map((item) => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>
        <div className="text-heading mt-4 flex w-full items-center py-4 text-sm font-semibold last:border-b-0 last:pb-0 last:text-base lg:py-4">
          <div className="w-full">
            <div className="flex flex-col items-start justify-end sm:flex-row">
              <input
                type="text"
                placeholder="Input your coupon code"
                value={couponValue}
                onChange={(e) => setCouponValue(e.target.value)}
                className="form-input text-input h-12 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 text-sm placeholder-gray-500 placeholder-opacity-75 transition duration-200 ease-in-out focus:border-emerald-500 focus:outline-none focus:ring-0 md:px-4"
              />
              <button
                onClick={() => onEnterCoupon(couponValue)}
                className="mt-3 inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-md border border-gray-200 px-5 py-3 text-center text-sm font-semibold leading-4 placeholder-white transition duration-300 ease-in-out hover:bg-emerald-500 hover:text-white focus:outline-none focus-visible:outline-none sm:ml-3 sm:mt-0 sm:w-auto md:ml-3 md:mt-0 md:px-6 md:py-3.5 md:text-sm lg:ml-3 lg:mt-0 lg:px-8 lg:py-3 lg:text-base"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center py-2 text-sm font-semibold text-gray-500 last:border-b-0 last:pb-0 last:text-base">
          Shipping Cost
          <span className="ml-auto flex-shrink-0 font-bold text-gray-800">
            {formatCurrency(10)}
          </span>
        </div>
        <div className="flex w-full items-center py-2 text-sm font-semibold text-gray-500 last:border-b-0 last:pb-0 last:text-base">
          Discount
          <span className="ml-auto flex-shrink-0 font-bold text-orange-400">
            €0.00
          </span>
        </div>
        <div className="mt-4 border-t">
          <div className="flex items-center justify-between pt-5 text-sm font-bold uppercase">
            TOTAL COST
            <span className="text-lg font-extrabold">
              {formatCurrency(totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
