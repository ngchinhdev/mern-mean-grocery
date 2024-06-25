import { useForm, SubmitHandler } from "react-hook-form";
import classNameNameicEditor from "@ckeditor/ckeditor5-build-classNameNameic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import { IoSaveSharp } from "react-icons/io5";
import { IoMdImages } from "react-icons/io";

export default function ProductEditor() {
  return (
    <>
      <div>
        <div className="mb-4 items-center justify-between lg:flex">
          <h1 className="mb-4 text-2xl font-medium text-stone-800 lg:mb-0">
            {0 ? "Edit Product" : "Add New Product"}
          </h1>
        </div>
        <form className="pb-10" encType="multipart/form-data">
          <div className="w-full">
            <div className="flex w-full gap-6 pb-16">
              <div className="w-3/5">
                <div className="mb-5">
                  <h2 className="mb-1 text-xl font-medium">
                    Basic Information
                  </h2>
                  <div className="mb-3 flex gap-3">
                    <div className="flex-[3]">
                      <label
                        htmlFor="name"
                        className="mb-2 block font-medium text-gray-500"
                      >
                        Product Name
                      </label>
                      <input
                        type="text"
                        className="h-12 w-full rounded-lg border border-gray-300 px-5 py-3 focus:outline-primary-600"
                        placeholder="Name"
                        id="name"
                      />

                      <small className="inline-block pt-1 text-[15px] text-red-600">
                        (*) Name is required
                      </small>
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="hot"
                        className="mb-2 block font-medium text-gray-500"
                      >
                        Hot
                      </label>
                      <select
                        name="hot"
                        className="h-12 w-full rounded-lg border border-gray-300 px-5 py-3 text-gray-400 focus:outline-primary-600"
                        id="hot"
                      >
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                      <small className="inline-block pt-1 text-[15px] text-red-600">
                        (*) Hot is required
                      </small>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block font-medium text-gray-500"
                    >
                      Description
                    </label>
                    editor
                    <small className="inline-block pt-1 text-[15px] text-red-600">
                      (*) Description is required
                    </small>
                  </div>
                </div>
                <div className="mb-5">
                  <h2 className="mb-1 text-xl font-medium">Pricing</h2>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label
                        htmlFor="price"
                        className="mb-2 block font-medium text-gray-500"
                      >
                        Price
                      </label>
                      <input
                        type="number"
                        className="h-12 w-full rounded-lg border border-gray-300 px-5 py-3 focus:outline-primary-600"
                        min="1"
                        step="0.001"
                        placeholder="Price"
                        id="price"
                      />
                      <small className="inline-block pt-1 text-[15px] text-red-600">
                        (*) Price is required
                      </small>
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="orgPrice"
                        className="mb-2 block font-medium text-gray-500"
                      >
                        Origin Price
                      </label>
                      <input
                        type="number"
                        step="0.001"
                        min="1"
                        className="h-12 w-full rounded-lg border border-gray-300 px-5 py-3 focus:outline-primary-600"
                        placeholder="Origin Price"
                        id="orgPrice"
                      />
                      <small className="inline-block pt-1 text-[15px] text-red-600">
                        (*) Origin price is required
                      </small>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-medium">Organization</h2>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <label
                        htmlFor="quantity"
                        className="mb-2 block font-medium text-gray-500"
                      >
                        Quantity
                      </label>
                      <input
                        type="number"
                        className="h-12 w-full rounded-lg border border-gray-300 px-5 py-3 focus:outline-primary-600"
                        placeholder="Quantity"
                        id="quantity"
                      />
                      <small className="inline-block pt-1 text-[15px] text-red-600">
                        (*) Quantity is required
                      </small>
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="category"
                        className="mb-2 block font-medium text-gray-500"
                      >
                        Category
                      </label>
                      <select
                        name="categoryId"
                        className="h-12 w-full rounded-lg border border-gray-300 px-5 py-3 text-gray-400 focus:outline-primary-600"
                        id="categoryId"
                      >
                        <option value="asdad">asdad</option>
                      </select>

                      <small className="inline-block pt-1 text-[15px] text-red-600">
                        (*) Category is required
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-medium">Product Images</h2>
                <p className="mb-2">Add or change images of the product</p>
                <div className="flex flex-wrap items-center gap-3">image</div>
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
                <span className="flex items-center gap-2">
                  <IoSaveSharp />
                  <span>Save</span>
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
