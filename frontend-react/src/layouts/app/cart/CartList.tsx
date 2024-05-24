import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";

export default function CartList() {
  const cart = useSelector((state: RootState) => state.cart.items);

  if (cart.length === 0) {
    return <CartEmpty />;
  }

  return (
    <ul className="no-scrollbar max-h-full w-full flex-grow overflow-y-scroll">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
