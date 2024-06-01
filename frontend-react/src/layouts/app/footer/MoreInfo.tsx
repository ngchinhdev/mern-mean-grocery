import { GrDeliver } from "react-icons/gr";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { LuCreditCard } from "react-icons/lu";
import { IoGiftOutline } from "react-icons/io5";

import appStoreImage from "../../assets/app-store_cyyc0f.svg";
import playStoreImage from "../../assets/play-store_cavwua.svg";
import moreIf1 from "../../assets/moreif1.webp";
import moreIf2 from "../../assets/moreif2.webp";

export default function MoreInfo() {
  return (
    <>
      <section className="bg-indigo-50 bg-center bg-repeat px-3 py-10 text-center sm:px-10 lg:py-16">
        <div className="mx-auto flex max-w-screen-2xl items-center gap-3 overflow-hidden">
          <div className="hidden flex-1 md:block">
            <img src={moreIf1} alt="App download" />
          </div>
          <div className="flex-1">
            <h3 className="mb-3 text-xl font-bold md:text-2xl lg:text-3xl">
              Get Your Daily Needs From Our KachaBazar Store
            </h3>
            <p className="mb-6 text-base leading-7 opacity-90">
              There are many products you will find in our shop, Choose your
              daily necessary product from our KachaBazar shop and get some
              special offers.
            </p>
            <div className="flex items-center justify-center gap-2">
              <img src={appStoreImage} alt="App store image" />
              <img src={playStoreImage} alt="Play store image" />
            </div>
          </div>
          <div className="hidden flex-1 lg:block">
            <img src={moreIf2} alt="App download" />
          </div>
        </div>
      </section>
      <div className="relative mx-auto hidden max-w-screen-2xl border-b px-3 py-6 sm:px-10 lg:block">
        <div className="mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
          <div className="flex items-center justify-center border-r border-gray-200 bg-white py-1">
            <div className="mr-3">
              <GrDeliver className="text-primary-600" />
            </div>
            <div className="">
              <span className="block text-sm font-medium leading-5">
                Free Shipping From €500.00
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center border-r border-gray-200 bg-white py-1">
            <div className="mr-3">
              <MdOutlinePhoneInTalk className="text-primary-600" />
            </div>
            <div className="">
              <span className="block text-sm font-medium leading-5">
                Support 24/7 At Anytime
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center border-r border-gray-200 bg-white py-1">
            <div className="mr-3">
              <LuCreditCard className="text-primary-600" />
            </div>
            <div className="">
              <span className="block text-sm font-medium leading-5">
                Secure Payment Totally Safe
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center border-r border-gray-200 bg-white py-1">
            <div className="mr-3">
              <IoGiftOutline className="text-primary-600" />
            </div>
            <div className="">
              <span className="block text-sm font-medium leading-5">
                Latest Offer Upto 20% Off
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
