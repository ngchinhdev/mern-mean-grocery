import CheckoutFeature from "src/features/app/checkout";
import useScrollToTop from "src/hooks/useScrollToTop";

export default function Checkout() {
  useScrollToTop();

  return <CheckoutFeature />;
}
