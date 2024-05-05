import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Button from "../../ui/Button";
import slide from "../../assets/slider-2_o6aezc.webp";

export default function HeroSection() {
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
          >
            <SwiperSlide className="relative">
              <img src={slide} alt="" className="w-full rounded-lg" />
              <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-center pl-4 pr-12 sm:pe-12 sm:ps-8">
                <div className="w-10/12 sm:w-8/12">
                  <h1 className="mb-2 line-clamp-1 text-xl font-bold text-gray-800 sm:text-lg  md:line-clamp-none md:text-2xl lg:line-clamp-none lg:text-3xl">
                    Best Different Type of Grocery Store
                  </h1>
                  <p className="line-clamp-1 text-base leading-6 text-gray-600 md:line-clamp-none lg:line-clamp-none">
                    Quickly aggregate empowered networks after emerging
                    products...
                  </p>
                </div>
                <div className="pt-4">
                  <Button type="primary" to="/products">
                    Shop Now
                  </Button>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className="relative">
              <img src={slide} alt="" className="w-full rounded-lg" />
              <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-center pl-4 pr-12 sm:pe-12 sm:ps-8">
                <div className="w-10/12 sm:w-8/12">
                  <h1 className="mb-2 line-clamp-1 text-xl font-bold text-gray-800 sm:text-lg  md:line-clamp-none md:text-2xl lg:line-clamp-none lg:text-3xl">
                    Best Different Type of Grocery Store
                  </h1>
                  <p className="line-clamp-1 text-base leading-6 text-gray-600 md:line-clamp-none lg:line-clamp-none">
                    Quickly aggregate empowered networks after emerging
                    products...
                  </p>
                </div>
                <div className="pt-4">
                  <Button type="primary" to="/products">
                    Shop Now
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div className="hidden h-full w-full transform rounded border-2 border-orange-500 bg-gray-50 shadow transition duration-150 ease-linear hover:border-primary-500 lg:flex lg:flex-col xl:w-4/5">
            <h3 className="rounded-t border-b bg-orange-100 px-6 py-2 text-center text-base font-medium text-gray-900">
              Latest Super Discount Active Coupon Code
            </h3>
            <div className="mx-4 my-5 flex flex-col gap-5">
              <div className="block flex-1 items-center rounded-md bg-white shadow md:flex md:justify-between">
                <div className="flex items-center gap-4 px-3 py-2">
                  <img
                    src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1714488134%2Fcoupon%2Fai4.jpg&w=128&q=75"
                    alt=""
                    className="max-h-[60px] max-w-[60px] rounded-md"
                  />
                  <div className="">
                    <h6 className="pl-1 text-base font-medium text-gray-600">
                      <span className="pe-1 text-lg font-bold text-red-500 md:text-xl lg:text-xl">
                        <span>88%</span>
                      </span>
                      Off
                      <span className="ms-2 inline-block inline-block rounded-full bg-primary-100 px-4 py-1 text-xs font-medium text-primary-600">
                        Active
                      </span>
                    </h6>
                    <h2 className="mb-2 pl-1 text-base font-semibold leading-6 text-gray-700">
                      Summer Gift Voucher
                    </h2>
                    <span className="mb-2 inline-block">
                      <div className="flex items-center font-semibold">
                        <span className="mx-1 flex items-center justify-center rounded  bg-primary-500 px-2 py-1 text-sm font-semibold text-white">
                          12
                        </span>
                        :
                        <span className="mx-1 flex items-center justify-center rounded  bg-primary-500 px-2 py-1 text-sm font-semibold text-white">
                          23
                        </span>
                        :
                        <span className="mx-1 flex items-center justify-center rounded  bg-primary-500 px-2 py-1 text-sm font-semibold text-white">
                          26
                        </span>
                        :
                        <span className="mx-1 flex items-center justify-center rounded  bg-primary-500 px-2 py-1 text-sm font-semibold text-white">
                          40
                        </span>
                      </div>
                    </span>
                  </div>
                </div>
                <div className="relative border-dashed px-4 md:w-1/3 md:border-l-2 lg:w-1/3 lg:border-l-2">
                  <div className="info flex items-center">
                    <div className="w-full">
                      <div className="block">
                        <div className="block rounded-lg border border-dashed border-primary-400 bg-primary-100 py-1 text-center">
                          <button className="block w-full">
                            <span className="text-sm font-semibold uppercase leading-7 text-primary-600">
                              SUMMER24
                            </span>
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-xs leading-4 text-gray-500">
                        * This coupon apply when shopping more then{" "}
                        <span className="font-bold">$1000</span>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block flex-1 items-center rounded-md bg-white shadow md:flex md:justify-between">
                <div className="flex items-center gap-4 px-3 py-2">
                  <img
                    src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1714488134%2Fcoupon%2Fai4.jpg&w=128&q=75"
                    alt=""
                    className="max-h-[60px] max-w-[60px] rounded-md"
                  />
                  <div className="">
                    <h6 className="pl-1 text-base font-medium text-gray-600">
                      <span className="pe-1 text-lg font-bold text-red-500 md:text-xl lg:text-xl">
                        <span>88%</span>
                      </span>
                      Off
                      <span className="ms-2 inline-block inline-block rounded-full bg-primary-100 px-4 py-1 text-xs font-medium text-primary-600">
                        Active
                      </span>
                    </h6>
                    <h2 className="mb-2 pl-1 text-base font-semibold leading-6 text-gray-700">
                      Summer Gift Voucher
                    </h2>
                    <span className="mb-2 inline-block">
                      <div className="flex items-center font-semibold">
                        <span className="mx-1 flex items-center justify-center rounded  bg-primary-500 px-2 py-1 text-sm font-semibold text-white">
                          12
                        </span>
                        :
                        <span className="mx-1 flex items-center justify-center rounded  bg-primary-500 px-2 py-1 text-sm font-semibold text-white">
                          23
                        </span>
                        :
                        <span className="mx-1 flex items-center justify-center rounded  bg-primary-500 px-2 py-1 text-sm font-semibold text-white">
                          26
                        </span>
                        :
                        <span className="mx-1 flex items-center justify-center rounded  bg-primary-500 px-2 py-1 text-sm font-semibold text-white">
                          40
                        </span>
                      </div>
                    </span>
                  </div>
                </div>
                <div className="relative border-dashed px-4 md:w-1/3 md:border-l-2 lg:w-1/3 lg:border-l-2">
                  <div className="info flex items-center">
                    <div className="w-full">
                      <div className="block">
                        <div className="block rounded-lg border border-dashed border-primary-400 bg-primary-100 py-1 text-center">
                          <button className="block w-full">
                            <span className="text-sm font-semibold uppercase leading-7 text-primary-600">
                              SUMMER24
                            </span>
                          </button>
                        </div>
                      </div>
                      <p className="mt-2 text-xs leading-4 text-gray-500">
                        * This coupon apply when shopping more then{" "}
                        <span className="font-bold">$1000</span>{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
