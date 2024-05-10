const API_ENDPOINT_ROOT_URL = 'http://localhost:3500/api/v1';
const PUBLIC_ROOT_URL = 'http://localhost:3500';

export const API_ENDPOINTS = {
    CATEGORY_ENDPOINTS: {
        GET_ALL_CATEGORIES: `${API_ENDPOINT_ROOT_URL}/categories`,
        GET_CATEGORY_BY_ID: `${API_ENDPOINT_ROOT_URL}/categories/:id`,
        CREATE_CATEGORY: `${API_ENDPOINT_ROOT_URL}/categories`,
        UPDATE_CATEGORY: `${API_ENDPOINT_ROOT_URL}/categories/:id`,
        DELETE_CATEGORY: `${API_ENDPOINT_ROOT_URL}/categories/:id`
    },
    PRODUCT_ENDPOINTS: {
        GET_ALL_PRODUCTS: `${API_ENDPOINT_ROOT_URL}/products`,
        GET_HOT_PRODUCTS: `${API_ENDPOINT_ROOT_URL}/products/hot`,
        GET_PRODUCT_BY_ID: `${API_ENDPOINT_ROOT_URL}/products/:id`,
        CREATE_PRODUCT: `${API_ENDPOINT_ROOT_URL}/products`,
        UPDATE_PRODUCT: `${API_ENDPOINT_ROOT_URL}/products/:id`,
        DELETE_PRODUCT: `${API_ENDPOINT_ROOT_URL}/products/:id`
    }
};

export const PUBLIC_ENDPOINTS = {
    IMAGE_CATEGORIES: `${PUBLIC_ROOT_URL}/images/categories`,
    IMAGE_PRODUCTS: `${PUBLIC_ROOT_URL}/images/products`
};