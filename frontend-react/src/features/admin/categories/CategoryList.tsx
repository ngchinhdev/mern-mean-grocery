import { FaRegTrashAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function CategoryList() {
  return (
    <div>
      <div className="mb-4 items-center justify-between lg:flex">
        <h1 className="mb-4 text-2xl font-medium text-stone-800 lg:mb-0">
          Categories
        </h1>
        <div>
          <Link
            to="/admin/categories/add"
            className="flex items-center gap-2 rounded-md bg-primary-600 px-3 py-2 text-base font-semibold text-white"
          >
            <span>
              <FaCirclePlus />
            </span>
            Add Category
          </Link>
        </div>
      </div>
      <div>
        <table className="w-full text-left text-gray-600">
          <thead className="bg-[#f5f5f5] text-sm">
            <tr className="table-header-admin">
              <th className="uppercase">Name</th>
              <th className="uppercase">Image</th>
              <th className="uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="table-body-admin">
              <td>name</td>
              <td>
                <img
                  src="{{imageUrl}}/{{category.image}}"
                  alt="{{category.name}}"
                  className="h-10 w-10 rounded-md"
                />
              </td>
              <td>
                <td>
                  <div className="flex items-center gap-5">
                    <button className="flex items-center text-xl">
                      <LuPencil />
                    </button>
                    <button className="flex items-center text-xl">
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </td>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
