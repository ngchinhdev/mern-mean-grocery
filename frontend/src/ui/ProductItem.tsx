import { BsBagPlusFill } from "react-icons/bs";

export default function ProductItem() {
  return (
    <li>
      <div className="relative overflow-hidden rounded-md bg-white px-2 py-3">
        <div className="absolute left-0 top-0 z-10 rounded-full bg-gray-100 px-2 py-0 text-xs font-medium text-primary-600">
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
            <span className="cursor-pointer rounded-md border border-gray-200 p-2 text-primary-600 hover:bg-primary-600 hover:text-white">
              <BsBagPlusFill className="text-lg text-inherit" />
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
