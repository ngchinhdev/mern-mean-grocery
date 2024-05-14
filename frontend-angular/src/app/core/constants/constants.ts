const API_ENDPOINT_ROOT_URL = 'http://localhost:3500/api/v1';
const PUBLIC_ROOT_URL = 'http://localhost:3500';

export const API_ENDPOINTS = {
    CATEGORY_ENDPOINTS: {
        GET_ALL_CATEGORIES: `${API_ENDPOINT_ROOT_URL}/categories`,
        GET_CATEGORY_BY_ID: `${API_ENDPOINT_ROOT_URL}/categories`,
        CREATE_CATEGORY: `${API_ENDPOINT_ROOT_URL}/categories/add`,
        UPDATE_CATEGORY: `${API_ENDPOINT_ROOT_URL}/categories/update`,
        DELETE_CATEGORY: `${API_ENDPOINT_ROOT_URL}/categories/delete`
    },
    PRODUCT_ENDPOINTS: {
        GET_ALL_PRODUCTS: `${API_ENDPOINT_ROOT_URL}/products`,
        GET_HOT_PRODUCTS: `${API_ENDPOINT_ROOT_URL}/products/hot`,
        GET_PRODUCT_BY_ID: `${API_ENDPOINT_ROOT_URL}/products/`,
        CREATE_PRODUCT: `${API_ENDPOINT_ROOT_URL}/products/add`,
        UPDATE_PRODUCT: `${API_ENDPOINT_ROOT_URL}/products/update`,
        DELETE_PRODUCT: `${API_ENDPOINT_ROOT_URL}/products/delete`
    }
};

export const PUBLIC_ENDPOINTS = {
    IMAGE_CATEGORIES: `${PUBLIC_ROOT_URL}/images/categories`,
    IMAGE_PRODUCTS: `${PUBLIC_ROOT_URL}/images/products`
};