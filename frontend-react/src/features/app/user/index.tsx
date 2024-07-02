import { NavLink, Outlet } from "react-router-dom";
import { IoIosList } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { LuKeyRound } from "react-icons/lu";
import { MdOutlineLockOpen } from "react-icons/md";

import useLogoutUser from "src/hooks/useLogoutUser";

export default function UserFeature() {
  const logoutUser = useLogoutUser();

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="flex w-full flex-col py-10 lg:flex-row lg:py-12">
          <div className="w-full flex-shrink-0 md:mr-7 lg:mr-10 lg:w-80 xl:mr-10 ">
            <div className="sticky top-32 flex flex-col gap-1 rounded-md bg-white p-4 text-base sm:p-5 lg:p-8">
              <NavLink
                className="nav-item inline-flex w-full items-center gap-2 rounded-md px-2 py-3 font-medium hover:bg-gray-50 hover:text-primary-600"
                to="/user/my-orders"
              >
                <span className="flex items-center rounded-md">
                  <IoIosList />
                </span>
                My Orders
              </NavLink>
              <NavLink
                className="nav-item inline-flex w-full items-center gap-2 rounded-md px-2 py-3 font-medium hover:bg-gray-50 hover:text-primary-600"
                to="/user/information"
              >
                <span className="flex items-center rounded-md">
                  <FiUser />
                </span>
                Update Profile
              </NavLink>
              <NavLink
                className="nav-item inline-flex w-full items-center gap-2 rounded-md px-2 py-3 font-medium hover:bg-gray-50 hover:text-primary-600"
                to="/user/change-password"
              >
                <span className="flex items-center rounded-md">
                  <LuKeyRound />
                </span>
                Change Password
              </NavLink>
              <span
                role="button"
                className="nav-item inline-flex w-full items-center gap-2 rounded-md px-2 py-3 font-medium hover:bg-gray-50 hover:text-primary-600"
                onClick={logoutUser}
              >
                <span className="flex items-center rounded-md">
                  <MdOutlineLockOpen />
                </span>
                Logout
              </span>
            </div>
          </div>
          <div className="mt-4 w-full overflow-hidden rounded-md bg-white p-4 sm:p-5 lg:mt-0 lg:p-8">
            <div className="max-w-screen-2xl">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
