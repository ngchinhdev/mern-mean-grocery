import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";

export default function CategoryList() {
  return (
    <div className="pb-10">
      <div className="mb-4 items-center justify-between lg:flex">
        <h1 className="mb-4 text-2xl font-semibold text-stone-800 lg:mb-0">
          Categories
        </h1>
        <div>
          <Link
            to="add"
            className="flex items-center gap-2 rounded-md bg-primary-600 px-3 py-2 text-base font-semibold text-white"
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
            <tr>
              <td>asdasd</td>
              <td>
                <img
                  src="{{imageUrl}}/{{category.image}}"
                  alt="{{category.name}}"
                  className="h-10 w-10 rounded-md"
                />
              </td>
              <td>
                <div className="flex items-center gap-4">
                  <Link className="flex items-center" to="edit/">
                    <LuPencil className="text-xl text-blue-500" />
                  </Link>
                  <button className="flex items-center">
                    <FaRegTrashAlt className="text-xl text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
