import { Link } from "react-router-dom";

export default function MenuCategories() {
  return (
    <>
      <h2 className="text-heading align-center m-0 flex border-b px-8 py-3 text-lg font-semibold">
        All Categories
      </h2>
      <ul className="mb-4 grid gap-4 p-6">
        <li>
          <Link to={"/products"} className="flex items-center">
            <img
              src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1658340705%2Fcategory%2520icon%2Fcarp-fish_paxzrt.png&w=96&q=75"
              alt=""
              className="h-[30px] w-[30px]"
            />
            <h3 className="line-clamp-1 ps-5 text-sm font-semibold leading-tight text-gray-600">
              Fish & Meat
            </h3>
          </Link>
        </li>
        <li>
          <Link to={"/products"} className="flex items-center">
            <img
              src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1658340705%2Fcategory%2520icon%2Fcarp-fish_paxzrt.png&w=96&q=75"
              alt=""
              className="h-[30px] w-[30px]"
            />
            <h3 className="line-clamp-1 ps-5 text-sm font-semibold leading-tight text-gray-600">
              Fish & Meat
            </h3>
          </Link>
        </li>
        <li>
          <Link to={"/products"} className="flex items-center">
            <img
              src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1658340705%2Fcategory%2520icon%2Fcarp-fish_paxzrt.png&w=96&q=75"
              alt=""
              className="h-[30px] w-[30px]"
            />
            <h3 className="line-clamp-1 ps-5 text-sm font-semibold leading-tight text-gray-600">
              Fish & Meat
            </h3>
          </Link>
        </li>
      </ul>
    </>
  );
}
