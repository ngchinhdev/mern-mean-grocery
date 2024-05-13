import { useForm, SubmitHandler } from "react-hook-form";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { IoSaveSharp } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";

export default function ProductEditor() {
  return (
    <div>
      <div className="mb-4 items-center justify-between lg:flex">
        <h1 className="mb-4 text-2xl font-semibold text-stone-800 lg:mb-0">
          Add New Product
        </h1>
      </div>
      <div className="w-full">
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
                    Product Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-5 py-3 focus:outline-primary-600"
                    placeholder="Name"
                    id="name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-base font-medium text-gray-500"
                  >
                    Description
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                  />
                </div>
              </div>
              <div className="mb-5">
                <h2 className="mb-1 text-xl font-medium">Pricing</h2>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label
                      htmlFor="price"
                      className="mb-2 block text-base font-medium text-gray-500"
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-5 py-3 focus:outline-primary-600"
                      placeholder="Price"
                      id="price"
                    />
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="orgPrice"
                      className="mb-2 block text-base font-medium text-gray-500"
                    >
                      Origin Price
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-5 py-3 focus:outline-primary-600"
                      placeholder="Origin Price"
                      id="orgPrice"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h2 className="mb-2 text-xl font-medium">Organization</h2>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label
                      htmlFor="quantity"
                      className="mb-2 block text-base font-medium text-gray-500"
                    >
                      Quantity
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-5 py-3 focus:outline-primary-600"
                      placeholder="Quantity"
                      id="quantity"
                    />
                  </div>
                  <div className="flex-1 self-stretch">
                    <label
                      htmlFor="category"
                      className="mb-2 block text-base font-medium text-gray-500"
                    >
                      Category
                    </label>
                    <select
                      name="category"
                      className="w-full rounded-lg border border-gray-300 px-5 py-3 text-gray-400 focus:outline-primary-600"
                      id="category"
                    >
                      <option value="hello">Hello</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-medium">Product Images</h2>
              <p className="mb-2">Add or change images of the product</p>
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
    </div>
  );
}
