import { ChangeEvent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { toastUI } from "src/utils/toast";
import { getOrdersById, updateOrder } from "src/services/apiOrder";
import {
  MdDateRange,
  MdOutlineEmail,
  MdOutlineLocalPhone,
  MdOutlineLocationOn,
} from "react-icons/md";
import NotFound from "src/ui/NotFound";
import { convertToDateString, formatCurrency } from "src/utils/helpers";
import { PUBLIC_ENDPOINTS } from "src/constants/url";
import { TOrderStatus } from "src/interfaces/order";

export default function OrderDetail() {
  const [curPage, setCurPage] = useState(1);
  const queryClient = useQueryClient();

  const { id } = useParams();

  const { data: order, isError } = useQuery({
    queryKey: ["orderDetail", id],
    queryFn: () => getOrdersById(id as string),
    enabled: !!id,
  });

  const { mutate: updatePaidMutate, isPending } = useMutation<
    unknown,
    // eslint-disable-next-line
    AxiosError<any, any>,
    string
  >({
    mutationFn: (id: string) =>
      updateOrder(id, { paymentInfo: { ...order!.paymentInfo, isPaid: true } }),
    onSuccess: () => {
      toastUI("Order is paid", "success");
      queryClient.invalidateQueries({ queryKey: ["orderDetail", id] });
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
    },
    onError: (err) => {
      toastUI(err.response?.data.error, "error");
    },
  });

  const { mutate: statusMutate, isPending: isPendingStatus } = useMutation<
    unknown,
    // eslint-disable-next-line
    AxiosError<any, any>,
    { id: string; status: TOrderStatus }
  >({
    mutationFn: ({ id, status }) => updateOrder(id, { status: status }),
    onSuccess: () => {
      toastUI("Status order is changed", "success");
      queryClient.invalidateQueries({ queryKey: ["orderDetail", id] });
      queryClient.invalidateQueries({ queryKey: ["allOrders"] });
    },
    onError: (err) => {
      toastUI(err.response?.data.error, "error");
    },
  });

  if (!order) {
    return <NotFound message="No order found" bigSize={false} />;
  }

  return (
    <div className="container mx-auto h-full">
      <div className="mb-6">
        <div className="mb-2 flex items-center">
          <h3 className="text-2xl font-semibold">
            <span>Order </span>
            <span className="ltr:ml-2 rtl:mr-2">#{order.invoiceNo}</span>
          </h3>
          <select
            className="ms-8 w-[160px] cursor-pointer rounded-md border border-primary-600 px-1 py-2"
            name="status"
            id="status"
            onChange={(e) =>
              statusMutate({
                id: order._id,
                status: e.target.value as TOrderStatus,
              })
            }
            value={order.status}
          >
            {order.status === "Cancelled" && (
              <option value="Cancelled">Cancelled</option>
            )}
            {order.status !== "Cancelled" && (
              <>
                {order.status !== "Delivered" &&
                  order.status !== "Confirmed" && (
                    <option value="Pending">Pending</option>
                  )}
                {order.status !== "Delivered" && (
                  <option value="Confirmed">Confirmed</option>
                )}
                {(order.status === "Confirmed" ||
                  order.status === "Delivered") && (
                  <option value="Delivered">Delivered</option>
                )}
              </>
            )}
          </select>
        </div>
        <span className="flex items-center">
          <MdDateRange className="text-2xl" />
          <span className="ms-2 rtl:mr-1">
            {convertToDateString(order.createdAt)}
          </span>
        </span>
      </div>
      <div className="gap-6 xl:flex">
        <div className="w-full">
          <div className="card-border mb-4 border-0" role="presentation">
            <div>
              <div className="overflow-x-auto">
                <table className="w-full text-start">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item) => (
                      <tr>
                        <td>
                          <div className="flex items-center gap-3">
                            <span
                              className="avatar avatar-rounded"
                              style={{
                                width: "50px",
                                height: "50px",
                                minWidth: "50px",
                                lineHeight: "50px",
                                fontSize: "12px",
                              }}
                            >
                              <img
                                className="avatar-img avatar-rounded"
                                src={
                                  PUBLIC_ENDPOINTS.IMAGE_PRODUCTS +
                                  "/" +
                                  item.product.images[0]
                                }
                                loading="lazy"
                                alt="Product"
                              />
                            </span>
                            <div className="ltr:ml-2 rtl:mr-2">
                              <h6>{item.product.name}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span>{item.product.price}</span>
                        </td>
                        <td>{item.quantity}</td>
                        <td>
                          <span>
                            {formatCurrency(item.quantity * item.product.price)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full xl:max-w-[360px]">
          <div className="card card-border" role="presentation">
            <div className="card-body">
              <h5 className="mb-2 text-2xl font-semibold">Customer</h5>
              <span className="group flex items-center justify-between">
                <div className="flex items-center">
                  <div className="ltr:ml-2 rtl:mr-2">
                    <div className="font-semibold">
                      Full Name:{" "}
                      {order.customerInfo.firstName +
                        " " +
                        order.customerInfo.lastName}
                    </div>
                    <span>
                      <span className="font-semibold">11 </span>previous orders
                    </span>
                  </div>
                </div>
              </span>
              <hr className="my-5" />
              <span className="mb-4 flex items-center gap-2 text-gray-500">
                <MdOutlineEmail className="text-xl" />
                <span className="font-semibold">
                  {order.customerInfo.email}
                </span>
              </span>
              <span className="flex items-center gap-2 text-gray-500">
                <MdOutlineLocalPhone className="text-xl" />
                <span className="font-semibold">
                  {order.customerInfo.phone}
                </span>
              </span>
              <hr className="my-5" />
              <h6 className="mb-4 flex items-center gap-2 text-gray-500">
                <MdOutlineLocationOn className="text-xl" />
                <span>Shipping Address</span>
              </h6>
              <address className="not-italic text-gray-500">
                <div className="mb-1">
                  Zip Code: {order.shippingInfo.zipCode}
                </div>
                <div className="mb-1">Street: {order.shippingInfo.address}</div>
                <div className="mb-1">City: {order.shippingInfo.city}</div>
                <div>Country: {order.shippingInfo.country}</div>
              </address>
              <div className="mt-4 pb-20" role="presentation">
                <div className="card-body">
                  <h5 className="mb-2 text-2xl font-semibold">
                    Payment Summary
                  </h5>
                  <ul className="text-gray-500">
                    <li className="mb-3 flex items-center justify-between">
                      <span>Discount: </span>
                      <span className="font-semibold">
                        <span>{formatCurrency(order.discount)}</span>
                      </span>
                    </li>
                    <li className="mb-3 flex items-center justify-between">
                      <span>Delivery fee: </span>
                      <span className="font-semibold">
                        <span>
                          {formatCurrency(order.shippingInfo.cost || 10)}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Total: </span>
                      <span className="font-semibold">
                        <span>{formatCurrency(order.totalPrice)}</span>
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="mt-3 w-full text-center">
                  {order.paymentInfo.isPaid ? (
                    <span className="block w-full rounded-lg bg-red-600 py-2 font-semibold text-white transition-all">
                      This order is paid.
                    </span>
                  ) : (
                    <button
                      className="w-full rounded-lg bg-primary-600 py-2 font-semibold text-white transition-all hover:bg-primary-700"
                      onClick={() => updatePaidMutate(order._id)}
                    >
                      Paid ?
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
