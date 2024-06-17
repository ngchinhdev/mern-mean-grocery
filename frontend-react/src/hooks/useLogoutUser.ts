import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "src/store/auth/authSlice";
import { AppDispatch } from "src/store/store";
import { removeItemLocalStorage } from "src/utils/helpers";

const useLogoutUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const logoutUser = () => {
        dispatch(logout());
        removeItemLocalStorage("accessToken");
        navigate("/");
    };

    return logoutUser;
};

export default useLogoutUser;