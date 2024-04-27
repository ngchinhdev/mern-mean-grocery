import { BsBagPlusFill } from "react-icons/bs";

export default function DiscountProduct() {
  return (
    <section className="bg-gray-50 px-3 py-10 text-center">
      <h2 className="mb-2 text-xl font-semibold">Latest Discounted Products</h2>
      <p className="text-base leading-6 text-gray-600">
        See Our latest discounted products below. Choose your daily needs from
        here and get a special discount with free shipping.
      </p>
      <ul className="mt-8 grid grid-cols-2 gap-2">
        <li>
          <div className="relative overflow-hidden rounded-md bg-white px-2 py-3">
            <div className="text-primary-600 absolute left-0 top-0 z-10 rounded-full bg-gray-100 px-2 py-0 text-xs font-medium">
              <span>Stock: </span>
              <span className="pl-1 font-bold text-orange-700">11</span>
            </div>
            <div className="text-dark absolute right-0 top-0 z-10 rounded bg-orange-500 px-2 py-1 text-xs font-medium text-white">
              20% Off
            </div>
            <img
              src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fi.ibb.co%2F9g7vDQJ%2FHimalaya-Baby-Powder-100g.jpg&w=1200&q=75"
              alt=""
            />
            <div className="text-start">
              <h3 className="mb-2">Himalaya Powder</h3>
              <div className="flex items-center justify-between">
                <div>
                  <span className="block text-lg font-semibold">$160.9</span>
                  <del className="text-base text-gray-400">$188.8</del>
                </div>
                <span className="rounded-md border border-gray-200 p-2">
                  <BsBagPlusFill className="text-primary-600 text-lg" />
                </span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
}
