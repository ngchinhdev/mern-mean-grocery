import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";

import { getAllCategories } from "../../services/apiCategories";

import ButtonsSlider from "./ButtonsSlider";
import { SERVER_IMAGES_CATEGORY_URL } from "../../constants/url";

export default function CategorySlider() {
  const { data: categories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  });

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
        {categories?.map((category) => (
          <SwiperSlide key={category._id} className="relative">
            <Link
              to={`/products/category/${category._id}`}
              className="flex cursor-pointer flex-col items-center rounded-lg bg-white p-3 text-center shadow-sm"
            >
              <img
                src={`${SERVER_IMAGES_CATEGORY_URL}/${category.image}`}
                alt={category.name}
                className="h-[40px] w-[40px]"
              />
              <h3 className="mt-2 text-xs text-gray-600 group-hover:text-primary-600">
                {category.name}
              </h3>
            </Link>
          </SwiperSlide>
        ))}
        <ButtonsSlider />
      </Swiper>
    </div>
  );
}
