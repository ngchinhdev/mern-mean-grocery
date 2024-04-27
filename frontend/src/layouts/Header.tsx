import { GoSearch } from "react-icons/go";

export default function Header() {
  return (
    <div className="bg-primary-600 p-3">
      <div className="flex items-center rounded-md bg-white px-4 py-3">
        <input
          type="search"
          name="search"
          id="search"
          placeholder="Search for products (e.g. fish, apple, oil)"
          className="w-full border-none text-sm focus:outline-none"
        />
        <span className="ps-2">
          <GoSearch className="text-lg text-gray-500" />
        </span>
      </div>
    </div>
  );
}
