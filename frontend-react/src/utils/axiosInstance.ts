import axios from "axios";
import { getLocalStorage, setLocalStorage } from "./helpers";
import { refreshToken } from "src/services/apiAuth";

export const axiosInstance = axios.create({});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = getLocalStorage('accessTokenReact');
    console.log(accessToken);
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.withCredentials = true;
    }

    return config;
}, (err) => {
    return Promise.reject(err);
});

axiosInstance.interceptors.response.use(res => res, async err => {
    if (err.response && err.response.status === 401) {
        const originalRequest = err.config;

        const response = await refreshToken();

        setLocalStorage("accessTokenReact", response.newAccessToken);
        originalRequest.headers["Authorization"] = 'Bearer ' + response.newAccessToken;

        return;
    }

    return Promise.reject(err);
});