import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./header";
import Footer from "./footer/Footer";
import Cart from "./cart";
import FooterMobile from "./footer/FooterMobile";
import MenuMobile from "./menuMobile";
import MoreInfo from "./footer/MoreInfo";
import useAuth from "src/hooks/useAuth";

export default function AppLayout() {
  const [openCart, setOpenCart] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [isOpenedForm, setIsOpenedForm] = useState(false);

  useAuth(false);

  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = useCallback(() => {
    setOpenCart(false);
  }, []);

  const handleOpenCartMenuMobile = () => {
    setOpenMenuMobile(true);
  };

  const handleCloseMenuMobile = useCallback(() => {
    setOpenMenuMobile(false);
  }, []);

  const handleOpenForm = useCallback(() => {
    setIsOpenedForm(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsOpenedForm(false);
  }, []);

  return (
    <>
      <Header
        isOpenedForm={isOpenedForm}
        onCloseForm={handleCloseForm}
        onOpenForm={handleOpenForm}
        onOpenCart={handleOpenCart}
      />
      <div>
        <Outlet />
      </div>
      <MoreInfo />
      <Footer />
      <Cart open={openCart} onClose={handleCloseCart} />
      <MenuMobile open={openMenuMobile} onClose={handleCloseMenuMobile} />
      <FooterMobile
        onOpenForm={handleOpenForm}
        onOpenCart={handleOpenCart}
        onOpenMenuMobile={handleOpenCartMenuMobile}
      />
    </>
  );
}
