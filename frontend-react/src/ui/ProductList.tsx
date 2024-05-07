import ProductItem from "./ProductItem";

export default function ProductList() {
  return (
    <ul className="mx-auto mt-8 grid max-w-screen-2xl grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {[1, 2, 3, 4, 5].map((item) => (
        <ProductItem key={item} />
      ))}
    </ul>
  );
}
