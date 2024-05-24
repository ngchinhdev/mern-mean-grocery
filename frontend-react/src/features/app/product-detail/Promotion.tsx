import { TbTruckDelivery } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { FiDollarSign } from "react-icons/fi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import { FiShieldOff } from "react-icons/fi";
import { MdOutlineLightMode } from "react-icons/md";
import { GrLocation } from "react-icons/gr";

export default function Promotion() {
  return (
    <div className="w-full md:w-5/12 lg:w-6/12 xl:w-5/12">
      <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 lg:mt-0 lg:p-8">
        <ul className="my-0">
          <li className="flex items-center py-3">
            <span className="mr-4 items-start text-xl text-gray-400">
              <TbTruckDelivery />
            </span>
            <p className="text-sm leading-5 text-gray-500">
              Free shipping applies to all orders over shipping €100
            </p>
          </li>
          <li className="flex items-center py-3">
            <span className="mr-4 items-start text-xl text-gray-400">
              <IoHomeOutline />
            </span>
            <p className="text-sm leading-5 text-gray-500">
              Home Delivery within 1 Hour
            </p>
          </li>
          <li className="flex items-center py-3">
            <span className="mr-4 items-start text-xl text-gray-400">
              <FiDollarSign />
            </span>
            <p className="text-sm leading-5 text-gray-500">
              Cash on Delivery Available
            </p>
          </li>
          <li className="flex items-center py-3">
            <span className="mr-4 items-start text-xl text-gray-400">
              <LiaExchangeAltSolid />
            </span>
            <p className="text-sm leading-5 text-gray-500">
              7 Days returns money back guarantee
            </p>
          </li>
          <li className="flex items-center py-3">
            <span className="mr-4 items-start text-xl text-gray-400">
              <FiShieldOff />
            </span>
            <p className="text-sm leading-5 text-gray-500">
              Warranty not available for this item
            </p>
          </li>
          <li className="flex items-center py-3">
            <span className="mr-4 items-start text-xl text-gray-400">
              <MdOutlineLightMode />
            </span>
            <p className="text-sm leading-5 text-gray-500">
              Guaranteed 100% organic from natural products.
            </p>
          </li>
          <li className="flex items-center py-3">
            <span className="mr-4 items-start text-xl text-gray-400">
              <GrLocation />
            </span>
            <p className="text-sm leading-5 text-gray-500">
              Delivery from our pick point Boho One, Bridge Street West,
              Middlesbrough, North Yorkshire, TS2 1AE.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
