interface NotFoundProps {
  message: string;
  bigSize?: boolean;
}

export default function NotFound({ message, bigSize = true }: NotFoundProps) {
  return (
    <div className="mb-10 flex items-center justify-center py-4 text-center">
      <div className="flex flex-col items-center justify-center gap-2">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/product-is-empty-8044872-6430781.png?f=webp"
          width={bigSize ? 300 : 150}
          height={bigSize ? 300 : 150}
          alt="Not Found"
        />
        <h1
          className={`${bigSize ? "text-2xl" : "text-xl"} font-medium text-gray-700`}
        >
          {message}
        </h1>
      </div>
    </div>
  );
}
