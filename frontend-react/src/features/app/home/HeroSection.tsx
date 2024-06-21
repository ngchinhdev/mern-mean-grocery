import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "swiper/css";
import "swiper/css/pagination";

import Button from "../../../ui/Button";
import slide1 from "../../../assets/slider-1_rl8qdc.webp";
import slide2 from "../../../assets/slider-2_o6aezc.webp";
import slide3 from "../../../assets/slider-3_o6aezc.webp";
import { getAllCoupons } from "src/services/apiCoupons";
import { ICoupon } from "src/interfaces/coupon";
import { countDownTime, formatCurrency } from "src/utils/helpers";
import Loader from "src/ui/Loader";

const slidesInfo = [
  {
    image: slide1,
    title: "Best Different Type of Grocery Store",
    description:
      "Quickly aggregate empowered networks after emerging products...",
  },
  {
    image: slide2,
    title: "The Best Quality Products Guaranteed!",
    description: "The Best Quality Products Guaranteed!",
  },
  {
    image: slide3,
    title: "Quality Freshness Guaranteed!",
    description:
      "Intrinsicly fashion performance based products rather than accurate benefits...",
  },
];

export default function HeroSection() {
  const [time, setTime] = useState(new Date().getTime());

  const {
    data: allCoupons,
    isPending,
    isError,
  } = useQuery<ICoupon[]>({
    queryKey: ["allCoupons"],
    queryFn: getAllCoupons,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="mt-5 w-full px-3 sm:px-10">
      <div className="mx-auto max-w-screen-2xl">
        <div className="lg:flex lg:gap-2 xl:gap-6">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            navigation
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            className="w-full lg:w-3/5"
          >
            {slidesInfo.map((s) => (
              <SwiperSlide className="relative" key={s.title}>
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full rounded-lg"
                />
                <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-center pl-4 pr-12 sm:pe-12 sm:ps-8">
                  <div className="w-10/12 sm:w-8/12">
                    <h1 className="mb-2 line-clamp-1 text-xl font-bold text-gray-800 sm:text-lg  md:line-clamp-none md:text-2xl lg:line-clamp-none lg:text-3xl">
                      {s.title}
                    </h1>
                    <p className="line-clamp-1 text-base leading-6 text-gray-600 md:line-clamp-none lg:line-clamp-none">
                      {s.description}
                    </p>
                  </div>
                  <div className="pt-4">
                    <Button type="primary" to="/products">
                      Shop Now
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="hidden h-full transform rounded border-2 border-orange-500 bg-gray-50 shadow transition duration-150 ease-linear hover:border-primary-500 lg:flex lg:flex-col xl:w-2/5">
            <h3 className="rounded-t border-b bg-orange-100 px-6 py-2 text-center text-base font-medium text-gray-900">
              Latest Super Discount Active Coupon Code
            </h3>
            {isPending ? (
              <Loader type="normal" />
            ) : isError ? (
              "No coupons found."
            ) : (
              <div className="mx-4 my-5 flex flex-col gap-5">
                {allCoupons?.map((coupon) => (
                  <div
                    key={coupon.code}
                    className="block flex-1 items-center rounded-md bg-white shadow md:flex md:justify-between"
                  >
                    <div className="flex items-center gap-4 px-3 py-2">
                      <img
                        src="https://www.onlygfx.com/wp-content/uploads/2018/04/discount-stamp-2.png"
                        alt="Discount"
                        className="max-h-[60px] max-w-[60px] rounded-md"
                      />
                      <div className="">
                        <h6 className="pl-1 text-base font-medium text-gray-600">
                          <span className="pe-1 text-lg font-bold text-red-500 md:text-xl lg:text-xl">
                            <span>-{formatCurrency(coupon.discount)}</span>
                          </span>
                          Off
                          <span
                            className={`ms-2 inline-block rounded-full px-4 py-1 text-xs font-semibold ${
                              new Date(coupon.endTime).getTime() > Date.now()
                                ? "bg-primary-100 text-primary-600"
                                : "bg-red-100 text-red-600"
                            }`}
                          >
                            {new Date(coupon.endTime).getTime() > Date.now()
                              ? "Active"
                              : "Inactive"}
                          </span>
                        </h6>
                        <h2 className="mb-2 pl-1 text-base font-semibold leading-6 text-gray-700">
                          Summer Gift Voucher
                        </h2>
                        <span className="mb-2 inline-block">
                          <div className="flex items-center font-semibold">
                            <span
                              className={`mx-1 flex items-center justify-center rounded px-2 py-1 text-sm font-semibold text-white ${new Date(coupon.endTime).getTime() - time < 0 ? "bg-red-500" : "bg-primary-500"}`}
                            >
                              {new Date(coupon.endTime).getTime() - time < 0
                                ? "00"
                                : countDownTime(
                                    new Date(coupon.endTime).getTime() - time,
                                  ).days}
                            </span>
                            :
                            <span
                              className={`mx-1 flex items-center justify-center rounded px-2 py-1 text-sm font-semibold text-white ${new Date(coupon.endTime).getTime() - time < 0 ? "bg-red-500" : "bg-primary-500"}`}
                            >
                              {new Date(coupon.endTime).getTime() - time < 0
                                ? "00"
                                : countDownTime(
                                    new Date(coupon.endTime).getTime() - time,
                                  ).hours}
                            </span>
                            :
                            <span
                              className={`mx-1 flex items-center justify-center rounded px-2 py-1 text-sm font-semibold text-white ${new Date(coupon.endTime).getTime() - time < 0 ? "bg-red-500" : "bg-primary-500"}`}
                            >
                              {new Date(coupon.endTime).getTime() - time < 0
                                ? "00"
                                : countDownTime(
                                    new Date(coupon.endTime).getTime() - time,
                                  ).minutes}
                            </span>
                            :
                            <span
                              className={`mx-1 flex items-center justify-center rounded px-2 py-1 text-sm font-semibold text-white ${new Date(coupon.endTime).getTime() - time < 0 ? "bg-red-500" : "bg-primary-500"}`}
                            >
                              {new Date(coupon.endTime).getTime() - time < 0
                                ? "00"
                                : countDownTime(
                                    new Date(coupon.endTime).getTime() - time,
                                  ).seconds}
                            </span>
                          </div>
                        </span>
                      </div>
                    </div>
                    <div className="relative border-dashed px-4 md:w-1/3 md:border-l-2 lg:w-1/3 lg:border-l-2">
                      <div className="info flex items-center">
                        <div className="w-full">
                          <div className="block">
                            <CopyToClipboard
                              text={coupon.code}
                              onCopy={() => alert("Coupon is copied")}
                            >
                              <div className="block rounded-lg border border-dashed border-primary-400 bg-primary-100 py-1 text-center">
                                <button className="block w-full">
                                  <span className="text-sm font-semibold leading-7 text-primary-600">
                                    {coupon.code}
                                  </span>
                                </button>
                              </div>
                            </CopyToClipboard>
                          </div>
                          <p className="mt-2 text-xs leading-4 text-gray-500"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between gap-2 rounded-md bg-[#ffedd5] px-10 py-6">
          <div>
            <h1 className="text-xl font-bold text-primary-700">
              100% Natural Quality Organic Product
            </h1>
            <p className="text-gray-500">
              See Our latest discounted products from here and get a special
              discount product
            </p>
          </div>
          <div className="ps-2">
            <Button type="primary" to="/products">
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
