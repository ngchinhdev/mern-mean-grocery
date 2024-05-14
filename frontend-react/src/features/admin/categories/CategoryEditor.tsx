import { IoMdImages } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";

export default function CategoryEditor() {
  return (
    <div>
      <div className="mb-4 items-center justify-between lg:flex">
        <h1 className="mb-4 text-2xl font-semibold text-stone-800 lg:mb-0">
          Add New Category
        </h1>
      </div>
      <form>
        <div className="flex w-full gap-6 pb-16">
          <div className="w-3/5">
            <div className="mb-5">
              <h2 className="mb-1 text-xl font-medium">Basic Information</h2>
              <div className="mb-3">
                <label
                  htmlFor="name"
                  className="mb-2 block text-base font-medium text-gray-500"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-5 py-3 focus:outline-primary-600"
                  placeholder="Name"
                  id="name"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-medium">Category Image</h2>
            <p className="mb-2">Add or change image of the category</p>
            <div className="flex items-center gap-3">
              <div className="relative h-24 w-24 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 transition-all hover:border-primary-600">
                <img
                  src="https://elstar.themenate.net/img/products/product-1.jpg"
                  className="h-100 w-full"
                  alt="Image"
                />
              </div>
              <div className="relative h-24 w-24 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 transition-all hover:border-primary-600">
                <label
                  htmlFor="image"
                  className="z-10 mb-2 flex h-full w-full flex-col items-center justify-center gap-2 p-3 font-medium text-gray-500"
                >
                  <span>
                    <IoMdImages className="text-4xl" />
                  </span>
                  <span>Upload</span>
                </label>
                <input
                  type="file"
                  id="image"
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="sticky bottom-0 -mx-8 flex items-center justify-between border-t border-gray-200 bg-white px-8 py-4">
          <div></div>
          <div className="items-center gap-3 md:flex">
            <button
              className="button radius-round rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-600 hover:bg-gray-50 active:bg-gray-100 ltr:mr-3 rtl:ml-3"
              type="button"
            >
              Discard
            </button>
            <button
              className="button radius-round rounded-md bg-primary-600 px-3 py-2 text-base text-white hover:bg-primary-700 active:bg-primary-700"
              type="submit"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-lg">
                  <IoSaveSharp />
                </span>
                <span className="ltr:ml-1 rtl:mr-1">Save</span>
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
