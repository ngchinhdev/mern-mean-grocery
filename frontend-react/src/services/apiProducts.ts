import axios, { AxiosResponse } from "axios";

import { type IProduct } from '../interfaces/IProduct';

import { API_ENDPOINTS } from "../constants/url";

export const getAllProducts = async (): Promise<IProduct[]> => {
    try {
        const response: AxiosResponse = await axios.get(API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_ALL_PRODUCTS);

        const products: IProduct[] = response.data.data;
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getProductsByCategoryId = async (categoryId: string): Promise<IProduct[]> => {
    try {
        const response: AxiosResponse = await axios.get(`${API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_ALL_PRODUCTS}/categoryId/${categoryId}`);

        const products: IProduct[] = response.data.data;
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
};