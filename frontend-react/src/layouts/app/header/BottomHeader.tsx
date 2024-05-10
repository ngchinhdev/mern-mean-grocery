import { useQuery } from "@tanstack/react-query";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

import { getAllCategories } from "../../../services/apiCategories";
import { SERVER_IMAGES_CATEGORY_URL } from "../../../constants/url";

import vFlag from "../../../assets/vietnamflag.png";
import aFlag from "../../../assets/americanflag.svg";

export default function BottomHeader() {
  const { data: categories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  });

  return (
    <div className="text-md mx-auto hidden max-w-screen-2xl items-center justify-between border-b bg-white px-10 font-medium lg:flex">
      <div className="flex items-center gap-8">
        <Menu as="div" className="relative inline-block py-3 text-left">
          <Menu.Button className="flex items-center transition-all hover:text-primary-700">
            Categories
            <MdKeyboardArrowDown className="ml-1 h-5 w-5 " aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            {categories?.length ? (
              <Menu.Items className="c-h-65vh gap- absolute left-0 z-20 mt-2 grid w-72 origin-top-right divide-gray-100 rounded-md bg-white p-5 shadow-lg ring-1 ring-black/5">
                {categories?.map((category) => (
                  <Menu.Item key={category._id}>
                    <Link
                      to={`/products/category/${category._id}`}
                      className="flex items-center rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary-700"
                    >
                      <img
                        src={`${SERVER_IMAGES_CATEGORY_URL}/${category.image}`}
                        alt=""
                        className="h-[20px] w-[20px]"
                      />
                      <div className="ml-3 inline-flex w-full items-center justify-between text-sm font-medium">
                        {category.name}
                        <span className="loading-none inline-flex items-end text-gray-400 transition duration-700 ease-in-out">
                          <MdKeyboardArrowRight className="text-xl" />
                        </span>
                      </div>
                    </Link>
                  </Menu.Item>
                ))}
              </Menu.Items>
            ) : (
              <p>Categories not found.</p>
            )}
          </Transition>
        </Menu>
        <div className="transition-all hover:text-primary-700">
          <Link to="/about-us" className="">
            About Us
          </Link>
        </div>
        <div className="transition-all hover:text-primary-700">
          <Link to="/about-us" className="">
            Contact Us
          </Link>
        </div>
        <div className="transition-all hover:text-primary-700">
          <Link to="/about-us" className="">
            Orders
          </Link>
        </div>
        <Link
          className="text-md relative inline-flex items-center rounded bg-red-100 px-2 py-0 font-medium text-red-500 transition-all hover:text-primary-700"
          to="/offer"
        >
          Offers
          <div className="absolute -right-1 -top-1 left-auto flex h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
          </div>
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <div className="dropdown relative">
          <div className="flot-l flag us flex cursor-pointer items-center gap-3">
            <img src={aFlag} alt="American Flag" width={25} height={20} />
            <span className="dropbtn">
              ENGLISH&nbsp;<i className="fas fa-angle-down"></i>
            </span>
          </div>
          <ul className="dropdown-content absolute hidden">
            <li>
              <div className="flot-l flag de">
                <img src={aFlag} alt="American Flag" width={25} height={20} />
              </div>
              ENGLISH
            </li>
            <li>
              <div className="flot-l flag us">
                <img src={vFlag} alt="Vietnam Flag" />
              </div>
              VIETNAM
            </li>
          </ul>
        </div>
        <Link
          className="text-md font-medium transition-all hover:text-primary-700"
          to="/privacy-policy"
        >
          Privacy Policy
        </Link>
        <Link
          className="text-md font-medium transition-all hover:text-primary-700"
          to="/terms-and-conditions"
        >
          Terms &amp; Conditions
        </Link>
      </div>
    </div>
  );
}
