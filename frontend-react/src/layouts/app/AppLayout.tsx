import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./header";
import Footer from "./footer/Footer";
import Cart from "./cart";
import FooterMobile from "./footer/FooterMobile";
import MenuMobile from "./menuMobile";
import MoreInfo from "./footer/MoreInfo";

export default function AppLayout() {
  const [openCart, setOpenCart] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseMenuMobile = () => {
    setOpenMenuMobile(false);
  };

  const handleOpenCartMenuMobile = () => {
    setOpenMenuMobile(true);
  };

  return (
    <>
      <Header onOpenCart={handleOpenCart} />
      <div>
        <Outlet />
      </div>
      <MoreInfo />
      <Footer />
      <Cart open={openCart} onClose={handleCloseCart} />
      <MenuMobile open={openMenuMobile} onClose={handleCloseMenuMobile} />
      <FooterMobile
        onOpenCart={handleOpenCart}
        onOpenMenuMobile={handleOpenCartMenuMobile}
      />
    </>
  );
}
