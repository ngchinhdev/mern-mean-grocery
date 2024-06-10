import { AxiosResponse } from "axios";

import { type ICoupon } from '../interfaces/coupon';

import { API_ENDPOINTS } from "../constants/url";
import { axiosInstance } from "src/utils/axiosInstance";

export const getAllCoupons = async (): Promise<ICoupon[]> => {
    try {
        const response: AxiosResponse = await axiosInstance.get(API_ENDPOINTS.COUPON_ENDPOINTS.GET_ALL_COUPONS);

        const coupons: ICoupon[] = response.data.data;
        return coupons;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const getCouponByCode = async (code: string): Promise<ICoupon> => {
    try {
        const response: AxiosResponse = await axiosInstance.get(API_ENDPOINTS.COUPON_ENDPOINTS.GET_COUPON_BY_CODE + '/' + code);

        const coupon: ICoupon = response.data.data;

        return coupon;
    } catch (error) {
        console.log(error);
        throw error;
    }
};