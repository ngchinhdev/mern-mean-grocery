import { FiMinus, FiPlus } from "react-icons/fi";

export default function Detail() {
  return (
    <div className="w-3/5 md:w-2/3 md:pr-6 xl:pr-6">
      <div className="mb-6">
        <h1 className="mb-1 text-lg font-semibold leading-7 text-gray-800 md:text-xl lg:text-2xl">
          Rainbow Chard
        </h1>
        <div className="relative">
          <span className="inline-flex items-center justify-center rounded-full bg-green-100 px-2 py-0 text-xs font-semibold text-green-500">
            Stock :<span className="pl-1 font-bold text-orange-700">472 </span>
          </span>
        </div>
      </div>
      <div className="product-price font-bold">
        <span className="inline-block text-2xl">€7.07</span>
      </div>
      <div className="mb-4"></div>
      <div>
        <div className="text-sm leading-6 text-gray-500 md:leading-7">
          Most fresh vegetables are low in calories and have a water content in
          excess of 70 percent, with only about 3.5 percent protein and less
          than 1 percent fat. ... The root vegetables include beets, carrots,
          radishes, sweet potatoes, <br />
          <span className="read-or-hide">More Info</span>
        </div>
        <div className="mt-4 flex items-center">
          <div className="space-s-3 sm:space-s-4 flex w-full items-center justify-between">
            <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
              <button className="text-heading flex h-full w-8 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out hover:text-gray-500 focus:outline-none md:w-12">
                <span className="text-dark text-base">
                  <FiMinus />
                </span>
              </button>
              <p className="duration-250 text-heading flex h-full w-8  flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out  md:w-20 xl:w-24">
                1
              </p>
              <button className="text-heading flex h-full w-8 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out hover:text-gray-500 focus:outline-none md:w-12">
                <span className="text-dark text-base">
                  <FiPlus />
                </span>
              </button>
            </div>
            <button className="ml-4 inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-md border-0 border-transparent bg-emerald-500 px-4 py-4 text-center text-sm font-semibold leading-4 text-white transition duration-300 ease-in-out hover:bg-emerald-600 hover:text-white focus:outline-none focus-visible:outline-none md:px-6 md:py-3.5 lg:px-8 lg:py-4">
              Add to Cart
            </button>
          </div>
        </div>
        <div className="mt-4 flex flex-col">
          <span className="d-block py-1 text-sm font-semibold">
            <span className="text-gray-800">Category:</span>
            <a href="/search?category=fresh-vegetable&amp;_id=632aca374d87ff2494210bf0">
              <button
                type="button"
                className="ml-2 font-medium text-gray-600 underline hover:text-teal-600"
              >
                fresh-vegetable
              </button>
            </a>
          </span>
        </div>
        <div className="mt-8">
          <p className="text-xs font-medium text-gray-700 sm:text-sm">
            Call Us To Order By Mobile Number :
            <span className="font-semibold text-emerald-700">+0044235234</span>
          </p>
        </div>
      </div>
    </div>
  );
}
