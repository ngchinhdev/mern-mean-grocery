import { AxiosResponse } from "axios";

import { IOrder, type ICreateOrder } from '../interfaces/order';

import { API_ENDPOINTS } from "../constants/url";
import { axiosInstance } from "src/utils/axiosInstance";

export const getAllOrder = async (): Promise<IOrder[]> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<IOrder[]>>(API_ENDPOINTS.ORDER_ENDPOINTS.CREATE_ORDER);

        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getOrdersByUser = async (): Promise<IOrder[]> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<IOrder[]>>(API_ENDPOINTS.ORDER_ENDPOINTS.GET_ORDER_BY_USER_ID);

        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getOrdersById = async (id: string): Promise<IOrder> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<IOrder>>(API_ENDPOINTS.ORDER_ENDPOINTS.GET_ORDER_BY_ID + '/' + id);

        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createOrder = async (data: ICreateOrder) => {
    try {
        const response = await axiosInstance.post(API_ENDPOINTS.ORDER_ENDPOINTS.CREATE_ORDER, data);

        console.log(response.data);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const cancelOrder = async (id: string) => {
    try {
        const response = await axiosInstance.put(API_ENDPOINTS.ORDER_ENDPOINTS.CANCEL_ORDER + '/' + id, {});

        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};