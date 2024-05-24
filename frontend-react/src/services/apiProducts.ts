import axios, { AxiosResponse } from "axios";

import { type IProduct } from '../interfaces/product';

import { API_ENDPOINTS } from "../constants/url";

export const getAllProducts = async (): Promise<IProduct[]> => {
    try {
        const response: AxiosResponse = await axios.get(API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_ALL_PRODUCTS);

        const products: IProduct[] = response.data.data;
        return products;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getHotProducts = async (): Promise<IProduct[]> => {
    try {
        const response: AxiosResponse = await axios.get(API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_HOT_PRODUCTS);

        const products: IProduct[] = response.data.data;
        return products;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getProductsByCategoryId = async (categoryId: string): Promise<IProduct[]> => {
    try {
        const response: AxiosResponse = await axios.get(`${API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_ALL_PRODUCTS}/categoryId/${categoryId}`);

        const products: IProduct[] = response.data.data;
        return products;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getProductById = async (productId: string): Promise<IProduct> => {
    try {
        const response: AxiosResponse = await axios.get(`${API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_ALL_PRODUCTS}/${productId}`);

        const product: IProduct = response.data.data;
        return product;
    } catch (error) {
        console.error(error);
        throw error;
    }
};