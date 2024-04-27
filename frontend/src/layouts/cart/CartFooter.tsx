export default function CartFooter() {
  return (
    <div className="mx-5 my-3">
      <button className="bg-heading flex w-full items-center justify-between rounded-lg bg-primary-600 px-3 py-3 text-sm text-white transition duration-300 hover:bg-primary-600 focus:outline-none sm:text-base">
        <span className="align-middle font-medium">Proceed To Checkout</span>
        <span className="rounded-lg bg-white px-3 py-2 font-bold text-primary-600">
          $50.00
        </span>
      </button>
    </div>
  );
}
