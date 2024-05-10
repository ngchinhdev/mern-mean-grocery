import DrawerOverlay from "../../../ui/DrawerOverlay";
import MenuCategory from "./MenuCategories";
import MenuHeader from "./MenuHeader";
import MenuPages from "./MenuPages";

interface MenuMobileProps {
  open: boolean;
  onClose: () => void;
}

export default function MenuMobile({ open, onClose }: MenuMobileProps) {
  return (
    <DrawerOverlay onClose={onClose} open={open} anchor="left">
      <MenuHeader onClose={onClose} />
      <MenuCategory />
      <MenuPages />
    </DrawerOverlay>
  );
}
