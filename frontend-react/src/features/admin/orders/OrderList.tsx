import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FaRegEye } from "react-icons/fa";

import NotFound from "src/ui/NotFound";
import { getAllOrders } from "src/services/apiOrder";
import { convertToDateString, formatCurrency } from "src/utils/helpers";
import { TOrderStatus } from "src/interfaces/order";
import Loader from "src/ui/Loader";

const PER_PAGE = 10;

const getStatusClass = (status: TOrderStatus) => {
  switch (status) {
    case "Pending":
      return "pending-st";
    case "Cancelled":
      return "cancel-st";
    case "Delivered":
      return "delivered-st";
    case "Confirmed":
      return "confirmed-st";
    default:
      return "";
  }
};

export default function OrderList() {
  const [curPage, setCurPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState<TOrderStatus | "">("");
  const [totalPages, setTotalPages] = useState(0);

  const start = (curPage - 1) * PER_PAGE;
  const end = curPage * PER_PAGE;

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setCurPage(page);
  };

  const {
    data: orders,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["allOrders"],
    queryFn: getAllOrders,
  });

  useEffect(() => {
    if (orders) {
      setTotalPages(
        Math.ceil(
          orders.filter((o) =>
            filterStatus ? o.status === filterStatus : true,
          ).length / PER_PAGE,
        ),
      );
    }
  }, [orders, filterStatus]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="mb-4 items-center justify-between lg:flex">
        <h1 className="mb-4 text-2xl font-semibold text-stone-800 lg:mb-0">
          Orders
        </h1>
        <select
          name="filterStatus"
          id="filterStatus"
          className="ms-8 w-[160px] cursor-pointer rounded-md border border-primary-600 px-1 py-2"
          onChange={(e) => setFilterStatus(e.target.value as TOrderStatus | "")}
        >
          <option value="">Status</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      {isError ||
      !orders?.filter((o) => (filterStatus ? o.status === filterStatus : true))
        .length ? (
        <NotFound message="No orders found." bigSize={false} />
      ) : (
        <div>
          <table className="w-full text-left text-gray-600">
            <thead className="bg-[#f5f5f5] text-sm">
              <tr>
                <th className="uppercase">ID</th>
                <th className="uppercase">Date</th>
                <th className="uppercase">Customer</th>
                <th className="uppercase">Status</th>
                <th className="uppercase">Payment Method</th>
                <th className="uppercase">Total</th>
                <th className="uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders
                .filter((o) =>
                  filterStatus ? o.status === filterStatus : true,
                )
                .slice(start, end)
                .map((o) => (
                  <tr>
                    <td className="flex items-center">#{o.invoiceNo}</td>
                    <td>{convertToDateString(o.createdAt)}</td>
                    <td>
                      {o.customerInfo.firstName + " " + o.customerInfo.lastName}
                    </td>
                    <td>
                      <td>
                        <span
                          className={`rounded-md px-2 py-1 ${getStatusClass(o.status)}`}
                        >
                          {o.status}
                        </span>
                      </td>
                    </td>
                    <td>{o.paymentInfo.paymentMethod}</td>
                    <td>{formatCurrency(o.totalPrice)}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <Link
                          to={"/admin/orders/detail/" + o._id}
                          className="flex items-center"
                        >
                          <FaRegEye className="text-2xl text-blue-500" />
                        </Link>
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="h-5 w-5 cursor-pointer"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="float-end mt-4">
            <Pagination
              count={totalPages}
              variant="outlined"
              shape="rounded"
              page={curPage}
              onChange={handleChangePage}
            />
          </div>
        </div>
      )}
    </div>
  );
}
