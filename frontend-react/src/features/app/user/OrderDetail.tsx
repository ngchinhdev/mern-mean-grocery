import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { getOrdersById } from "src/services/apiOrder";
import Loader from "src/ui/Loader";
import NotFound from "src/ui/NotFound";
import { convertToDateString, formatCurrency } from "src/utils/helpers";

import logo from "../../../assets/logo-shop.svg";

export default function OrderDetail() {
  const { id } = useParams();

  const {
    data: order,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["orderDetail", id],
    queryFn: () => getOrdersById(id!),
  });

  if (isPending) {
    return <Loader />;
  }

  if (!order || isError) {
    return <NotFound message="No order found" bigSize={false} />;
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-screen-2xl px-3 py-10 sm:px-6">
        <div className="mb-5 rounded-md bg-emerald-100 px-4 py-3">
          <label>
            Thank You{" "}
            <span className="font-bold text-emerald-600">
              {order.customerInfo.firstName + " " + order.customerInfo.lastName}
              ,{" "}
            </span>{" "}
            Your order have been received ! Please check your email in order to
            download the invoice.
          </label>
        </div>
        <div className="rounded-lg bg-white shadow-sm">
          <div>
            <div className="rounded-t-xl bg-indigo-50 p-8">
              <div className="flex flex-col justify-between border-b border-gray-50 pb-4 md:flex-row lg:flex-row lg:items-center">
                <div>
                  <h1 className="text-2xl font-bold uppercase">Invoice</h1>
                  <h6 className="text-gray-700">
                    Status :{" "}
                    <span className="text-orange-500">{order.status}</span>
                  </h6>
                </div>
                <div className="text-left lg:text-right">
                  <h2 className="mb-2 mt-4 text-lg font-semibold md:mt-0 lg:mt-0">
                    <a href="/">
                      <img
                        alt="logo"
                        loading="lazy"
                        width="110"
                        height="40"
                        decoding="async"
                        data-nimg="1"
                        src={logo}
                      />
                    </a>
                  </h2>
                  <p className="text-sm text-gray-500">
                    59 Station Rd, Purls Bridge, United Kingdom
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between pt-4 md:flex-row lg:flex-row">
                <div className="mb-3 flex flex-col md:mb-0 lg:mb-0">
                  <span className="block text-sm font-bold uppercase text-gray-600">
                    Date
                  </span>
                  <span className="block text-sm text-gray-500">
                    <span>{convertToDateString(order.createdAt)}</span>
                  </span>
                </div>
                <div className="mb-3 flex flex-col md:mb-0 lg:mb-0">
                  <span className="block text-sm font-bold uppercase text-gray-600">
                    Invoice No.
                  </span>
                  <span className="block text-sm text-gray-500">
                    #{order.invoiceNo}
                  </span>
                </div>
                <div className="flex flex-col text-left lg:text-right">
                  <span className="block text-sm font-bold uppercase text-gray-600">
                    Invoice To.
                  </span>
                  <span className="block text-sm text-gray-500">
                    {order.customerInfo.firstName}
                    {order.customerInfo.lastName}
                    <br />
                    {order.customerInfo.email}
                    <span className="ml-2">{order.customerInfo.phone}</span>
                    <br />
                    {order.shippingInfo.address},{order.shippingInfo.city},{" "}
                    {order.shippingInfo.country}
                    <br />
                  </span>
                </div>
              </div>
            </div>
            <div className="s">
              <div className="my-10 overflow-hidden px-8 lg:overflow-visible">
                <div className="-my-2 overflow-x-auto">
                  <table className="min-w-full table-auto divide-y divide-gray-200 border border-gray-100">
                    <thead className="bg-gray-50">
                      <tr className="bg-gray-100 text-xs">
                        <th
                          scope="col"
                          className="px-6 py-2 text-left font-semibold uppercase tracking-wider text-gray-700"
                        >
                          Sr.
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-left font-semibold uppercase tracking-wider text-gray-700"
                        >
                          Product Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-center font-semibold uppercase tracking-wider text-gray-700"
                        >
                          Quantity
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-center font-semibold uppercase tracking-wider text-gray-700"
                        >
                          Item Price
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-2 text-right font-semibold uppercase tracking-wider text-gray-700"
                        >
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-serif divide-y divide-gray-100 bg-white text-sm">
                      {order.orderItems.map((item, index) => (
                        <tr>
                          <th className="whitespace-nowrap px-6 py-1 text-left font-normal text-gray-500">
                            {index + 1}
                          </th>
                          <td className="whitespace-nowrap px-6 py-1 font-normal text-gray-500">
                            {item.product.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-1 text-center font-bold">
                            {item.quantity}
                          </td>
                          <td className="font-DejaVu whitespace-nowrap px-6 py-1 text-center font-bold">
                            {formatCurrency(item.product.price)}
                          </td>
                          <td className="font-DejaVu k-grid whitespace-nowrap px-6 py-1 text-right font-bold text-red-500">
                            {formatCurrency(item.quantity * item.product.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="border-b border-t border-gray-100 bg-emerald-50 p-10">
              <div className="flex flex-col justify-between pt-4 md:flex-row lg:flex-row">
                <div className="mb-3 flex flex-col  sm:flex-wrap md:mb-0 lg:mb-0">
                  <span className="mb-1 block text-sm font-bold uppercase text-gray-600">
                    Payment Method
                  </span>
                  <span className="block text-sm font-semibold text-gray-500">
                    Cash
                  </span>
                </div>
                <div className="mb-3 flex flex-col  sm:flex-wrap md:mb-0 lg:mb-0">
                  <span className="mb-1 block text-sm font-bold uppercase text-gray-600">
                    Shipping Cost
                  </span>
                  <span className="block text-sm font-semibold text-gray-500">
                    {formatCurrency(order.shippingInfo.cost!)}
                  </span>
                </div>
                <div className="mb-3 flex flex-col  sm:flex-wrap md:mb-0 lg:mb-0">
                  <span className="mb-1 block text-sm font-bold uppercase text-gray-600">
                    Discount
                  </span>
                  <span className="block text-sm font-semibold text-gray-500">
                    €0.00
                  </span>
                </div>
                <div className="flex flex-col sm:flex-wrap">
                  <span className="mb-1 block text-sm font-bold uppercase text-gray-600">
                    Total Price
                  </span>
                  <span className="block text-2xl font-bold text-red-500">
                    {formatCurrency(order.totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
