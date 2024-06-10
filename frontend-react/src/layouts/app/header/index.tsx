import { useState } from "react";

import BottomHeader from "./BottomHeader";
import MiddleHeader from "./MiddleHeader";
import TopHeader from "./TopHeader";

interface HeaderProps {
  onOpenCart: () => void;
}

export default function Header({ onOpenCart }: HeaderProps) {
  const [isOpenedForm, setIsOpenedForm] = useState(false);

  const handleOpenForm = () => {
    setIsOpenedForm(true);
  };

  const handleCloseForm = () => {
    setIsOpenedForm(false);
  };

  return (
    <header className="" style={{ display: "unset" }}>
      <TopHeader onOpenForm={handleOpenForm} />
      <div className="sticky top-0 z-20">
        <MiddleHeader
          onOpenCart={onOpenCart}
          onCloseForm={handleCloseForm}
          onOpenForm={handleOpenForm}
          isOpenedForm={isOpenedForm}
        />
        <BottomHeader />
      </div>
    </header>
  );
}
