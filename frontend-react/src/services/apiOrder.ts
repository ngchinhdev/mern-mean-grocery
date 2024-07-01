import { AxiosResponse } from "axios";

import { IBestSelling, IOrder, type ICreateOrder } from '../interfaces/order';

import { API_ENDPOINTS } from "../constants/url";
import { axiosInstance } from "src/utils/axiosInstance";
import { IResponseDataCommon } from "src/interfaces/share";

export const getAllOrders = async (): Promise<IOrder[]> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<IOrder[]>>(API_ENDPOINTS.ORDER_ENDPOINTS.GET_ALL_ORDERS);

        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getBestSelling = async (): Promise<IBestSelling[]> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<IBestSelling[]>>(API_ENDPOINTS.ORDER_ENDPOINTS.GET_TOP_SELLING);

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
        const response = await axiosInstance.post<IResponseDataCommon<IOrder>>(API_ENDPOINTS.ORDER_ENDPOINTS.CREATE_ORDER, data);

        console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateOrder = async (id: string, data: any) => {
    try {
        const response = await axiosInstance.put<IResponseDataCommon<IOrder>>(API_ENDPOINTS.ORDER_ENDPOINTS.UPDATE_ORDER + '/' + id, data);

        return response.data.data;
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