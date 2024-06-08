import useScrollToTop from "src/hooks/useScrollToTop";
import ProductFeature from "../../features/app/product";

export default function Products() {
  useScrollToTop();

  return <ProductFeature />;
}
