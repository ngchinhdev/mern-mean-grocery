import { ReactNode } from "react";

interface ButtonSocialProps {
  children: ReactNode;
  imageIcon: string;
  imageAlt: string;
}

export default function ButtonSocial({
  children,
  imageAlt,
  imageIcon,
}: ButtonSocialProps) {
  return (
    <div
      className="flex w-full items-center justify-center gap-3 text-nowrap rounded bg-gray-100 px-5 py-3 text-center text-sm text-gray-900 transition-all hover:bg-gray-200 focus:outline-none"
      role="button"
    >
      <img src={imageIcon} alt={imageAlt} width="20px" height="20px" />
      <span>{children}</span>
    </div>
  );
}
