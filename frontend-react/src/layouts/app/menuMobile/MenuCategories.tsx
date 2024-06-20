import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { PUBLIC_ENDPOINTS } from "src/constants/url";
import { getAllCategories } from "src/services/apiCategories";

export default function MenuCategories() {
  const { data: categories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  });

  return (
    <>
      <h2 className="text-heading align-center m-0 flex border-b px-8 py-3 text-lg font-semibold">
        All Categories
      </h2>
      <ul className="mb-1 grid gap-1 px-6 py-3">
        {categories?.map((category) => (
          <li key={category._id}>
            <Link
              to={`/products/category/${category._id}`}
              className="flex items-center rounded-md px-2 py-3 hover:bg-gray-100 hover:text-primary-700"
            >
              <img
                src={`${PUBLIC_ENDPOINTS.IMAGE_CATEGORIES}/${category.image}`}
                alt={category.name}
                className="h-[30px] w-[30px]"
              />
              <h3 className="line-clamp-1 ps-5 text-sm font-semibold leading-tight text-gray-600">
                {category.name}
              </h3>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
