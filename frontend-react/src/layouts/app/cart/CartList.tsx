import CartItem from "./CartItem";

export default function CartList() {
  return (
    <ul className="scrollbar-hide max-h-full w-full flex-grow overflow-y-scroll">
      <CartItem />
    </ul>
  );

  return (
    <div className="scrollbar-hide max-h-full w-full flex-grow overflow-y-scroll">
      <div className="flex h-full flex-col justify-center">
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
            <span className="block text-4xl text-emerald-600">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z"></path>
              </svg>
            </span>
          </div>
          <h3 className="pt-5 text-lg font-semibold text-gray-700">
            Your cart is empty
          </h3>
          <p className="px-12 pt-2 text-center text-sm text-gray-500">
            No items added in your cart. Please add product to your cart list.
          </p>
        </div>
      </div>
    </div>
  );
}
