import { SortType } from ".";

type FilterBarProps = {
  itemLength?: number;
  sortType: "0" | "1" | "-1";
  onSetSortType: (type: SortType) => void;
};

export default function FilterBar({
  itemLength,
  sortType,
  onSetSortType,
}: FilterBarProps) {
  return (
    <div className="mx-auto my-8 flex max-w-screen-2xl items-center justify-between rounded border border-gray-100 bg-orange-100 p-3">
      <h6 className="text-sm">
        Total <span className="font-bold">{itemLength || 0}</span> Items Found
      </h6>
      <span className="text-sm">
        <select
          className="block w-full cursor-pointer rounded border-0 bg-white p-1 pr-10 text-sm font-medium focus:ring-0"
          onChange={(e) => onSetSortType(e.target.value as SortType)}
          value={sortType}
        >
          <option className="px-1" value="0">
            Sort By Price
          </option>
          <option className="px-1" value="1">
            Low to High
          </option>
          <option className="px-1" value="-1">
            High to Low
          </option>
        </select>
      </span>
    </div>
  );
}
