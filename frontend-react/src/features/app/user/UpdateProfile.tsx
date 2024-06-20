import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlinePhoto } from "react-icons/md";

import { PUBLIC_ENDPOINTS } from "src/constants/url";
import { IUpdateUser, IUser } from "src/interfaces/auth";
import { getUserProfile, updateProfile } from "src/services/apiAuth";
import { AppDispatch, RootState } from "src/store/store";
import { setUserLogged } from "src/store/auth/authSlice";
import Input from "src/ui/Input";
import { updateUserSchema } from "src/zods/auth";
import Loader from "src/ui/Loader";
import { toastUI } from "src/utils/toast";
import { IResponseDataCommon } from "src/interfaces/share";

export default function UpdateProfile() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  const [avatar, setAvatar] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      address: "",
      name: "",
      phone: "",
      email: "",
    },
  });

  const {
    data: userProfile,
    isLoading,
    isError,
  } = useQuery<unknown, AxiosError, IUser>({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  const { mutate: updateUserMutation, isPending } = useMutation<
    IResponseDataCommon<IUser>,
    AxiosError,
    IUpdateUser
  >({
    mutationFn: (data) => updateProfile(data),
    onSuccess: () => {
      toastUI("Your profile updated successfully", "success");
    },
    onError: (err) => {
      if (err.response?.status === 409) {
        toastUI("Email or phone number is already use", "error");
      } else {
        toastUI("Updated fail", "error");
      }
    },
  });

  useEffect(() => {
    if (userProfile) {
      dispatch(setUserLogged(userProfile));
      setAvatar(userProfile.avatar);
      setValue("name", userProfile.name);
      setValue("email", userProfile.email);
      setValue("phone", userProfile.phone);
      setValue("address", userProfile.address);
    }
  }, [userProfile, dispatch, setValue]);

  const handleSelectAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
      setSelectedFile(e.target.files?.[0]);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (!currentUser || isError) {
    // toastUI("Something went wrong! No user found.", "error");
    return null;
  }

  const onSubmit = (data: IUpdateUser) => {
    updateUserMutation({ ...data, avatar: selectedFile });
  };

  return (
    <>
      <h2 className="mb-5 text-xl font-semibold text-gray-600">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {avatar ? (
          <div className="image-small-admin relative h-24 w-24 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-3 transition-all hover:border-primary-600">
            <img
              src={
                avatar.startsWith("https://") || avatar.startsWith("data:")
                  ? avatar
                  : PUBLIC_ENDPOINTS.IMAGE_USERS + "/" + avatar
              }
              className="h-full w-full"
              alt="avatar"
            />
            <span className="trash hidden">
              <div className="absolute inset-0 left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 scale-110 items-center justify-center">
                <FaRegTrashCan
                  className="cursor-pointer text-red-500 "
                  onClick={() => setAvatar("")}
                />
              </div>
            </span>
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
              {...register("avatar")}
              onChange={handleSelectAvatar}
              type="file"
              id="image"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
        )}
        <div className="mt-5 flex w-full flex-col gap-4 md:flex-row">
          <Input
            register={register}
            errors={errors}
            label="Full Name"
            name="name"
            placeholder="Your full name"
            type="text"
          />
          <Input
            register={register}
            errors={errors}
            label="Email"
            name="email"
            placeholder="Your email"
            type="text"
          />
        </div>
        <div className="mt-5 flex w-full flex-col gap-4 md:flex-row">
          <Input
            register={register}
            errors={errors}
            label="Phone Number"
            name="phone"
            placeholder="Your phone number"
            type="text"
          />
          <Input
            register={register}
            errors={errors}
            label="Address"
            name="address"
            placeholder="Your address"
            type="text"
          />
        </div>
        <div className="mt-5 text-right">
          <button
            type="submit"
            disabled={isSubmitting || isLoading || isPending}
            className="mt-1 h-12 w-full cursor-pointer justify-center rounded-md border-0 border-transparent bg-primary-600 px-5 py-2 text-center text-sm font-medium leading-5 text-white placeholder-white transition duration-300 ease-in-out hover:bg-primary-700 hover:text-white focus:outline-none focus-visible:outline-none sm:w-auto md:px-6 md:py-3 md:text-sm lg:px-8 lg:py-3 lg:text-sm"
          >
            {isSubmitting || isPending ? "Submitting..." : "Update Profile"}
          </button>
        </div>
      </form>
    </>
  );
}
