import OrderForm from "./OrderForm";
import OrderSummary from "./OrderSummary";

export default function CheckoutFeature() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="flex w-full flex-col px-0 py-10 md:flex-row lg:flex-row lg:py-12 xl:max-w-screen-xl 2xl:max-w-screen-2xl">
          <OrderForm />
          <OrderSummary />
        </div>
      </div>
    </section>
  );
}
