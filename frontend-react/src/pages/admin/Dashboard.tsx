import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex h-full flex-col gap-4 pb-20">
      <div className="mb-4 items-center justify-between gap-3 lg:flex">
        <div className="mb-4 lg:mb-0">
          <h3 className="text-2xl font-semibold">Sales Overview</h3>
          <p>View your current sales &amp; summary</p>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center"></div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div
          className="rounded-lg border-2 border-primary-500 p-5 transition duration-150 ease-linear hover:border-orange-500"
          role="presentation"
        >
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold">Revenue</h6>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-2 text-2xl font-bold">
                  <span>ssss</span>
                </h3>
                <p>
                  Latest update <span className="font-semibold">ádasd</span>
                </p>
              </div>
              <div>adsasd</div>
            </div>
          </div>
        </div>
        <div
          className="rounded-lg border-2 border-primary-500 p-5 transition duration-150 ease-linear hover:border-orange-500"
          role="presentation"
        >
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold">Orders</h6>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-2 text-2xl font-bold">
                  <span>ádasd</span>
                </h3>
                <p>
                  Latest update <span className="font-semibold">ádad</span>
                </p>
              </div>
              <div>ádad</div>
            </div>
          </div>
        </div>
        <div
          className="rounded-lg border-2 border-primary-500 p-5 transition duration-150 ease-linear hover:border-orange-500"
          role="presentation"
        >
          <div className="card-body">
            <h6 className="mb-4 text-lg font-semibold">Products</h6>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="mb-2 text-2xl font-bold">
                  <span>ád</span>
                </h3>
                <p>
                  Latest update <span className="font-semibold">ádasd</span>
                </p>
              </div>
              <div>ádasd</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card card-border lg:col-span-2" role="presentation">
          <div className="rounded-lg border-2 border-primary-500 p-5 transition duration-150 ease-linear hover:border-orange-500">
            <div className="mb-6 flex items-center justify-between">
              <h4 className="text-xl font-bold">Latest Orders</h4>
              <Link
                to="/admin/orders"
                className="rounded-lg border border-gray-300 px-3 py-2 font-medium transition-all hover:bg-gray-50"
              >
                View Orders
              </Link>
            </div>
            <div className="w-full">
              <table className="w-full">
                <thead className="bg-[#f5f5f5]">
                  <tr>
                    <th>Order</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Summary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="cursor-pointer select-none font-semibold hover:text-indigo-600">
                        #ádasd
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center">
                        <span className="badge-dot bg-primary-600"></span>
                        <span className="ml-2 font-semibold capitalize text-primary-600 rtl:mr-2">
                          Paid
                        </span>
                        <span className="badge-dot bg-orange-500"></span>
                        <span className="ml-2 font-semibold capitalize text-orange-500 rtl:mr-2">
                          Pending
                        </span>
                      </div>
                    </td>
                    <td>
                      <span>ádad</span>
                    </td>
                    <td>ádad</td>
                    <td>
                      <span>ádasd</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div
          className="rounded-lg border-2 border-primary-500 p-5 transition duration-150 ease-linear hover:border-orange-500"
          role="presentation"
        >
          <div className="card-body">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="text-xl font-bold">Top Selling</h4>
              <Link
                to="/admin/products"
                className="rounded-lg border border-gray-300 px-3 py-2 font-medium transition-all hover:bg-gray-50"
              >
                View Products
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#f5f5f5]">
                  <tr>
                    <th>Product</th>
                    <th>Sold</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex items-center gap-2">
                        <span className="avatar avatar-rounded avatar-md w-[100px]">
                          <img
                            className="avatar-img avatar-rounded pe-4"
                            loading="lazy"
                          />
                        </span>
                        <span className="text-lg font-semibold text-gray-500">
                          ádadds
                        </span>
                      </div>
                    </td>
                    <td>ádasd</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
