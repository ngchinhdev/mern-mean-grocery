import axios, { AxiosResponse } from "axios";

import { type IProduct } from '../interfaces/IProduct';

import { SERVER_API_PRODUCTS_URL } from "../constants/url";

export const getAllProducts = async (): Promise<IProduct[]> => {
    try {
        const response: AxiosResponse = await axios.get(SERVER_API_PRODUCTS_URL);

        const products: IProduct[] = response.data.data;
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getProductsByCategoryId = async (categoryId: string): Promise<IProduct[]> => {
    try {
        const response: AxiosResponse = await axios.get(`${SERVER_API_PRODUCTS_URL}/categoryId/${categoryId}`);

        const products: IProduct[] = response.data.data;
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
};