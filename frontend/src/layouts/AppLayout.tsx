import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import MenuMobile from "./MenuMobile";
import Footer from "./Footer";
import Cart from "./cart";

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
      <Cart open={open} onClose={handleClose} />
      <MenuMobile onOpen={handleOpen} />
    </>
  );
}
