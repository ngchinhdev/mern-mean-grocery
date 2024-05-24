import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { formatCurrency } from "src/utils/helpers";

export default function CartFooter() {
  const cart = useSelector((state: RootState) => state.cart.items);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="mx-5 my-3">
      <button className="bg-heading flex w-full items-center justify-between rounded-lg bg-primary-600 px-3 py-3 text-sm text-white transition duration-300 hover:bg-primary-700 focus:outline-none sm:text-base">
        <span className="align-middle font-medium">Proceed To Checkout</span>
        <span className="rounded-lg bg-white px-3 py-2 font-bold text-primary-600">
          {formatCurrency(total)}
        </span>
      </button>
    </div>
  );
}
