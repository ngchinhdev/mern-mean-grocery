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

export const getCategoryById = async (id: string): Promise<ICategory> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<ICategory>>(API_ENDPOINTS.CATEGORY_ENDPOINTS.GET_CATEGORY_BY_ID + '/' + id);

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

export const updateCategory = async (categoryUpdate: ICreateCategory, id: string) => {
    try {
        const formData = new FormData();

        formData.append('name', categoryUpdate.name);
        formData.append('image', categoryUpdate.image);

        const response = await axiosInstance.put(API_ENDPOINTS.CATEGORY_ENDPOINTS.UPDATE_CATEGORY + '/' + id,
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