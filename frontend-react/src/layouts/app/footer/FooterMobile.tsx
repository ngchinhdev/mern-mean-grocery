import { RiMenu2Line } from "react-icons/ri";
import { BiHomeAlt } from "react-icons/bi";
import { LuShoppingCart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "src/store/store";

interface FooterMobileProps {
  onOpenCart: () => void;
  onOpenMenuMobile: () => void;
}

export default function FooterMobile({
  onOpenCart,
  onOpenMenuMobile,
}: FooterMobileProps) {
  const cart = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="fixed bottom-0 z-30 flex h-16 w-full items-center justify-between bg-primary-600 px-3 sm:px-10 lg:hidden">
      <span className="cursor-pointer" onClick={onOpenMenuMobile}>
        <RiMenu2Line className="text-2xl text-white" />
      </span>
      <Link to={"/"}>
        <BiHomeAlt className="text-2xl text-white" />
      </Link>
      <span className="relative cursor-pointer" onClick={onOpenCart}>
        <LuShoppingCart className="text-2xl text-white" />
        <span className="absolute -top-2 right-0 z-10 inline-flex h-5 w-5 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 p-1 text-xs font-bold leading-none text-red-100">
          {cart.length}
        </span>
      </span>
      <span className="cursor-pointer">
        <FiUser className="text-2xl text-white" />
      </span>
    </div>
  );
}
