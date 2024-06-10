import { API_ENDPOINTS } from "src/constants/url";
import { ICreateUser, IForgotPassword, ILoginUser, IRefreshTokenResponse, IResponseLogin, IUser } from "src/interfaces/auth";
import { IResponseDataCommon } from "src/interfaces/share";
import { axiosInstance } from "src/utils/axiosInstance";

export const getUserProfile = async () => {
    try {
        const response = await axiosInstance.get<IResponseDataCommon<IUser>>(API_ENDPOINTS.USERS_ENDPOINTS.GET_USER_PROFILE);

        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createUser = async ({ name, email, password }: ICreateUser) => {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        const response = await axiosInstance.post(API_ENDPOINTS.USERS_ENDPOINTS.CREATE_USER,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const loginUser = async ({ email, password }: ILoginUser) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const response = await axiosInstance.post<IResponseDataCommon<IResponseLogin>>(API_ENDPOINTS.USERS_ENDPOINTS.LOGIN_USER,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};

export const forgotPassword = async ({ email }: IForgotPassword) => {
    try {
        const formData = new FormData();
        formData.append('email', email);

        const response = await axiosInstance.put(API_ENDPOINTS.USERS_ENDPOINTS.FORGOT_PASSWORD + '/' + email,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const response = await axiosInstance.post<IRefreshTokenResponse>(API_ENDPOINTS.USERS_ENDPOINTS.REFRESH_TOKEN, {});

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.USERS_ENDPOINTS.LOGOUT_USER,
            {},
        );

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};