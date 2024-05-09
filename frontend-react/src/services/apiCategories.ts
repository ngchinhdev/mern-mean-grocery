import axios, { AxiosResponse } from "axios";
import { SERVER_API_CATEGORIES_URL } from "../constants/url";

import { ICategory } from "../interfaces/ICategory";

export const getAllCategories = async (): Promise<ICategory[]> => {
    try {
        const response: AxiosResponse = await axios.get(SERVER_API_CATEGORIES_URL);

        const categories: ICategory[] = response.data.data;
        return categories;
    } catch (error) {
        console.error(error);
        return [];
    }
};