import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Link } from "react-router-dom";

import { IOrder } from "src/interfaces/order";
import { cancelOrder, getOrdersByUser } from "src/services/apiOrder";
import Loader from "src/ui/Loader";
import NotFound from "src/ui/NotFound";
import { convertToDateString, formatCurrency } from "src/utils/helpers";
import { toastUI } from "src/utils/toast";
import DialogPopup from "src/ui/Dialog";

interface OrderItemProps {
  order: IOrder;
  isConfirmCancel: boolean;
  onOpen: () => void;
}

const PER_PAGE = 10;

function OrderItem({ order, isConfirmCancel, onOpen }: OrderItemProps) {
  const queryClient = useQueryClient();

  const { mutate: cancelOrderMutate } = useMutation({
    mutationFn: (id: string) => cancelOrder(id),
    onSuccess: () => {
      toastUI("Order is cancelled", "success");
      // onChangeStatus();
      queryClient.invalidateQueries({ queryKey: ["ordersUser"] });
    },
    onError: () => {
      toastUI("Failed to cancel order", "error");
    },
  });

  const handleCancelOrder = (id: string) => {
    onOpen();
    // if (isConfirmCancel) {
    //   cancelOrderMutate(id);
    // }
  };

  // useEffect(() => {
  //   cancelOrderMutate(order._id);
  // }, [cancelOrderMutate, isConfirmCancel, order._id]);

  return (
    <tr>
      <td className="whitespace-nowrap px-5 py-3 leading-6">
        <span className="text-sm font-medium uppercase">
          #{order.invoiceNo}
        </span>
      </td>
      <td className="whitespace-nowrap px-5 py-3 text-center leading-6">
        <span className="text-sm">{convertToDateString(order.createdAt)}</span>
      </td>
      <td className="whitespace-nowrap px-5 py-3 text-center leading-6">
        <span className="text-sm">{order.paymentInfo.paymentMethod}</span>
      </td>
      <td className="whitespace-nowrap px-5 py-3 text-center text-sm font-medium leading-6">
        <span className="text-orange-500">{order.status}</span>
      </td>
      <td className="whitespace-nowrap px-5 py-3 text-center leading-6">
        <span className="text-sm font-bold">
          {formatCurrency(order.totalPrice)}
        </span>
      </td>
      <td className="whitespace-nowrap px-5 py-3 text-center text-sm">
        <Link
          className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-600 transition-all hover:bg-primary-500 hover:text-white"
          to={"/user/order/" + order._id}
        >
          Details
        </Link>
        {order.status === "Pending" && (
          <span
            role="button"
            onClick={onOpen}
            className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition-all hover:bg-red-500 hover:text-white"
          >
            Cancel
          </span>
        )}
      </td>
    </tr>
  );
}

export default function MyOrders() {
  const [curPage, setCurPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);

  const start = (curPage - 1) * PER_PAGE;
  const end = curPage * PER_PAGE;

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["ordersUser"],
    queryFn: getOrdersByUser,
  });

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setCurPage(page);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  if (isLoading) {
    return <Loader type="normal" />;
  }

  if (!orders?.length || isError) {
    return <NotFound message="No orders found" bigSize={false} />;
  }

  const totalPages = Math.ceil(orders.length / PER_PAGE);

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
                  {orders
                    ?.slice(start, end)
                    .map((order) => (
                      <OrderItem
                        onOpen={handleOpenPopup}
                        key={order._id}
                        isConfirmCancel={confirmCancel}
                        order={order}
                      />
                    ))}
                </tbody>
              </table>
              <div className="mt-4">
                <Pagination
                  count={totalPages}
                  variant="outlined"
                  shape="rounded"
                  page={curPage}
                  onChange={handleChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <DialogPopup
        setIsConfirm={setConfirmCancel}
        isOpen={isOpen}
        onClose={handleClosePopup}
        widthSet="200px"
        isConfirmation={true}
      >
        ok?
      </DialogPopup>
    </div>
  );
}
