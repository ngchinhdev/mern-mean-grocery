import { Link } from "react-router-dom";

export default function FeatureCategory() {
  return (
    <section className="mt-5 bg-gray-100 px-3 py-10 text-center">
      <h2 className="mb-2 text-xl font-semibold">Featured Categories</h2>
      <p className="text-base leading-6 text-gray-600">
        Choose your necessary products from this feature categories.
      </p>
      <ul className="mt-8 grid grid-cols-2">
        <li>
          <Link
            to={"/products"}
            className="flex h-full w-full transform cursor-pointer items-center border border-gray-100 bg-white p-6 shadow-sm transition duration-200 ease-linear group-hover:shadow-lg"
          >
            <img
              src="https://kachabazar-store-nine.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fahossain%2Fimage%2Fupload%2Fv1658340705%2Fcategory%2520icon%2Fcarp-fish_paxzrt.png&w=96&q=75"
              alt=""
              className="h-[40px] w-[40px]"
            />
            <h3 className="line-clamp-1 ps-3 text-sm font-semibold leading-tight text-gray-600">
              Fish & Meat
            </h3>
          </Link>
        </li>
      </ul>
    </section>
  );
}
