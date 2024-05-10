import DrawerOverlay from "../../../ui/DrawerOverlay";
import CartFooter from "./CartFooter";
import CartHeader from "./CartHeader";
import CartList from "./CartList";

interface CartProps {
  open: boolean;
  onClose: () => void;
}

export default function Cart({ open, onClose }: CartProps) {
  return (
    <DrawerOverlay open={open} onClose={onClose} anchor="right">
      <CartHeader onClose={onClose} />
      <CartList />
      <CartFooter />
    </DrawerOverlay>
  );
}
