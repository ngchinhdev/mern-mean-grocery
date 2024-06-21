import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import HomeFeature from "src/features/app/home";
import useScrollToTop from "src/hooks/useScrollToTop";
import { setIsLogged } from "src/store/auth/authSlice";
import { AppDispatch } from "src/store/store";
import { setLocalStorage } from "src/utils/helpers";

export default function Home() {
  useScrollToTop();
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get("accessToken")) {
      dispatch(setIsLogged());
      setLocalStorage("accessTokenReact", searchParams.get("accessToken"));
      navigate("/user/information");
    }
  });

  return <HomeFeature />;
}
