import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";

import { getAllCategories } from "src/services/apiCategories";
import { PUBLIC_ENDPOINTS } from "src/constants/url";

export default function CategoryList() {
  const { data: categories, error } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  });

  return (
    <div>
      <div className="mb-4 items-center justify-between lg:flex">
        <h1 className="mb-4 text-2xl font-semibold text-stone-800 lg:mb-0">
          Categories
        </h1>
        <div>
          <Link
            to="/admin/categories/add"
            className="flex items-center gap-2 rounded-md bg-primary-600 px-3 py-2 text-base font-semibold text-white hover:text-white"
          >
            <FaCirclePlus />
            Add Category
          </Link>
        </div>
      </div>
      <div>
        <table className="w-full text-left text-gray-600">
          <thead className="bg-[#f5f5f5] text-sm">
            <tr>
              <th className="uppercase">Name</th>
              <th className="uppercase">Image</th>
              <th className="uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>
                  <img
                    src={PUBLIC_ENDPOINTS.IMAGE_CATEGORIES + "/" + c.image}
                    alt={c.name}
                    className="h-10 w-10 rounded-md"
                  />
                </td>
                <td>
                  <div className="flex items-center gap-4">
                    <Link
                      className="flex items-center"
                      to={`/admin/categories/edit/${c._id}`}
                    >
                      <LuPencil className="text-xl text-blue-500" />
                    </Link>
                    <button className="flex items-center">
                      <FaRegTrashAlt className="text-xl text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
