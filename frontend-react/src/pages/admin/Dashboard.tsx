import { useQuery } from "@tanstack/react-query";
import { GiKiwiFruit } from "react-icons/gi";
import { IoBagCheckOutline } from "react-icons/io5";
import { TfiMoney } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { PUBLIC_ENDPOINTS } from "src/constants/url";

import { getAllOrders, getBestSelling } from "src/services/apiOrder";
import { getAllProducts } from "src/services/apiProducts";
import Loader from "src/ui/Loader";
import { convertToDateString, formatCurrency } from "src/utils/helpers";

export default function Dashboard() {
  const {
    data: orders,
    error: orderError,
    isLoading: orderPending,
  } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getAllOrders,
  });

  const {
    data: products,
    error: productError,
    isPending: productPending,
  } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  const {
    data: bestSelling,
    error: bestSellingError,
    isPending: bestSellingPending,
  } = useQuery({
    queryKey: ["bestSelling"],
    queryFn: getBestSelling,
  });

  if (productPending || bestSellingPending || orderPending) {
    return <Loader />;
  }

  const revenue = orders?.reduce((total, cur) => (total += cur.totalPrice), 0);

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
                  <span>{formatCurrency(orderError ? 0 : revenue || 0)}</span>
                </h3>
                <p>
                  Latest update{" "}
                  <span className="font-semibold">
                    {convertToDateString(new Date().toISOString())}
                  </span>
                </p>
              </div>
              <div className="scale-[200%]">
                <TfiMoney className="text-3xl text-gray-500" />
              </div>
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
                  <span>{orderError ? 0 : orders?.length || 0}</span>
                </h3>
                <p>
                  Latest update{" "}
                  <span className="font-semibold">
                    {convertToDateString(new Date().toISOString())}
                  </span>
                </p>
              </div>
              <div className="scale-[200%]">
                <IoBagCheckOutline className="text-3xl text-gray-500" />
              </div>
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
                  <span>{productError ? 0 : products?.length || 0}</span>
                </h3>
                <p>
                  Latest update{" "}
                  <span className="font-semibold">
                    {convertToDateString(new Date().toISOString())}
                  </span>
                </p>
              </div>
              <div className="scale-[200%]">
                <GiKiwiFruit className="text-3xl text-gray-500" />
              </div>
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
              {orderError || !orders?.length ? (
                "No order found."
              ) : (
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
                    {orders
                      ?.sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime(),
                      )
                      .slice(0, 10)
                      .map((o) => (
                        <tr key={o._id}>
                          <td>
                            <span className="cursor-pointer select-none font-semibold hover:text-indigo-600">
                              #{o.invoiceNo}
                            </span>
                          </td>
                          <td>
                            <div className="flex items-center">
                              {o.paymentInfo.isPaid ? (
                                <>
                                  <span className="badge-dot bg-primary-600"></span>
                                  <span className="ml-2 font-semibold capitalize text-primary-600 rtl:mr-2">
                                    Paid
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="badge-dot bg-orange-500"></span>
                                  <span className="ml-2 font-semibold capitalize text-orange-500 rtl:mr-2">
                                    Pending
                                  </span>
                                </>
                              )}
                            </div>
                          </td>
                          <td>
                            <span>{convertToDateString(o.createdAt)}</span>
                          </td>
                          <td>{o.customerInfo.firstName}</td>
                          <td>
                            <span>{formatCurrency(o.totalPrice)}</span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
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
              {!bestSelling?.length || bestSellingError ? (
                "No products found."
              ) : (
                <table className="w-full">
                  <thead className="bg-[#f5f5f5]">
                    <tr>
                      <th>Product</th>
                      <th>Sold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bestSelling?.map((bsl) => (
                      <tr key={bsl._id}>
                        <td>
                          <div className="flex items-center gap-2">
                            <span className="avatar avatar-rounded avatar-md w-[100px]">
                              <img
                                src={
                                  PUBLIC_ENDPOINTS.IMAGE_PRODUCTS +
                                  "/" +
                                  bsl.productDetails.images[0]
                                }
                                className="avatar-img avatar-rounded pe-4"
                                loading="lazy"
                              />
                            </span>
                            <span className="text-lg font-semibold text-gray-500">
                              {bsl.productDetails.name}
                            </span>
                          </div>
                        </td>
                        <td>{bsl.totalQuantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
