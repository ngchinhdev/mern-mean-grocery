import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ButtonsSlider from "./ButtonsSlider";

export default function CategorySlider() {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <Swiper
        spaceBetween={10}
        slidesPerView={10}
        breakpoints={{
          320: {
            slidesPerView: 2,
          },
          480: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          902: {
            slidesPerView: 6,
          },
          1024: {
            slidesPerView: 8,
          },
          1280: {
            slidesPerView: 10,
          },
        }}
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <SwiperSlide className="relative">
            <Link
              to={"/products"}
              className="flex cursor-pointer flex-col items-center rounded-lg bg-white p-3 text-center shadow-sm"
            >
              <img
                src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1658340705%2Fcategory%2520icon%2Fcarp-fish_paxzrt.png&w=96&q=75"
                alt=""
                className="h-[40px] w-[40px]"
              />
              <h3 className="mt-2 text-xs text-gray-600 group-hover:text-primary-600">
                Fish &amp; Meat
              </h3>
            </Link>
          </SwiperSlide>
        ))}
        <ButtonsSlider />
      </Swiper>
    </div>
  );
}
