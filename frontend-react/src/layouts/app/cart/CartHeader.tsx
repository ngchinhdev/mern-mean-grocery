import { IoMdClose } from "react-icons/io";
import { IoBagCheckOutline } from "react-icons/io5";

interface CartHeaderProps {
  onClose: () => void;
}

export default function CartHeader({ onClose }: CartHeaderProps) {
  return (
    <div className="relative flex w-full items-center justify-between border-b border-gray-100 bg-indigo-50 px-5 py-4">
      <h2 className="text-heading m-0 flex items-center text-lg font-semibold">
        <IoBagCheckOutline className="pe-3 text-4xl" />
        Shopping Cart
      </h2>
      <span className="inline-flex items-center justify-center p-2 text-base text-gray-500 transition-opacity hover:text-primary-600 focus:outline-none">
        <span
          onClick={() => onClose()}
          className="font-sens text-md ml-1 flex cursor-pointer items-center text-gray-500 hover:text-red-400"
        >
          <IoMdClose className="pe-2 text-2xl" />
          Close
        </span>
      </span>
    </div>
  );
}
