import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoSaveSharp } from "react-icons/io5";

import Input from "src/ui/Input";
import SelectOption from "src/ui/SelectOptions";
import ImagePicker from "src/ui/ImagePicker";
import { PUBLIC_ENDPOINTS } from "src/constants/url";

export default function ProductEditor() {
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);

  const {
    register,
    formState: { errors },
  } = useForm();

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImages((prevImages) => [
          ...prevImages,
          reader.result as string,
        ]);
      };
      reader.readAsDataURL(files[0]);
      setSelectedFile((prevFiles) => [...prevFiles, files[0]]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
  };

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
                      <Input
                        label="Product Name"
                        name="name"
                        placeholder="Name of products"
                        type="text"
                        errors={errors}
                        register={register}
                      />
                    </div>
                    <div className="flex-1">
                      <SelectOption
                        label="Hot"
                        name="hot"
                        errors={errors}
                        register={register}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="mb-2 block font-medium text-gray-500"
                    >
                      Description
                    </label>
                    <CKEditor
                      editor={ClassicEditor}
                      {...register("description")}
                      data="<p>Hello from CKEditor&nbsp;5!</p>"
                      onReady={(editor) => {
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event) => {
                        console.log(event);
                      }}
                      onBlur={(event, editor) => {
                        console.log("Blur.", editor);
                      }}
                      onFocus={(event, editor) => {
                        console.log("Focus.", editor);
                      }}
                    />
                    {errors["description"] && (
                      <small className="text-sm text-red-500">
                        {errors["description"].message as string}
                      </small>
                    )}
                  </div>
                </div>
                <div className="mb-5">
                  <h2 className="mb-1 text-xl font-medium">Pricing</h2>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        label="Price"
                        name="price"
                        placeholder="Price of products"
                        type="number"
                        errors={errors}
                        register={register}
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        label="Origin Price"
                        name="orgPrice"
                        placeholder="Origin price "
                        type="number"
                        errors={errors}
                        register={register}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-medium">Organization</h2>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Input
                        label="Quantity"
                        name="quantity"
                        placeholder="Remaining quantity"
                        type="number"
                        errors={errors}
                        register={register}
                      />
                    </div>
                    <div className="flex-1">
                      <SelectOption
                        defaultSelect="Choose Category"
                        errors={errors}
                        register={register}
                        label="Category"
                        name="category"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-medium">Product Images</h2>
                <p className="mb-2">Add or change images of the product</p>
                <ImagePicker
                  maxLength={4}
                  imageRootUrl={PUBLIC_ENDPOINTS.IMAGE_PRODUCTS}
                  onSetSelectedFile={handleSelectImages}
                  images={productImages}
                  onDeleteImage={handleDeleteImage}
                />
              </div>
            </div>
          </div>
          <div className="sticky bottom-0 -mx-8 flex items-center justify-between border-t border-gray-200 bg-white px-8 py-4 pb-6">
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
