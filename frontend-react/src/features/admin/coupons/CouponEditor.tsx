import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoSaveSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

import { ICreateCoupon } from "src/interfaces/coupon";
import {
  createCoupon,
  getCouponById,
  updateCoupon,
} from "src/services/apiCoupons";
import Input from "src/ui/Input";
import Loader from "src/ui/Loader";
import NotFound from "src/ui/NotFound";
import { toastUI } from "src/utils/toast";
import { createCouponSchema } from "src/zods/coupon";

export default function CouponEditor() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data: coupon,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["coupon", id],
    queryFn: () => getCouponById(id as string),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreateCoupon>({
    resolver: zodResolver(createCouponSchema),
    defaultValues: {
      code: "",
      discount: 0,
      endTime: "",
      startTime: "",
    },
  });

  useEffect(() => {
    if (coupon) {
      setValue("code", coupon.code);
      setValue("discount", coupon.discount);
      setValue("startTime", coupon.startTime.substring(0, 16));
      setValue("endTime", coupon.endTime.substring(0, 16));
    }
  }, [coupon, setValue]);

  const { mutate: couponMutate, isPending } = useMutation<
    unknown,
    // eslint-disable-next-line
    AxiosError<any, any>,
    ICreateCoupon
  >({
    mutationFn: (data: ICreateCoupon) =>
      id ? updateCoupon(data, id) : createCoupon(data),
    onSuccess: () => {
      toastUI(
        `${id ? "Update" : "Create new"} coupon successfully.`,
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["coupon", id] });
      queryClient.invalidateQueries({ queryKey: ["allCoupons"] });
      navigate("/admin/coupons/list");
    },
    onError: (err) => {
      toastUI(err.response?.data.error, "error");
    },
  });

  const onSubmit = (data: ICreateCoupon) => {
    couponMutate(data);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <NotFound message="Coupon not found." bigSize={false} />;
  }

  return (
    <div>
      <div className="mb-4 items-center justify-between lg:flex">
        <h1 className="mb-4 text-2xl font-medium text-stone-800 lg:mb-0">
          {id ? "Edit Coupon" : "Add New Coupon"}
        </h1>
      </div>
      <div className="w-full">
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full gap-6 pb-16">
            <div className="w-3/5">
              <div className="mt-5">
                <Input
                  errors={errors}
                  label="Coupon Code"
                  name="code"
                  placeholder="Enter coupon code"
                  register={register}
                  type="text"
                />
              </div>
              <div className="mt-5">
                <Input
                  min={1}
                  errors={errors}
                  label="Discount"
                  name="discount"
                  placeholder="Enter coupon discount"
                  register={register}
                  type="number"
                />
              </div>
              <div className="mt-5">
                <Input
                  errors={errors}
                  label="Start Time"
                  name="startTime"
                  placeholder="Enter start time"
                  register={register}
                  type="datetime-local"
                />
              </div>
              <div className="mt-5">
                <Input
                  errors={errors}
                  label="End Time"
                  name="endTime"
                  placeholder="Enter end time"
                  register={register}
                  type="datetime-local"
                />
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 -mx-8 flex items-center justify-between border-t border-gray-200 bg-white px-8 py-4">
            <div></div>
            <div className="items-center gap-3 md:flex">
              <button
                className="button radius-round rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-600 hover:bg-gray-50 active:bg-gray-100 ltr:mr-3 rtl:ml-3"
                type="button"
              >
                Discard
              </button>
              <button
                disabled={isPending}
                className="button radius-round rounded-md bg-primary-600 px-3 py-2 text-base text-white hover:bg-primary-700 active:bg-primary-700"
                type="submit"
              >
                <span className="flex items-center gap-2">
                  <IoSaveSharp />
                  <span>Save</span>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
