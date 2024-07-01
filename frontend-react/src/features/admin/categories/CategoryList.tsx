import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { deleteCategory, getAllCategories } from "src/services/apiCategories";
import { PUBLIC_ENDPOINTS } from "src/constants/url";
import { toastUI } from "src/utils/toast";
import NotFound from "src/ui/NotFound";

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

  const { data: categories, isError } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  });

  useEffect(() => {
    if (categories) {
      setTotalPages(Math.ceil(categories.length / PER_PAGE));
    }
  }, [categories]);

  const { mutate: deleteMutate, isPending } = useMutation<
    unknown,
    // eslint-disable-next-line
    AxiosError<any, any>,
    string
  >({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess: () => {
      toastUI("Delete category successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
    },
    onError: (err) => {
      toastUI(err.response?.data.error, "error");
    },
  });

  return (
    <div
      className={`${isPending ? "pointer-events-none opacity-90" : "pointer-events-auto opacity-100"}`}
    >
      <div className="mb-4 items-center justify-between lg:flex">
        <h1 className="mb-4 text-2xl font-semibold text-stone-800 lg:mb-0">
          Categories
        </h1>
        <div>
          <Link
            to="/admin/categories/add"
            className="flex items-center gap-2 rounded-md bg-primary-600 px-3 py-2 text-base font-semibold text-white hover:text-white"
          >
            <FaCirclePlus />
            Add Category
          </Link>
        </div>
      </div>
      <div>
        {isError ? (
          <NotFound message="No categories found" bigSize={false} />
        ) : (
          <>
            <table className="w-full text-left text-gray-600">
              <thead className="bg-[#f5f5f5] text-sm">
                <tr>
                  <th className="uppercase">Name</th>
                  <th className="uppercase">Image</th>
                  <th className="uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.slice(start, end).map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>
                      <img
                        src={PUBLIC_ENDPOINTS.IMAGE_CATEGORIES + "/" + c.image}
                        alt={c.name}
                        className="h-10 w-10 rounded-md"
                      />
                    </td>
                    <td>
                      <div className="flex items-center gap-4">
                        <Link
                          className="flex items-center"
                          to={`/admin/categories/edit/${c._id}`}
                        >
                          <LuPencil className="text-xl text-blue-500" />
                        </Link>
                        <button className="flex items-center">
                          <FaRegTrashAlt
                            className="text-xl text-red-500"
                            onClick={() => deleteMutate(c._id)}
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
          </>
        )}
      </div>
    </div>
  );
}
