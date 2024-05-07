import { Link } from "react-router-dom";

interface BannerProps {
  image: string;
  title: string;
}

export default function Banner({ image, title }: BannerProps) {
  return (
    <div className="duration-400 relative mx-auto w-full transform overflow-hidden rounded-lg transition delay-150 ease-out hover:shadow-xl">
      <div className="">
        <Link to="/product/1">
          <img src={image} alt={title} />
          <div className="p-r-16 absolute left-0 top-0 z-10 flex w-full flex-col justify-center text-center">
            <div className="pt-4">
              <h2 className="text-base font-semibold text-gray-100 sm:text-lg md:text-lg lg:text-lg">
                Taste of <br />
                <span className="text-lg font-bold text-white sm:text-2xl md:text-2xl lg:text-2xl">
                  {title}
                </span>
              </h2>
              <p className="font-sans text-sm text-gray-50">
                Weekend discount offer
              </p>
              <button className="mx-auto mt-4 hidden rounded-full bg-primary-600 px-4 py-1 text-center text-xs font-medium leading-6 text-white hover:bg-primary-600 sm:block lg:block">
                Shop Now
              </button>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
