import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getAllCategories } from "../../../services/apiCategories";
import { PUBLIC_ENDPOINTS } from "../../../constants/url";

export default function FeatureCategory() {
  const { data: categories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  });

  return (
    <section className="mt-5 bg-gray-100 px-3 py-10 text-center sm:px-10">
      <div className="mx-auto max-w-screen-2xl">
        <h2 className="mb-2 text-xl font-semibold lg:text-2xl">
          Featured Categories
        </h2>
        <p className="text-base leading-6 text-gray-600">
          Choose your necessary products from this feature categories.
        </p>
        <ul className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
          {categories?.map((category) => (
            <li key={category._id}>
              <Link
                to={`/products/category/${category._id}`}
                className="flex h-full w-full transform cursor-pointer items-center border border-gray-100 bg-white px-4 py-6 shadow-sm transition duration-200 ease-linear group-hover:shadow-lg"
              >
                <img
                  src={`${PUBLIC_ENDPOINTS.IMAGE_CATEGORIES}/${category.image}`}
                  alt={category.name}
                  className="h-[40px] w-[40px]"
                />
                <h3 className="line-clamp-1 ps-3 text-left text-sm font-semibold leading-tight text-gray-600">
                  {category.name}
                </h3>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
