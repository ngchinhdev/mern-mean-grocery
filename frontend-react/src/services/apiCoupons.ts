import { AxiosResponse } from "axios";

import { ICreateCoupon, type ICoupon } from '../interfaces/coupon';

import { API_ENDPOINTS } from "../constants/url";
import { axiosInstance } from "src/utils/axiosInstance";

export const getAllCoupons = async (): Promise<ICoupon[]> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<ICoupon[]>>(API_ENDPOINTS.COUPON_ENDPOINTS.GET_ALL_COUPONS);

        const coupons = response.data.data;
        return coupons;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getCouponByCode = async (code: string): Promise<ICoupon> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<ICoupon>>(API_ENDPOINTS.COUPON_ENDPOINTS.GET_COUPON_BY_CODE + '/' + code);

        const coupon = response.data.data;
        return coupon;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getCouponById = async (id: string): Promise<ICoupon> => {
    try {
        const response = await axiosInstance.get<AxiosResponse<ICoupon>>(API_ENDPOINTS.COUPON_ENDPOINTS.GET_COUPON_BY_ID + '/' + id);

        const coupon = response.data.data;
        return coupon;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const createCoupon = async (couponData: ICreateCoupon): Promise<ICoupon> => {
    console.log(couponData);
    try {
        const response = await axiosInstance.post<AxiosResponse<ICoupon>>(API_ENDPOINTS.COUPON_ENDPOINTS.CREATE_COUPON, { ...couponData });

        const coupon = response.data.data;
        return coupon;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updateCoupon = async (couponUpdate: ICreateCoupon, id: string): Promise<ICoupon> => {
    try {
        const response = await axiosInstance.put<AxiosResponse<ICoupon>>(API_ENDPOINTS.COUPON_ENDPOINTS.UPDATE_COUPON + '/' + id, { ...couponUpdate });

        const coupon = response.data.data;
        return coupon;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const deleteCoupon = async (id: string) => {
    try {
        const response = await axiosInstance.delete(API_ENDPOINTS.COUPON_ENDPOINTS.DELETE_COUPON + '/' + id,
            {},
        );

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};