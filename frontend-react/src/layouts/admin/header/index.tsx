import { useState } from "react";
import { useSelector } from "react-redux";
import { CgMenu } from "react-icons/cg";
import { CgMenuLeft } from "react-icons/cg";
import { FaRegBell } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";
import { TbSearch } from "react-icons/tb";

import VNCircle from "../../../assets/vietnamflag.png";
import { RootState } from "src/store/store";
import { PUBLIC_ENDPOINTS } from "src/constants/url";
import useLogoutUser from "src/hooks/useLogoutUser";

interface HeaderProps {
  collapsed: boolean;
  onCollapse: () => void;
}

export default function Header({ onCollapse, collapsed }: HeaderProps) {
  const [isOpenLogout, setIsOPenLogout] = useState(false);
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const logoutUser = useLogoutUser();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6 text-t-gray-500">
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
            <img src={VNCircle} width={30} alt="US Flag" />
          </span>
          <span className="relative cursor-pointer rounded-full p-2 text-2xl transition-all hover:bg-gray-200 hover:text-black">
            <FaRegBell />
            <small className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-600"></small>
          </span>
          <span className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-2xl transition-all hover:bg-gray-200 hover:text-black">
            <FiSettings onClick={() => setIsOPenLogout(!isOpenLogout)} />
            {isOpenLogout && (
              <div
                className="absolute -bottom-10 rounded-md bg-gray-300 px-4 py-2 text-sm"
                onClick={logoutUser}
              >
                Logout
              </div>
            )}
          </span>
          <div className="flex cursor-pointer items-center gap-3">
            <div className="h-8 w-8 overflow-hidden rounded-full">
              <img
                src={
                  currentUser?.avatar.startsWith("https://") ||
                  currentUser?.avatar.startsWith("data:")
                    ? currentUser?.avatar
                    : PUBLIC_ENDPOINTS.IMAGE_USERS + "/" + currentUser?.avatar
                }
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div>
              <div className="span text-sm">Admin</div>
              <h3 className="text-md font-bold">{currentUser?.name}</h3>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
