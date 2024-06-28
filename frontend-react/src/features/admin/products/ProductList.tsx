import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaCirclePlus } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { FaRegTrashAlt } from "react-icons/fa";

import { getAllProducts } from "src/services/apiProducts";
import { PUBLIC_ENDPOINTS } from "src/constants/url";
import { formatCurrency } from "src/utils/helpers";

export default function ProductList() {
  const { data: products, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  return (
    <div>
      <div className="mb-4 items-center justify-between lg:flex">
        <h1 className="mb-4 text-2xl font-semibold text-stone-800 lg:mb-0">
          Products
        </h1>
        <div>
          <Link
            to="/admin/products/add"
            className="flex items-center gap-2 rounded-md bg-primary-600 px-3 py-2 text-base font-semibold text-white hover:text-white"
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
            {products?.map((p) => (
              <tr key={p._id}>
                <td className="flex items-center">
                  <div>
                    <img
                      className="h-10 w-10 rounded-md pe-2"
                      src={PUBLIC_ENDPOINTS.IMAGE_PRODUCTS + "/" + p.images[0]}
                      alt={p.name}
                    />
                  </div>
                  <span>{p.name}</span>
                </td>
                <td>{p.categoryId.name}</td>
                <td>{p.quantity}</td>
                <td>
                  {p.hot ? (
                    <span className="text-primary-600">Yes</span>
                  ) : (
                    <span className="text-red-600">No</span>
                  )}
                </td>
                <td>{formatCurrency(p.price)}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
