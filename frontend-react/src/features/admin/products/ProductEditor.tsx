import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { IoSaveSharp } from "react-icons/io5";

import Input from "src/ui/Input";
import SelectOption from "src/ui/SelectOptions";
import ImagePicker from "src/ui/ImagePicker";
import { PUBLIC_ENDPOINTS } from "src/constants/url";
import {
  createProduct,
  getImageAsBlob,
  getProductById,
  updateProduct,
} from "src/services/apiProducts";
import { ICreateProduct } from "src/interfaces/product";
import { createProductSchema } from "src/zods/product";
import { toastUI } from "src/utils/toast";
import { getAllCategories } from "src/services/apiCategories";
import { ICategory } from "src/interfaces/category";
import Loader from "src/ui/Loader";
import NotFound from "src/ui/NotFound";

export default function ProductEditor() {
  const [selectedFile, setSelectedFiles] = useState<File[]>([]);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<ICategory[]>([]);
  const [emptyImageMessage, setEmptyImageMessage] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id as string),
    enabled: !!id,
  });

  const { data: categories } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreateProduct>({
    mode: "onSubmit",
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      hot: false,
      orgPrice: 1,
      price: 1,
      quantity: 1,
      categoryId: "",
    },
  });

  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("orgPrice", product.orgPrice);
      setValue("price", product.price);
      setValue("quantity", product.quantity);
      setValue("description", product.description);
      setValue("categoryId", product.categoryId._id);

      const fetchImages = async () => {
        const imagePromises = product.images.map(async (image) => {
          const mimeType = image.split(".").pop()!;
          const fullImageUrl = `${PUBLIC_ENDPOINTS.IMAGE_PRODUCTS}/${image}`;
          return await getImageAsBlob(fullImageUrl, mimeType);
        });

        try {
          const files = await Promise.all(imagePromises);
          setSelectedFiles(files);
          setProductImages(product.images);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };

      fetchImages();

      if (categories) {
        setCategoryOptions(categories);
      }
    }
  }, [product, setValue, categories]);

  const { mutate: productMutate, isPending } = useMutation<
    unknown,
    // eslint-disable-next-line
    AxiosError<any, any>,
    ICreateProduct
  >({
    mutationFn: (data: ICreateProduct) =>
      id ? updateProduct(data, id) : createProduct(data),
    onSuccess: () => {
      toastUI(
        `${id ? "Update" : "Create new"} product successfully.`,
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      navigate("/admin/products/list");
    },
    onError: (err) => {
      toastUI(err.response?.data.error, "error");
    },
  });

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImages((prevImages) => [
          ...prevImages,
          reader.result as string,
        ]);
      };
      reader.readAsDataURL(files[0]);
      setSelectedFiles((prevFiles) => [...prevFiles, files[0]]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setProductImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: ICreateProduct) => {
    if (!selectedFile.length && !id) {
      setEmptyImageMessage("(*) Images is required");
      return;
    }

    if (selectedFile.length < 2) {
      setEmptyImageMessage("(*) Images is required from 2->4 items");
      return;
    }

    productMutate({
      ...data,
      images: selectedFile,
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <NotFound message="Product not found." bigSize={false} />;
  }

  return (
    <>
      <div>
        <div className="mb-4 items-center justify-between lg:flex">
          <h1 className="mb-4 text-2xl font-medium text-stone-800 lg:mb-0">
            {id ? "Edit Product" : "Add New Product"}
          </h1>
        </div>
        <form
          className="pb-10"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                        options={[
                          {
                            opt: "No",
                            value: "0",
                            isDefault: product
                              ? product.hot === false
                                ? true
                                : false
                              : false,
                          },
                          {
                            opt: "Yes",
                            value: "1",
                            isDefault: product ? product.hot : false,
                          },
                        ]}
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
                      {...register("description")}
                      editor={ClassicEditor}
                      data={product?.description ? product.description : ""}
                      onReady={(editor) => {
                        console.log("Editor is ready to use!", editor);
                      }}
                      onChange={(event, editor) => {
                        console.log(editor.getData());
                        setValue("description", editor.getData());
                      }}
                      onBlur={() => {}}
                      onFocus={() => {}}
                    />
                    {errors["description"] && (
                      <small className="mt-1 inline-block text-sm text-red-500">
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
                        min={1}
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
                        min={1}
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
                        min={1}
                        errors={errors}
                        register={register}
                      />
                    </div>
                    <div className="flex-1">
                      {categoryOptions.length && (
                        <SelectOption
                          options={categoryOptions.map((c) => ({
                            opt: c.name,
                            value: c._id,
                            isDefault: product ? c._id === product?._id : false,
                          }))}
                          errors={errors}
                          register={register}
                          label="Category"
                          name="categoryId"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-medium">Product Images</h2>
                <p className="mb-2">Add or change images of the product</p>
                <ImagePicker
                  emptyImageMessage={emptyImageMessage}
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
                disabled={isPending}
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
