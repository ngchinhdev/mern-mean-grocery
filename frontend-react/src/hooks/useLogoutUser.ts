import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout as logoutApi } from "src/services/apiAuth";
import { logout as logoutState } from "src/store/auth/authSlice";
import { AppDispatch } from "src/store/store";
import { removeItemLocalStorage } from "src/utils/helpers";

const useLogoutUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const logoutUser = async () => {
        dispatch(logoutState());
        await logoutApi();
        removeItemLocalStorage("accessTokenReact");
        navigate("/");
    };

    return logoutUser;
};

export default useLogoutUser;