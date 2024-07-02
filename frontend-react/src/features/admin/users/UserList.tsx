import { Pagination } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSelector } from "react-redux";

import { PUBLIC_ENDPOINTS } from "src/constants/url";
import { toastUI } from "src/utils/toast";
import { changeRole, getAllUsers } from "src/services/apiAuth";
import NotFound from "src/ui/NotFound";
import Loader from "src/ui/Loader";
import { RootState } from "src/store/store";

const PER_PAGE = 10;

export default function UserList() {
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const queryClient = useQueryClient();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const start = (curPage - 1) * PER_PAGE;
  const end = curPage * PER_PAGE;

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    setCurPage(page);
  };

  const {
    data: users,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  useEffect(() => {
    if (users) {
      setTotalPages(Math.ceil(users.length / PER_PAGE));
    }
  }, [users]);

  const { mutate: changeRoleMutate, isPending } = useMutation<
    unknown,
    // eslint-disable-next-line
    AxiosError<any, any>,
    { id: string; isAdmin: boolean }
  >({
    mutationFn: ({ id, isAdmin }) => changeRole(id, isAdmin),
    onSuccess: () => {
      toastUI("Updated role successfully", "success");
      queryClient.invalidateQueries({ queryKey: ["allUsers"] });
    },
    onError: (err) => {
      toastUI(err.response?.data.error, "error");
    },
  });

  const handleChangeRole = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
    console.log(e.target.value);
    changeRoleMutate({ id, isAdmin: e.target.value !== "0" });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!users?.length || isError) {
    return <NotFound message="No users found." bigSize={false} />;
  }

  return (
    <div
      className={`${isPending ? "pointer-events-none opacity-90" : "pointer-events-auto opacity-100"}`}
    >
      <div className="mb-4 items-center justify-between lg:flex">
        <h1 className="mb-4 text-2xl font-semibold text-stone-800 lg:mb-0">
          Users
        </h1>
        <div></div>
      </div>
      <div>
        <table className="w-full text-left text-gray-600">
          <thead className="bg-[#f5f5f5] text-sm">
            <tr>
              <th className="uppercase">Name</th>
              <th className="uppercase">Avatar</th>
              <th className="uppercase">Email</th>
              <th className="uppercase">Phone</th>
              <th className="uppercase">Address</th>
              <th className="uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .slice(start, end)
              .filter((u) => u._id !== currentUser?._id)
              .map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>
                    <img
                      src={
                        u.avatar.startsWith("https://") ||
                        u.avatar.startsWith("data:")
                          ? u.avatar
                          : PUBLIC_ENDPOINTS.IMAGE_USERS + "/" + u.avatar
                      }
                      alt={u.name}
                      className="h-10 w-10 rounded-md"
                    />
                  </td>
                  <td>{u.email}</td>
                  <td>{u.phone ? u.phone : "Not yet"}</td>
                  <td>{u.address ? u.address : "Not yet"}</td>
                  <td>
                    <select
                      name="role"
                      id="role"
                      role="button"
                      onChange={(e) => handleChangeRole(e, u._id)}
                      value={u.isAdmin ? "1" : "0"}
                      className="rounded-md border border-primary-600 px-2 py-1 active:border-primary-700"
                    >
                      <option value="1">Admin</option>
                      <option value="0">User</option>
                    </select>
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
