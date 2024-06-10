import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlinePhoto } from "react-icons/md";

import { PUBLIC_ENDPOINTS } from "src/constants/url";
import { IUpdateUser, IUser } from "src/interfaces/auth";
import { getUserProfile } from "src/services/apiAuth";
import { AppDispatch, RootState } from "src/store/store";
import { setUserLogged } from "src/store/auth/authSlice";
import Input from "src/ui/Input";
import { updateUserSchema } from "src/zods/auth";
import Loader from "src/ui/Loader";
import { toastUI } from "src/utils/toast";

export default function UpdateProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUpdateUser>({
    resolver: zodResolver(updateUserSchema),
  });

  const { data: userProfile, isLoading } = useQuery<unknown, AxiosError, IUser>(
    {
      queryKey: ["userProfile"],
      queryFn: getUserProfile,
    },
  );

  useEffect(() => {
    if (userProfile) dispatch(setUserLogged(userProfile));
  }, [userProfile, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentUser) {
    toastUI("Something went wrong! No user found.", "error");
    return null;
  }

  const onSubmit = (data: IUpdateUser) => {
    console.log(data);
  };

  return (
    <>
      <h2 className="mb-5 text-xl font-semibold text-gray-600">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentUser.avatar ? (
          <div className="image-small-admin relative h-24 w-24 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-3 transition-all hover:border-primary-600">
            <img
              src={
                currentUser.avatar.startsWith("https://")
                  ? currentUser.avatar
                  : PUBLIC_ENDPOINTS.IMAGE_USERS + currentUser.avatar
              }
              className="h-full w-full"
              alt="avatar"
            />
            <div className="absolute inset-0 left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 scale-110 cursor-pointer items-center justify-center hover:flex">
              <FaRegTrashCan className="text-red-500" />
            </div>
          </div>
        ) : (
          <div className="relative h-24 w-24 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 transition-all hover:border-primary-600">
            <label
              htmlFor="image"
              className="z-10 mb-2 flex h-full w-full flex-col items-center justify-center gap-2 p-3 font-medium text-gray-500"
            >
              <MdOutlinePhoto />
              <span>Upload</span>
            </label>
            <input
              type="file"
              id="image"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
        )}
        <div className="mt-5 flex w-full gap-4">
          <Input
            register={register}
            errors={errors}
            label="Full Name"
            name="name"
            placeholder="Your full name"
            type="text"
            value={currentUser.name}
          />
          <Input
            register={register}
            errors={errors}
            label="Email"
            name="email"
            placeholder="Your email"
            type="text"
            value={currentUser.email}
          />
        </div>
        <div className="mt-5 flex w-full gap-4">
          <Input
            register={register}
            errors={errors}
            label="Phone Number"
            name="phone"
            placeholder="Your phone number"
            type="text"
            value={currentUser.phone}
          />
          <Input
            register={register}
            errors={errors}
            label="Address"
            name="address"
            placeholder="Your address"
            type="text"
            value={currentUser.address}
          />
        </div>
        <div className="mt-5 text-right">
          <button
            type="submit"
            className="mt-1 h-12 w-full cursor-pointer justify-center rounded-md border-0 border-transparent bg-primary-600 px-5 py-2 text-center text-sm font-medium leading-5 text-white placeholder-white transition duration-300 ease-in-out hover:bg-primary-700 hover:text-white focus:outline-none focus-visible:outline-none sm:w-auto md:px-6 md:py-3 md:text-sm lg:px-8 lg:py-3 lg:text-sm"
          >
            Update Profile
          </button>
        </div>
      </form>
    </>
  );
}
