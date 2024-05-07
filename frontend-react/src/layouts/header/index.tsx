import BottomHeader from "./BottomHeader";
import MiddleHeader from "./MiddleHeader";
import TopHeader from "./TopHeader";

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  return (
    <header className="" style={{ display: "unset" }}>
      <TopHeader />
      <div className="sticky top-0 z-20">
        <MiddleHeader onOpenCart={onOpenCart} />
        <BottomHeader />
      </div>
    </header>
  );
}
