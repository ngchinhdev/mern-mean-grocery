import ProductDetailFeature from "src/features/app/product-detail";
import useScrollToTop from "src/hooks/useScrollToTop";

export default function ProductDetail() {
  useScrollToTop();

  return <ProductDetailFeature />;
}
