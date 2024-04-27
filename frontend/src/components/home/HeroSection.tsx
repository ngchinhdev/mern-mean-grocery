import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import Button from "../../ui/Button";
import slide from "../../assets/slider-2_o6aezc.webp";

export default function HeroSection() {
  return (
    <section className="mt-5 px-3">
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
          <img src={slide} alt="" className="rounded-lg" />
          <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-center pl-4 pr-12">
            <div className="w-10/12">
              <h1 className="mb-2 line-clamp-1 text-xl font-bold text-gray-800 sm:text-lg  md:line-clamp-none md:text-2xl lg:line-clamp-none lg:text-3xl">
                Best Different Type of Grocery Store
              </h1>
              <p className="line-clamp-1 text-base leading-6 text-gray-600 md:line-clamp-none lg:line-clamp-none">
                Quickly aggregate empowered networks after emerging products...
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className="relative">
          <img src={slide} alt="" className="rounded-lg" />
          <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-center pl-4 pr-12">
            <div className="w-10/12">
              <h1 className="mb-2 line-clamp-1 text-xl font-bold text-gray-800 sm:text-lg  md:line-clamp-none md:text-2xl lg:line-clamp-none lg:text-3xl">
                Best Different Type of Grocery Store
              </h1>
              <p className="line-clamp-1 text-base leading-6 text-gray-600 md:line-clamp-none lg:line-clamp-none">
                Quickly aggregate empowered networks after emerging products...
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="mt-5 flex items-center bg-[#ffedd5] px-10 py-6">
        <div>
          <h1 className="text-primary-700 text-xl font-bold">
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
    </section>
  );
}
