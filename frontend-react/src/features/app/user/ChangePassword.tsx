import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { IChangePassword } from "src/interfaces/auth";
import { RootState } from "src/store/store";
import { changePasswordSchema } from "src/zods/auth";
import Input from "src/ui/Input";
import Loader from "src/ui/Loader";
import { toastUI } from "src/utils/toast";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { changePassword } from "src/services/apiAuth";
import useLogoutUser from "src/hooks/useLogoutUser";

export default function ChangePassword() {
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const logoutUser = useLogoutUser();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IChangePassword>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      email: currentUser?.email,
    },
  });

  const { mutate: changePasswordMutation, isPending } = useMutation<
    unknown,
    // eslint-disable-next-line
    AxiosError<any, any>,
    IChangePassword
  >({
    mutationFn: (data) => changePassword(data),
    onSuccess: (res) => {
      console.log(res);
      toastUI("Your password updated successfully", "success");
      logoutUser();
    },
    onError: (err) => {
      toastUI(err.response?.data.error, "error");
    },
  });

  if (!currentUser) {
    // toastUI("Something went wrong! No user found.", "error");
    return;
  }

  const onSubmit = (data: IChangePassword) => {
    changePasswordMutation(data);
  };

  return (
    <>
      {isSubmitting ? (
        <Loader />
      ) : (
        <>
          <h2 className="mb-5 text-xl font-semibold text-gray-600">
            Change Password
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <Input
                disabled={true}
                register={register}
                errors={errors}
                label="Email"
                name="email"
                placeholder="Your email"
                type="text"
              />
            </div>
            <div className="mt-5">
              <Input
                register={register}
                errors={errors}
                label="Current Password"
                name="currentPassword"
                placeholder="Your current password"
                type="password"
              />
            </div>
            <div className="mt-5">
              <Input
                register={register}
                errors={errors}
                label="New Password"
                name="newPassword"
                placeholder="Your new password"
                type="password"
              />
            </div>
            <div className="mt-5 text-right">
              <button
                disabled={isPending || isSubmitting}
                className="mt-1 h-12 w-full cursor-pointer justify-center rounded-md border-0 border-transparent bg-primary-600 px-5 py-2 text-center text-sm font-medium leading-5 text-white placeholder-white transition duration-300 ease-in-out hover:bg-primary-700 hover:text-white focus:outline-none focus-visible:outline-none sm:w-auto md:px-6 md:py-3 md:text-sm lg:px-8 lg:py-3 lg:text-sm"
              >
                Update Password
              </button>
            </div>
          </form>
        </>
      )}
    </>
  );
}
