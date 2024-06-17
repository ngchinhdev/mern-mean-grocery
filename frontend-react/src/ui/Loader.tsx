interface LoaderProps {
  type?: "submit" | "normal";
}

export default function Loader({ type = "normal" }: LoaderProps) {
  if (type === "submit") return <div className="loader-submit mx-auto"></div>;

  return (
    <div className="w-full py-20">
      <div className="loader mx-auto"></div>
    </div>
  );
}
