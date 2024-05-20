import axios from "axios";
import { API_ENDPOINTS } from "src/constants/url";
import { ICreateUser, ILoginUser } from "src/interfaces/auth";

export const createUser = async ({ name, email, password }: ICreateUser) => {
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);

        const response = await axios.post(API_ENDPOINTS.USERS_ENDPOINTS.CREATE_USER,
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
    }
};

export const loginUser = async ({ email, password }: ILoginUser) => {
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const response = await axios.post(API_ENDPOINTS.USERS_ENDPOINTS.LOGIN_USER,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );

        console.log("response.data:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
    }
};