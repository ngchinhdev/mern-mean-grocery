import { Link } from "react-router-dom";
import logoShop from "../../assets/logo-shop.svg";
import { IoMdClose } from "react-icons/io";

interface MenuHeaderProps {
  onClose: () => void;
}

export default function MenuHeader({ onClose }: MenuHeaderProps) {
  return (
    <div className="flex h-16 w-full items-center justify-between border-b border-gray-100 bg-emerald-500 px-6 py-4 text-white">
      <Link to={"/"}>
        <img src={logoShop} alt="Logo" />
      </Link>
      <span
        onClick={() => onClose()}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-50 p-2 text-red-500 transition-opacity hover:text-primary-600 focus:outline-none"
      >
        <IoMdClose className="text-3xl" />
      </span>
    </div>
  );
}
