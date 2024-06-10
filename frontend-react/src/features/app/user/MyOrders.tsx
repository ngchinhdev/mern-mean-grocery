import { Link } from "react-router-dom";

export default function MyOrders() {
  return (
    <div className="overflow-hidden rounded-md">
      <div className="flex flex-col">
        <h2 className="mb-5 text-xl font-semibold">My Orders</h2>
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full rounded-md border border-gray-100 pb-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-md border-b border-gray-100 last:border-b-0">
              <table className="min-w-full table-auto divide-y divide-gray-200 border border-gray-100">
                <thead className="bg-gray-50">
                  <tr className="bg-gray-100">
                    <th
                      scope="col"
                      className="px-6 py-2 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      OrderTime
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      Method
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      Total
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-2 text-center text-xs font-semibold uppercase tracking-wider text-gray-700"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  <tr>
                    <td className="whitespace-nowrap px-5 py-3 leading-6">
                      <span className="text-sm font-medium uppercase">1</span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-center leading-6">
                      <span className="text-sm">asd</span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-center leading-6">
                      <span className="text-sm">asdasds</span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-center text-sm font-medium leading-6">
                      <span className="text-orange-500">asd</span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-center leading-6">
                      <span className="text-sm font-bold">asd</span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3 text-center text-sm">
                      <Link
                        className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-600 transition-all hover:bg-primary-500 hover:text-white"
                        to=""
                      >
                        Details
                      </Link>
                      <span
                        role="button"
                        className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition-all hover:bg-red-500 hover:text-white"
                      >
                        Cancel
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="paginationOrder"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
