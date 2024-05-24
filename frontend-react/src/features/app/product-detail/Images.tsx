import { useState } from "react";

import { PUBLIC_ENDPOINTS } from "src/constants/url";

interface ImagesProps {
  images: string[];
}

export default function Images({ images }: ImagesProps) {
  const [currentImage, setCurrentImage] = useState(images[0]);

  return (
    <div className="mx-auto w-full flex-shrink-0 md:w-6/12 lg:block lg:w-5/12 xl:w-4/12 xl:pr-10">
      <div className="flex flex-col">
        <img
          src={PUBLIC_ENDPOINTS.IMAGE_PRODUCTS + "/" + currentImage}
          alt={`Image main of ${images.length}`}
          className="aspect-square object-contain"
        />
        <div className="mt-4 flex flex-row gap-2 border-t pt-2">
          {images.map((image, index) => (
            <div
              key={image}
              className="w-3/12 cursor-pointer overflow-hidden rounded-sm border border-sky-100 p-2"
            >
              <img
                src={PUBLIC_ENDPOINTS.IMAGE_PRODUCTS + "/" + image}
                alt={`Image ${index + 1} of ${images.length}`}
                className="aspect-square h-full w-full object-contain"
                onClick={() => setCurrentImage(image)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
