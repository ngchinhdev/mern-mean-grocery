import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { IProduct } from "src/interfaces/product";

interface NavigationProps {
  product: IProduct;
}

export default function Navigation({ product }: NavigationProps) {
  return (
    <div className="flex items-center pb-4">
      <ol className="flex w-full items-center overflow-hidden">
        <li className="cursor-pointer pr-1 text-sm font-semibold transition duration-200 ease-in hover:text-emerald-500">
          <a href="/">Home</a>
        </li>
        <li className="mt-[1px] text-sm">
          <RiArrowRightSLine />
        </li>
        <li className="cursor-pointer pl-1 text-sm font-semibold transition duration-200 ease-in hover:text-emerald-500 ">
          <Link to={"/products/category/" + product.categoryId._id}>
            <button type="button">{product.categoryId.name}</button>
          </Link>
        </li>
        <li className="mt-[1px] text-sm">
          <RiArrowRightSLine />
        </li>
        <li className="px-1 text-sm transition duration-200 ease-in ">
          {product.name}
        </li>
      </ol>
    </div>
  );
}
