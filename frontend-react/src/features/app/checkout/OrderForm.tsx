import { useForm } from "react-hook-form";
import { IoWalletSharp } from "react-icons/io5";
import { FaRegCreditCard } from "react-icons/fa";
import { PiArrowBendUpLeft } from "react-icons/pi";
import { HiArrowRight } from "react-icons/hi2";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "src/ui/Input";
import { checkoutSchema } from "src/zods/checkout";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";

interface OrderFormProps {
  coupon: string;
}

export default function OrderForm({ coupon }: OrderFormProps) {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="order-2 flex h-full flex-col sm:order-1 md:w-full lg:order-1 lg:w-3/5">
      <div className="mt-5 md:col-span-2 md:mt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h2 className="pb-3 text-base font-semibold text-gray-700">
              01. Personal Details
            </h2>
            <div className="flex justify-between gap-5">
              <div className="flex-1">
                <Input
                  label="First Name"
                  placeholder="Nguyen"
                  name="firstName"
                  type="string"
                  errors={errors}
                  register={register}
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Last Name"
                  placeholder="Chinh"
                  name="lastName"
                  type="string"
                  errors={errors}
                  register={register}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-between gap-5">
              <div className="flex-1">
                <Input
                  label="Email Address"
                  placeholder="youremail@gmail.com"
                  name="email"
                  type="string"
                  errors={errors}
                  register={register}
                />
              </div>
              <div className="flex-1">
                <Input
                  label="Phone Number"
                  placeholder="0899234654"
                  name="phone"
                  type="string"
                  errors={errors}
                  register={register}
                />
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="pb-3 text-base font-semibold text-gray-700">
              02. Shipping Details
            </h2>
            <div className="w-full">
              <Input
                label="Street Address"
                placeholder="123 Boulevard Rd, Beverley Hills"
                name="street"
                type="string"
                errors={errors}
                register={register}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between gap-5">
            <div className="flex-1">
              <Input
                label="City"
                placeholder="Los Angeles"
                name="city"
                type="string"
                errors={errors}
                register={register}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Country"
                placeholder="United States"
                name="country"
                type="string"
                errors={errors}
                register={register}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Zip Code"
                placeholder="2345"
                name="zipCode"
                type="string"
                errors={errors}
                register={register}
              />
            </div>
          </div>
          <div className="mt-8">
            <h2 className="pb-3 text-base font-semibold text-gray-700">
              03. Payment method
            </h2>
            <div className="flex w-full items-center justify-between gap-5">
              <div className="card flex-1 rounded-md border border-gray-200 bg-white px-3 py-4">
                <label className="label cursor-pointer">
                  <div className="item-center flex justify-between">
                    <div className="flex items-center">
                      <span className="mr-3 text-xl text-gray-400">
                        <IoWalletSharp />
                      </span>
                      <h6 className="text-sm font-medium text-gray-600">
                        Cash On Delivery
                      </h6>
                    </div>
                    <input
                      name="paymentMethod"
                      type="radio"
                      checked
                      className="radio-css text-emerald-500 accent-primary-600"
                      value="Cash"
                    />
                  </div>
                </label>
              </div>
              <div className="card flex-1 rounded-md border border-gray-200 bg-white px-3 py-4">
                <label className="label cursor-pointer">
                  <div className="item-center flex justify-between">
                    <div className="flex items-center">
                      <span className="mr-3 text-xl text-gray-400">
                        <FaRegCreditCard />
                      </span>
                      <h6 className="text-sm font-medium text-gray-600">
                        Credit Card
                      </h6>
                    </div>
                    <input
                      name="paymentMethod"
                      type="radio"
                      className="form-radio radio-css text-emerald-500 outline-none focus:ring-0"
                      value="Cash"
                    />
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-6 gap-4 lg:gap-6">
            <div className="col-span-6 sm:col-span-3">
              <a
                className="flex w-full justify-center rounded border border-indigo-100 bg-indigo-50 py-3 text-center text-sm font-medium text-gray-700 transition-all hover:border-gray-300 hover:text-gray-800"
                href="/"
              >
                <span className="mr-2 text-xl">
                  <PiArrowBendUpLeft />
                </span>
                Continue Shipping
              </a>
            </div>
            <div className="col-span-6 sm:col-span-3">
              <button
                type="submit"
                className="flex w-full justify-center rounded border border-emerald-500 bg-emerald-500 py-3 text-center text-sm font-medium text-white transition-all hover:bg-emerald-600"
              >
                <span className="flex justify-center text-center">
                  Confirm Order
                  <span className="ml-2 text-xl">
                    <HiArrowRight />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
