import { useSwiper } from "swiper/react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function ButtonsSlider() {
  const swiper = useSwiper();

  return (
    <>
      <button
        className="prev bg-primary-500 absolute left-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-sm leading-8 text-white"
        onClick={() => swiper.slidePrev()}
      >
        <GrFormPrevious className="text-2xl" />
      </button>
      <button
        className="next bg-primary-500 absolute right-0 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-sm leading-8 text-white"
        onClick={() => swiper.slideNext()}
      >
        <GrFormNext className="text-2xl" />
      </button>
    </>
  );
}
