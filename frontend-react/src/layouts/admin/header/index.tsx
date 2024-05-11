import { CgMenu } from "react-icons/cg";
import { CgMenuLeft } from "react-icons/cg";
import { FaRegBell } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { TbSearch } from "react-icons/tb";

import usCircle from "../../../assets/us-c.png";

interface HeaderProps {
  collapsed: boolean;
  onCollapse: () => void;
}

export default function Header({ onCollapse, collapsed }: HeaderProps) {
  return (
    <header className="border-b border-gray-200">
      <div className="text-t-gray-500 flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3 text-2xl">
          <span
            className="cursor-pointer rounded-full p-2 transition-all hover:bg-gray-200 hover:text-black"
            onClick={onCollapse}
          >
            {!collapsed ? <CgMenuLeft /> : <CgMenu />}
          </span>
          <span className="cursor-pointer rounded-full p-2 transition-all hover:bg-gray-200 hover:text-black">
            <TbSearch />
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="cursor-pointer rounded-full p-2 transition-all hover:bg-gray-200 hover:text-black">
            <img src={usCircle} alt="US Flag" />
          </span>
          <span className="relative cursor-pointer rounded-full p-2 text-2xl transition-all hover:bg-gray-200 hover:text-black">
            <FaRegBell />
            <small className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600"></small>
          </span>
          <span className="relative cursor-pointer rounded-full p-2 text-2xl transition-all hover:bg-gray-200 hover:text-black">
            <FiSettings />
          </span>
          <div className="flex cursor-pointer items-center gap-3">
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <img
                src="https://cdn.24h.com.vn/upload/3-2023/images/2023-09-07/1-1694075003-137-width740height888.jpg"
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div>
              <div className="span text-sm">Admin</div>
              <h3 className="text-md font-bold">Nguyen Chinh</h3>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
