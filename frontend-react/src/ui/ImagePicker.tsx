import { ChangeEvent, useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlinePhoto } from "react-icons/md";

interface ImagePickerProps<T extends FieldValues> {
  imageRootUrl: string;
  name: Path<T>;
  images: string[];
  register: UseFormRegister<T>;
  onSetSelectedFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ImagePicker<T extends FieldValues>({
  imageRootUrl,
  register,
  name,
  images,
  onSetSelectedFile,
}: ImagePickerProps<T>) {
  console.log(images);
  return images.length ? (
    images.map((image) => (
      <div className="image-picker-small relative h-24 w-24 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-3 transition-all hover:border-primary-600">
        <img
          src={
            image.startsWith("https://") || image.startsWith("data:")
              ? image
              : imageRootUrl + "/" + image
          }
          className="h-full w-full"
          alt="avatar"
        />
        <span className="trash hidden">
          <div className="absolute inset-0 left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 scale-110 items-center justify-center">
            <FaRegTrashCan className="cursor-pointer text-red-500 " />
          </div>
        </span>
      </div>
    ))
  ) : (
    <div className="relative h-24 w-24 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 transition-all hover:border-primary-600">
      <label
        htmlFor="image"
        className="z-10 mb-2 flex h-full w-full flex-col items-center justify-center gap-2 p-3 font-medium text-gray-500"
      >
        <MdOutlinePhoto className="text-5xl" />
        <span>Upload</span>
      </label>
      <input
        {...register(name)}
        onChange={onSetSelectedFile}
        type="file"
        id="image"
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  );
}
