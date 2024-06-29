import { ChangeEvent } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlinePhoto } from "react-icons/md";

interface ImagePickerProps {
  imageRootUrl: string;
  maxLength: number;
  images: string[];
  emptyImageMessage: string;
  onSetSelectedFile: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: (index: number) => void;
}

export default function ImagePicker({
  imageRootUrl,
  images,
  maxLength,
  onSetSelectedFile,
  onDeleteImage,
  emptyImageMessage,
}: ImagePickerProps) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        {images.length < maxLength ? (
          <div className="relative h-24 w-24 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 transition-all hover:border-primary-600">
            <label
              htmlFor="image"
              className="z-10 mb-2 flex h-full w-full flex-col items-center justify-center gap-2 p-3 font-medium text-gray-500"
            >
              <MdOutlinePhoto className="text-5xl" />
              <span>Upload</span>
            </label>
            <input
              onChange={onSetSelectedFile}
              type="file"
              multiple={true}
              id="image"
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </div>
        ) : (
          ""
        )}
        {images.length
          ? images.map((image, index) => (
              <div
                key={index}
                className="image-picker-small relative h-24 w-24 overflow-hidden rounded-lg border-2 border-dashed border-gray-300 p-3 transition-all hover:border-primary-600"
              >
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
                    <FaRegTrashCan
                      className="cursor-pointer text-red-500 "
                      onClick={() => onDeleteImage(index)}
                    />
                  </div>
                </span>
              </div>
            ))
          : ""}
      </div>
      <small className="mt-1 inline-block text-sm text-red-500">
        {emptyImageMessage}
      </small>
    </>
  );
}
