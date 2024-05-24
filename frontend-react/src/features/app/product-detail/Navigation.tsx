import { RiArrowRightSLine } from "react-icons/ri";

export default function Navigation() {
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
          <a href="/search?category=fresh-vegetable&amp;_id=632aca374d87ff2494210bf0">
            <button type="button">fresh-vegetable</button>
          </a>
        </li>
        <li className="mt-[1px] text-sm">
          <RiArrowRightSLine />
        </li>
        <li className="px-1 text-sm transition duration-200 ease-in ">
          Rainbow Chard
        </li>
      </ol>
    </div>
  );
}
