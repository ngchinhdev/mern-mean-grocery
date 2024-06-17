import { AxiosResponse } from "axios";

import { type IProduct } from '../interfaces/product';

import { API_ENDPOINTS } from "../constants/url";
import { axiosInstance } from "src/utils/axiosInstance";

export const getAllProducts = async (): Promise<IProduct[]> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<IProduct[]>>(API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_ALL_PRODUCTS);

        const products = response.data.data;
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getHotProducts = async (): Promise<IProduct[]> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<IProduct[]>>(API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_HOT_PRODUCTS);

        const products = response.data.data;
        return products;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getProductsByCategoryId = async (categoryId: string): Promise<IProduct[]> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<IProduct[]>>(`${API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_ALL_PRODUCTS}/categoryId/${categoryId}`);

        const products = response.data.data;
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getProductsBySearch = async (search: string): Promise<IProduct[]> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<IProduct[]>>(`${API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_SEARCH_PRODUCTS}?name=${search}`);

        const products = response.data.data;
        return products;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getProductById = async (productId: string): Promise<IProduct> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<IProduct>>(`${API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_PRODUCT_BY_ID}/${productId}`);

        const product = response.data.data;
        return product;
    } catch (error) {
        console.error(error);
        throw error;
    }
};