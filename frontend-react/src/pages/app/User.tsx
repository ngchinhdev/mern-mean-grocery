import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import useScrollToTop from "src/hooks/useScrollToTop";
import { RootState } from "src/store/store";
import UserFeature from "src/features/app/user";

export default function User() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useScrollToTop();

  return <UserFeature />;
}
