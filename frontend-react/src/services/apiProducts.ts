import { AxiosResponse } from "axios";

import { ICreateProduct, type IProduct } from '../interfaces/product';

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

export const createProduct = async (data: ICreateProduct) => {
    try {
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('price', data.price.toString());
        formData.append('orgPrice', data.orgPrice.toString());
        formData.append('quantity', data.quantity.toString());
        formData.append('description', data.description);
        formData.append('categoryId', data.categoryId);
        formData.append('hot', data.hot.toString());
        data.images.forEach((image) => {
            formData.append('images', image);
        });

        const response = await axiosInstance.post(API_ENDPOINTS.PRODUCT_ENDPOINTS.CREATE_PRODUCT,
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

export const updateProduct = async (productUpdate: ICreateProduct, id: string) => {
    try {
        const formData = new FormData();

        formData.append('name', productUpdate.name);
        formData.append('price', productUpdate.price.toString());
        formData.append('orgPrice', productUpdate.orgPrice.toString());
        formData.append('quantity', productUpdate.quantity.toString());
        formData.append('description', productUpdate.description);
        formData.append('categoryId', productUpdate.categoryId);
        formData.append('hot', productUpdate.hot.toString());
        if (productUpdate.images.length) {
            productUpdate.images.forEach((image) => {
                formData.append('images', image);
            });
        }

        const response = await axiosInstance.put(API_ENDPOINTS.PRODUCT_ENDPOINTS.UPDATE_PRODUCT + '/' + id,
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

export const deleteProduct = async (id: string) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.PRODUCT_ENDPOINTS.DELETE_PRODUCT + '/' + id,
            {},
        );

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};