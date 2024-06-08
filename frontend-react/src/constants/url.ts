const API_ENDPOINT_ROOT_URL = 'http://localhost:3500/api/v1';
const PUBLIC_ROOT_URL = 'http://localhost:3500';

export const API_ENDPOINTS = {
    CATEGORY_ENDPOINTS: {
        GET_ALL_CATEGORIES: `${API_ENDPOINT_ROOT_URL}/categories`,
        GET_CATEGORY_BY_ID: `${API_ENDPOINT_ROOT_URL}/categories/category`,
        CREATE_CATEGORY: `${API_ENDPOINT_ROOT_URL}/categories/add`,
        UPDATE_CATEGORY: `${API_ENDPOINT_ROOT_URL}/categories/update`,
        DELETE_CATEGORY: `${API_ENDPOINT_ROOT_URL}/categories/delete`
    },
    PRODUCT_ENDPOINTS: {
        GET_ALL_PRODUCTS: `${API_ENDPOINT_ROOT_URL}/products`,
        GET_HOT_PRODUCTS: `${API_ENDPOINT_ROOT_URL}/products/hot`,
        GET_SEARCH_PRODUCTS: `${API_ENDPOINT_ROOT_URL}/products/search`,
        GET_PRODUCT_BY_ID: `${API_ENDPOINT_ROOT_URL}/products/product`,
        GET_PRODUCT_BY_CATEGORY_ID: `${API_ENDPOINT_ROOT_URL}/products/categoryId`,
        CREATE_PRODUCT: `${API_ENDPOINT_ROOT_URL}/products/add`,
        UPDATE_PRODUCT: `${API_ENDPOINT_ROOT_URL}/products/update`,
        DELETE_PRODUCT: `${API_ENDPOINT_ROOT_URL}/products/delete`,
    },
    ORDER_ENDPOINTS: {
        GET_ALL_ORDERS: `${API_ENDPOINT_ROOT_URL}/orders`,
        GET_ORDER_BY_ID: `${API_ENDPOINT_ROOT_URL}/orders/order`,
        GET_TOP_SELLING: `${API_ENDPOINT_ROOT_URL}/orders/bestselling`,
        GET_ORDER_BY_USER_ID: `${API_ENDPOINT_ROOT_URL}/orders/user`,
        CREATE_ORDER: `${API_ENDPOINT_ROOT_URL}/orders/add`,
        UPDATE_ORDER: `${API_ENDPOINT_ROOT_URL}/orders/update`,
        CANCEL_ORDER: `${API_ENDPOINT_ROOT_URL}/orders/cancel`,
        SEND_INVOICE: `${API_ENDPOINT_ROOT_URL}/orders/invoice`,
    },
    USERS_ENDPOINTS: {
        GET_ALL_USERS: `${API_ENDPOINT_ROOT_URL}/users`,
        GET_USER_PROFILE: `${API_ENDPOINT_ROOT_URL}/users/profile`,
        CREATE_USER: `${API_ENDPOINT_ROOT_URL}/auth/register`,
        LOGIN_USER: `${API_ENDPOINT_ROOT_URL}/auth/login`,
        LOGOUT_USER: `${API_ENDPOINT_ROOT_URL}/auth/logout`,
        UPDATE_USER_PROFILE: `${API_ENDPOINT_ROOT_URL}/auth/update-profile`,
        CHANGE_PASSWORD: `${API_ENDPOINT_ROOT_URL}/auth/change-password`,
        CHANGE_ROLE: `${API_ENDPOINT_ROOT_URL}/auth/change-role`,
        FORGOT_PASSWORD: `${API_ENDPOINT_ROOT_URL}/auth/forgot-password`,
        REFRESH_TOKEN: `${API_ENDPOINT_ROOT_URL}/auth/refresh-token`,
    },
    COUPON_ENDPOINTS: {
        GET_ALL_COUPONS: `${API_ENDPOINT_ROOT_URL}/coupons`,
        GET_COUPON_BY_ID: `${API_ENDPOINT_ROOT_URL}/coupons/coupon`,
        GET_COUPON_BY_CODE: `${API_ENDPOINT_ROOT_URL}/coupons/coupon/code`,
        CREATE_COUPON: `${API_ENDPOINT_ROOT_URL}/coupons/add`,
        UPDATE_COUPON: `${API_ENDPOINT_ROOT_URL}/coupons/update`,
        DELETE_COUPON: `${API_ENDPOINT_ROOT_URL}/coupons/delete`,
    },
};

export const PUBLIC_ENDPOINTS = {
    IMAGE_CATEGORIES: `${PUBLIC_ROOT_URL}/images/categories`,
    IMAGE_PRODUCTS: `${PUBLIC_ROOT_URL}/images/products`,
    IMAGE_USERS: `${PUBLIC_ROOT_URL}/images/auth`,
};