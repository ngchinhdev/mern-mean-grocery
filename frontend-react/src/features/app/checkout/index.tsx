import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";
import { ICoupon } from "src/interfaces/coupon";
import { getCouponByCode } from "src/services/apiCoupons";
import { toastUI } from "src/utils/toast";

export default function CheckoutFeature() {
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const { data, isLoading, error } = useQuery<ICoupon | undefined>({
    queryKey: ["coupon", coupon],
    queryFn: () => getCouponByCode(coupon),
    enabled: !!coupon,
  });

  const handleEnterCoupon = (coupon: string) => {
    setCoupon(coupon);
  };

  useEffect(() => {
    if (data) {
      setDiscount(data.discount);
      toastUI("Coupon is applied", "success");
    }

    if (error) {
      setDiscount(0);
      toastUI("Coupon not found", "error");
    }
  }, [data, error]);

  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="flex w-full flex-col px-0 py-10 md:flex-row lg:flex-row lg:py-12 xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <OrderForm discount={discount} />
          <OrderSummary
            isLoadingCoupon={isLoading}
            onEnterCoupon={handleEnterCoupon}
            discount={discount}
          />
        </div>
      </div>
    </section>
  );
}
