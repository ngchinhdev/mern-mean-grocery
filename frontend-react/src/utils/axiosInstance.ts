import axios from "axios";
import { getLocalStorage, setLocalStorage } from "./helpers";
import { refreshToken } from "src/services/apiAuth";

export const axiosInstance = axios.create({
    withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = getLocalStorage('accessTokenReact');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
}, (err) => {
    return Promise.reject(err);
});

axiosInstance.interceptors.response.use(res => res, async err => {
    const originalRequest = err.config;
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const response = await refreshToken();

            setLocalStorage("accessTokenReact", response.newAccessToken);
            originalRequest.headers["Authorization"] = 'Bearer ' + response.newAccessToken;

            return axiosInstance(originalRequest);
        } catch (error) {
            return Promise.reject(err);
        }
    }

    throw err;
});