import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  children: ReactNode;
  type: "primary" | "secondary";
  to?: string;
};

export default function Button({ children, to, type }: ButtonProps) {
  let typeCss = "";

  if (type === "primary")
    typeCss = "gap-2 rounded-3xl bg-primary-600 px-6 py-2 text-sm text-white";

  if (type === "secondary")
    typeCss = "border-lime-900 border rounded-2xl py-2 px-5";

  if (to) {
    return (
      <Link
        to={to}
        className={`inline-flex items-center justify-center text-center font-medium ${typeCss}`}
      >
        {children}
      </Link>
    );
  }
  return <button>Normal btn</button>;
}