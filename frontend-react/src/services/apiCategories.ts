import { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../constants/url";

import { ICategory, ICreateCategory } from "../interfaces/category";
import { axiosInstance } from "src/utils/axiosInstance";

export const getAllCategories = async (): Promise<ICategory[]> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<ICategory[]>>(API_ENDPOINTS.CATEGORY_ENDPOINTS.GET_ALL_CATEGORIES);

        const categories = response.data.data;
        return categories;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createCategory = async ({ name, image }: ICreateCategory) => {
    try {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('image', image);

        const response = await axiosInstance.post(API_ENDPOINTS.CATEGORY_ENDPOINTS.CREATE_CATEGORY,
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