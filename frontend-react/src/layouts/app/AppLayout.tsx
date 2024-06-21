import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

import Header from "./header";
import Footer from "./footer/Footer";
import Cart from "./cart";
import FooterMobile from "./footer/FooterMobile";
import MenuMobile from "./menuMobile";
import MoreInfo from "./footer/MoreInfo";
import { IUser } from "src/interfaces/auth";
import { getUserProfile } from "src/services/apiAuth";
import { AppDispatch } from "src/store/store";
import { setIsLogged, setUserLogged } from "src/store/auth/authSlice";
import { getLocalStorage } from "src/utils/helpers";

export default function AppLayout() {
  const [openCart, setOpenCart] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const [isOpenedForm, setIsOpenedForm] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const { data: userProfile } = useQuery<unknown, AxiosError, IUser>({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    enabled: !!getLocalStorage("accessTokenReact"),
  });

  useEffect(() => {
    if (userProfile) {
      dispatch(setUserLogged(userProfile));
      dispatch(setIsLogged());
    }
  }, [userProfile, dispatch]);

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
