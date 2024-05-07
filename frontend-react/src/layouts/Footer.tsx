import { Link } from "react-router-dom";

import logoShop from "../assets/logo-shop.svg";
import facebookLogo from "../assets/fb.svg";
import instagramLogo from "../assets/ins.webp";
import linkedinLogo from "../assets/lnk.png";
import paymentMethods from "../assets/payment-logo_qhslgz.webp";

export default function Footer() {
  return (
    <footer className="mt-8 px-3 pb-16 sm:px-10 lg:pb-1">
      <div className="mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-2 gap-7 xl:grid-cols-4">
          <div>
            <h4 className="text-md mb-4 pb-0.5 font-medium sm:mb-5 lg:mb-6 lg:leading-7">
              Company
            </h4>
            <ul>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">About Us</Link>{" "}
              </li>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">Contact Us</Link>{" "}
              </li>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">Careers</Link>{" "}
              </li>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">Latest News</Link>{" "}
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md mb-4 pb-0.5 font-medium sm:mb-5 lg:mb-6 lg:leading-7">
              Latest News
            </h4>
            <ul>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">Fish & Meat</Link>{" "}
              </li>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">Soft Drink</Link>{" "}
              </li>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">Milk & Diary</Link>{" "}
              </li>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">Beauty & Health</Link>{" "}
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-md mb-4 pb-0.5 font-medium sm:mb-5 lg:mb-6 lg:leading-7">
              My Account
            </h4>
            <ul>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">Dashboard</Link>{" "}
              </li>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">My Orders</Link>{" "}
              </li>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">Recent Orders</Link>{" "}
              </li>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">Update Profile</Link>{" "}
              </li>
            </ul>
          </div>
          <div>
            <img src={logoShop} alt="Logo" className="mb-4" />
            <ul>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">
                  987 Andre Plain Suite High Street 838, Lake Hestertown, USA
                </Link>{" "}
              </li>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">Tel: 02.356.1666</Link>{" "}
              </li>
              <li className="inline-block w-full text-sm text-gray-600 hover:text-primary-600">
                <Link to="/">Email: grocery@gmail.com</Link>{" "}
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-5 flex max-w-screen-2xl items-center justify-between rounded-lg border border-gray-50 bg-gray-50 px-4 py-4 shadow-sm sm:px-10 lg:py-8">
          <div className="">
            <h6 className="mb-2">Follow Us</h6>
            <div className="flex gap-3">
              <Link to="/">
                <img
                  src={facebookLogo}
                  alt="Facebook Logo"
                  className="h-[24px] w-[24px]"
                />
              </Link>
              <Link to="/">
                <img
                  src={instagramLogo}
                  alt="Instagram Logo"
                  className="h-[24px] w-[24px]"
                />
              </Link>
              <Link to="/">
                <img
                  src={linkedinLogo}
                  alt="Instagram Logo"
                  className="h-[24px] w-[24px]"
                />
              </Link>
            </div>
          </div>
          <div className="hidden text-center font-semibold xl:block">
            Call us now:
            <br />
            <span className="text-2xl text-primary-600 ">02.356.1666</span>
          </div>
          <div className="hidden xl:block">
            <img src={paymentMethods} alt="Payment methods" />
          </div>
        </div>
        <div className="py-4 text-center">
          <p className="mx-auto w-1/2 text-sm leading-6 text-gray-500">
            <a href="">Copyright 2024 @ HtmlLover</a>, All rights reserved.
            <span> Cloned by Nguyen Chinh with love 💖</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
