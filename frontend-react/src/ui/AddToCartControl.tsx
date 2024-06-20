import { FiMinus, FiPlus } from "react-icons/fi";

interface AddToCartControlProps {
  quantityAddCart: number;
  onIncreaseQuantity: () => void;
  onDecreaseQuantity: () => void;
  onAddToCart: () => void;
}

export default function AddToCartControl({
  quantityAddCart,
  onAddToCart,
  onDecreaseQuantity,
  onIncreaseQuantity,
}: AddToCartControlProps) {
  return (
    <div className="mt-4 flex items-center">
      <div className="space-s-3 sm:space-s-4 flex w-full items-center justify-between">
        <div className="group flex h-11 flex-shrink-0 items-center justify-between overflow-hidden rounded-md border border-gray-300 md:h-12">
          <button
            className="text-heading flex h-full w-8 flex-shrink-0 items-center justify-center border-e border-gray-300 transition duration-300 ease-in-out hover:text-gray-500 focus:outline-none md:w-12"
            onClick={onDecreaseQuantity}
          >
            <FiMinus />
          </button>
          <p className="duration-250 text-heading flex h-full w-8 flex-shrink-0 cursor-default items-center justify-center text-base font-semibold transition-colors ease-in-out md:w-20 xl:w-24">
            {quantityAddCart}
          </p>
          <button
            className="text-heading flex h-full w-8 flex-shrink-0 items-center justify-center border-s border-gray-300 transition duration-300 ease-in-out hover:text-gray-500 focus:outline-none md:w-12"
            onClick={onIncreaseQuantity}
          >
            <FiPlus />
          </button>
        </div>
        <button
          className="ml-4 inline-flex h-12 w-full cursor-pointer items-center justify-center text-nowrap rounded-md border-0 border-transparent bg-primary-600 px-4 py-4 text-center text-sm font-semibold leading-4 text-white transition duration-300 ease-in-out hover:bg-primary-700 hover:text-white focus:outline-none focus-visible:outline-none md:px-6 md:py-3.5 lg:px-8 lg:py-4"
          onClick={onAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
