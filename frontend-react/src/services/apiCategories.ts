import { AxiosResponse } from "axios";
import { API_ENDPOINTS } from "../constants/url";

import { ICategory } from "../interfaces/category";
import { axiosInstance } from "src/utils/axiosInstance";

export const getAllCategories = async (): Promise<ICategory[]> => {
    try {
        const response: AxiosResponse = await axiosInstance.get(API_ENDPOINTS.CATEGORY_ENDPOINTS.GET_ALL_CATEGORIES);

        const categories: ICategory[] = response.data.data;
        return categories;
    } catch (error) {
        console.error(error);
        return [];
    }
};