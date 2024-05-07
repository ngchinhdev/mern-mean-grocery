import { Link } from "react-router-dom";

import { MdOutlinePhoneCallback } from "react-icons/md";
import { BiHomeAlt } from "react-icons/bi";
import { FiUser } from "react-icons/fi";

export default function MenuPages() {
  return (
    <>
      <h2 className="text-heading align-center m-0 flex border-b px-8 py-3 text-lg font-semibold">
        Pages
      </h2>
      <ul className="grid gap-4 p-6">
        <li>
          <Link to={"/"} className="flex items-center">
            <span>
              <BiHomeAlt className="text-2xl" />
            </span>
            <h3 className="line-clamp-1 ps-5 text-sm font-semibold leading-tight text-gray-600">
              Home
            </h3>
          </Link>
        </li>
        <li>
          <Link to={"/"} className="flex items-center">
            <span>
              <FiUser className="text-2xl" />
            </span>
            <h3 className="line-clamp-1 ps-5 text-sm font-semibold leading-tight text-gray-600">
              My Profile
            </h3>
          </Link>
        </li>
        <li>
          <Link to={"/"} className="flex items-center">
            <span>
              <MdOutlinePhoneCallback className="text-2xl" />
            </span>
            <h3 className="line-clamp-1 ps-5 text-sm font-semibold leading-tight text-gray-600">
              Contact Us
            </h3>
          </Link>
        </li>
      </ul>
    </>
  );
}
