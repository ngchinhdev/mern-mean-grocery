import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toastUI } from "src/utils/toast";
import NotFound from "src/ui/NotFound";
import { ICoupon } from "src/interfaces/coupon";
import { deleteCoupon, getAllCoupons } from "src/services/apiCoupons";
import { convertToDateString, formatCurrency } from "src/utils/helpers";
import Loader from "src/ui/Loader";

const PER_PAGE = 10;

export default function CategoryList() {
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const queryClient = useQueryClient();

  const start = (curPage - 1) * PER_PAGE;
  const end = curPage * PER_PAGE;

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setCurPage(page);
  };

  const {
    data: allCoupons,
    isLoading,
    isError,
  } = useQuery<ICoupon[]>({
    queryKey: ["allCoupons"],
    queryFn: getAllCoupons,
  });
  useEffect(() => {
    if (allCoupons) {
      setTotalPages(Math.ceil(allCoupons.length / PER_PAGE));
    }
  }, [allCoupons]);

  const { mutate: deleteMutate, isPending } = useMutation<
    unknown,
    // eslint-disable-next-line
    AxiosError<any, any>,
    string
  >({
    mutationFn: (id: string) => deleteCoupon(id),
    onSuccess: () => {
      toastUI("Delete coupon successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["allCoupons"] });
    },
    onError: (err) => {
      toastUI(err.response?.data.error, "error");
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (!allCoupons?.length || isError) {
    return <NotFound message="No coupons found" bigSize={false} />;
  }

  return (
    <div
      className={`${isPending ? "pointer-events-none opacity-90" : "pointer-events-auto opacity-100"}`}
    >
      <div className="mb-4 items-center justify-between lg:flex">
        <h1 className="mb-4 text-2xl font-semibold text-stone-800 lg:mb-0">
          Coupons
        </h1>
        <div>
          <Link
            to="/admin/coupons/add"
            className="flex items-center gap-2 rounded-md bg-primary-600 px-3 py-2 text-base font-semibold text-white hover:text-white"
          >
            <FaCirclePlus />
            Add Coupon
          </Link>
        </div>
      </div>
      <div>
        <table className="w-full text-left text-gray-600">
          <thead className="bg-[#f5f5f5] text-sm">
            <tr>
              <th className="uppercase">Code</th>
              <th className="uppercase">Discount</th>
              <th className="uppercase">Start Date</th>
              <th className="uppercase">End Date</th>
              <th className="uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allCoupons.slice(start, end).map((cp) => (
              <tr key={cp._id}>
                <td>{cp.code}</td>
                <td>{formatCurrency(cp.discount)}</td>
                <td>{convertToDateString(cp.startTime)}</td>
                <td>{convertToDateString(cp.endTime)}</td>
                <td>
                  <div className="flex items-center gap-4">
                    <Link
                      className="flex items-center"
                      to={`/admin/coupons/edit/${cp._id}`}
                    >
                      <LuPencil className="text-xl text-blue-500" />
                    </Link>
                    <button className="flex items-center">
                      <FaRegTrashAlt
                        className="text-xl text-red-500"
                        onClick={() => deleteMutate(cp._id)}
                      />
                    </button>
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
    </div>
  );
}
