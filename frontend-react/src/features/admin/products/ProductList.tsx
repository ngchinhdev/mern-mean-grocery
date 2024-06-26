import { Link } from "react-router-dom";

import { FaCirclePlus } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ProductList() {
  return (
    <div className="pb-10">
      <div className="mb-4 items-center justify-between lg:flex">
        <h1 className="mb-4 text-2xl font-semibold text-stone-800 lg:mb-0">
          Products
        </h1>
        <div>
          <Link
            to="add"
            className="flex items-center gap-2 rounded-md bg-primary-600 px-3 py-2 text-base font-semibold text-white"
          >
            <FaCirclePlus />
            Add Product
          </Link>
        </div>
      </div>
      <div>
        <table className="w-full text-left text-gray-600">
          <thead className="bg-[#f5f5f5] text-sm">
            <tr>
              <th className="uppercase">Name</th>
              <th className="uppercase">Category</th>
              <th className="uppercase">Quantity</th>
              <th className="uppercase">Hot</th>
              <th className="uppercase">Price</th>
              <th className="uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="flex items-center">
                <div>
                  <img
                    className="h-10 w-10 rounded-md pe-2"
                    src="{{imageUrl}}/{{product.images[0]}}"
                    alt="{{product.name}}"
                  />
                </div>
                <span>asdad</span>
              </td>
              <td>asdasd</td>
              <td>asdad</td>
              <td>
                <span className="text-primary-600">Yes</span>
                <span className="text-red-600">No</span>
              </td>
              <td>asdad</td>
              <td>
                <div className="flex items-center gap-4">
                  <Link
                    className="flex items-center"
                    to="/admin/products/edit/"
                  >
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
