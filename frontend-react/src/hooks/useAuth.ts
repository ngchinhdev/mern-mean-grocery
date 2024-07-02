import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { IUser } from "src/interfaces/auth";
import { getUserProfile } from "src/services/apiAuth";
import { setIsLogged, setUserLogged } from "src/store/auth/authSlice";
import { AppDispatch } from "src/store/store";
import { getLocalStorage } from "src/utils/helpers";

export default function useAuth(isAdminAuth: boolean) {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { data: userProfile, isLoading, isError } = useQuery<unknown, AxiosError, IUser>({
        queryKey: ["userProfile"],
        queryFn: getUserProfile,
        enabled: !!getLocalStorage("accessTokenReact"),
    });

    useEffect(() => {
        if (userProfile && !isLoading) {
            dispatch(setUserLogged(userProfile));
            dispatch(setIsLogged());
            if (isAdminAuth && !userProfile.isAdmin) {
                navigate("/");
            }

            if (!isAdminAuth && userProfile.isAdmin) {
                navigate("/admin/dashboard");
            }
        }

        if ((!userProfile || isError) && !isLoading) {
            navigate("/");
        }
    }, [userProfile, dispatch, navigate, isError, isAdminAuth, isLoading]);
}