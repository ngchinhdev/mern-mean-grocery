import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: ReactNode;
  type: "primary" | "secondary";
  to?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  padding?: string;
  fontSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
};

export default function Button({
  children,
  to,
  type,
  rounded,
  padding,
  fontSize,
}: ButtonProps) {
  let typeCss = "";

  if (type === "primary")
    typeCss = `gap-2 bg-primary-600 ${!fontSize ? "text-sm" : fontSize} text-white ${!padding ? "px-6 py-2" : padding}`;

  if (type === "secondary") typeCss = "border-lime-900 border py-2 px-5";

  const className = `inline-flex items-center justify-center text-center font-medium ${typeCss} rounded-${rounded || "sm"}`;

  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }

  return <button className={className}>{children}</button>;
}
