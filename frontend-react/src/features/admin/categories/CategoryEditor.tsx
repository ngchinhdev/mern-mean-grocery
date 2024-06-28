import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoSaveSharp } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

import { PUBLIC_ENDPOINTS } from "src/constants/url";
import { ICategory, ICreateCategory } from "src/interfaces/category";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "src/services/apiCategories";
import ImagePicker from "src/ui/ImagePicker";
import Input from "src/ui/Input";
import { toastUI } from "src/utils/toast";
import { createCategorySchema } from "src/zods/category";

export default function CategoryEditor() {
  const [selectedFile, setSelectedFile] = useState<File[]>([]);
  const [categoryImage, setCategoryImage] = useState<string[]>([]);
  const [emptyImage, setEmptyImage] = useState("");

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    data: category,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id as string),
    enabled: !!id,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ICreateCategory>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setCategoryImage([category.image]);
    }
  }, [category, setValue]);

  const { mutate: categoryMutate, isPending } = useMutation<
    unknown,
    // eslint-disable-next-line
    AxiosError<any, any>,
    ICreateCategory
  >({
    mutationFn: (data: ICreateCategory) =>
      id ? updateCategory(data, id) : createCategory(data),
    onSuccess: () => {
      toastUI(
        `${id ? "Edit" : "Create new"} category successfully.`,
        "success",
      );
      queryClient.invalidateQueries({ queryKey: ["category", id] });
      queryClient.invalidateQueries({ queryKey: ["allCategories"] });
      navigate("/admin/categories/list");
    },
    onError: (err) => {
      toastUI(err.response?.data.error, "error");
    },
  });

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    const files = e.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImage((prevImages) => [
          ...prevImages,
          reader.result as string,
        ]);
      };
      reader.readAsDataURL(files[0]);
      setSelectedFile((prevFiles) => [...prevFiles, files[0]]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setCategoryImage((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: ICreateCategory) => {
    if (!selectedFile.length && !id) {
      setEmptyImage("(*) Image is required");
      return;
    }

    categoryMutate({ ...data, image: selectedFile[0] });
  };

  return (
    <div>
      <div className="mb-4 items-center justify-between lg:flex">
        <h1 className="mb-4 text-2xl font-medium text-stone-800 lg:mb-0">
          {id ? "Edit Category" : "Add New Category"}
        </h1>
      </div>
      <div className="w-full">
        <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full gap-6 pb-16">
            <div className="w-3/5">
              <div>
                <h2 className="mb-2 text-xl font-medium">Basic Information</h2>
                <Input
                  errors={errors}
                  label="Category Name"
                  name="name"
                  placeholder="Enter category name"
                  register={register}
                  type="text"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-medium">Category Image</h2>
              <p className="mb-2">Add or change image of the category</p>
              <ImagePicker
                emptyImage={emptyImage}
                maxLength={1}
                imageRootUrl={PUBLIC_ENDPOINTS.IMAGE_CATEGORIES}
                onSetSelectedFile={handleSelectImages}
                images={categoryImage}
                onDeleteImage={handleDeleteImage}
              />
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
    </div>
  );
}
