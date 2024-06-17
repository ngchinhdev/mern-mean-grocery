import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LuPhoneCall } from "react-icons/lu";
import { FiUser } from "react-icons/fi";
import { MdOutlineLockOpen } from "react-icons/md";

import { RootState } from "src/store/store";
import useLogoutUser from "src/hooks/useLogoutUser";

interface TopHeaderProps {
  onOpenForm: () => void;
}

export default function TopHeader({ onOpenForm }: TopHeaderProps) {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  const logoutUser = useLogoutUser();

  return (
    <div className="hidden bg-gray-100 lg:block">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="flex items-center justify-between border-b py-2 text-xs font-medium text-gray-700">
          <span className="flex items-center">
            <LuPhoneCall className="me-2" />
            We are available 24/7, Need help?
            <Link to={"/"} className="ms-3 font-bold text-primary-600">
              +0987324562
            </Link>
          </span>
          <div className="navBar flex items-center lg:text-right">
            <div>
              <Link to={"/"} className="font-medium hover:text-primary-600">
                About Us
              </Link>
              <span className="mx-2">|</span>
            </div>
            <div>
              <Link to={"/"} className="font-medium hover:text-primary-600">
                Contact Us
              </Link>
              <span className="mx-2">|</span>
            </div>
            <span
              className="cursor-pointer font-medium hover:text-primary-600"
              onClick={
                currentUser ? () => navigate("/user/information") : onOpenForm
              }
            >
              My Account
            </span>
            <span className="mx-2">|</span>
            <span
              className="flex cursor-pointer items-center font-medium hover:text-primary-600"
              onClick={currentUser ? logoutUser : onOpenForm}
            >
              <span className="mr-1">
                {currentUser ? <MdOutlineLockOpen /> : <FiUser />}
              </span>
              {currentUser ? "Logout" : "Login"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
