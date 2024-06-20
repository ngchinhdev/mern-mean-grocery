import BottomHeader from "./BottomHeader";
import MiddleHeader from "./MiddleHeader";
import TopHeader from "./TopHeader";

interface HeaderProps {
  isOpenedForm: boolean;
  onOpenCart: () => void;
  onOpenForm: () => void;
  onCloseForm: () => void;
}

export default function Header({
  isOpenedForm,
  onCloseForm,
  onOpenForm,
  onOpenCart,
}: HeaderProps) {
  return (
    <header className="" style={{ display: "unset" }}>
      <TopHeader onOpenForm={onOpenForm} />
      <div className="sticky top-0 z-20">
        <MiddleHeader
          onOpenCart={onOpenCart}
          onCloseForm={onCloseForm}
          onOpenForm={onOpenForm}
          isOpenedForm={isOpenedForm}
        />
        <BottomHeader />
      </div>
    </header>
  );
}
