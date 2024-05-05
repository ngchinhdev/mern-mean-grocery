export default function FilterBar() {
  return (
    <div className="mx-auto my-8 flex max-w-screen-2xl items-center justify-between rounded border border-gray-100 bg-orange-100 p-3">
      <h6 className="text-sm">
        Total <span className="font-bold">9</span> items Found
      </h6>
      <span className="text-sm">
        <select className="block w-full cursor-pointer rounded border-0 bg-white p-1 pr-10 text-sm font-medium focus:ring-0">
          <option className="px-3" value="All">
            Sort By Price
          </option>
          <option className="px-3" value="Low">
            Low to High
          </option>
          <option className="px-3" value="High">
            High to Low
          </option>
        </select>
      </span>
    </div>
  );
}
