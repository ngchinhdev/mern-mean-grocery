import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { LuShoppingCart } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { FiBell } from "react-icons/fi";

import logoLight from "../../../assets/logo-light_hls14v.svg";

interface MiddleHeaderProps {
  onOpenCart: () => void;
}

export default function MiddleHeader({ onOpenCart }: MiddleHeaderProps) {
  return (
    <div className="bg-primary-600">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between p-3 sm:px-10 lg:py-4">
        <Link to={"/"} className="relative hidden h-10 w-32 lg:block">
          <img src={logoLight} className="w-full" alt="Logo" />
        </Link>
        <div className="flex w-full items-center rounded-md bg-white px-4 py-3 transition-all duration-200 ease-in-out md:mx-12 lg:mx-4 lg:flex lg:max-w-[520px] xl:mx-0 xl:max-w-[750px] 2xl:max-w-[900px]">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search for products (e.g. fish, apple, oil)"
            className="w-full border-none text-sm focus:outline-none"
          />
          <span className="ps-2">
            <GoSearch className="text-lg text-gray-500" />
          </span>
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <span className="cursor-pointer pe-5">
            <FiBell className="text-2xl text-white" />
          </span>
          <span className="relative cursor-pointer" onClick={onOpenCart}>
            <LuShoppingCart className="text-2xl text-white" />
            <span className="absolute -top-2 right-0 z-10 inline-flex h-5 w-5 translate-x-1/2 transform items-center justify-center rounded-full bg-red-500 p-1 text-xs font-bold leading-none text-red-100">
              3
            </span>
          </span>
          <span className="cursor-pointer ps-5">
            <FiUser className="text-2xl text-white" />
          </span>
        </div>
      </div>
    </div>
  );
}
