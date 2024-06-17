import DOMPurify from 'dompurify';

// Format helper functions
export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

export const formatDiscount = (value: number) => {
    return value.toFixed(1);
};

export const convertToDateString = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

// Local storage helper functions
export const getLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

export const setLocalStorage = <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const removeItemLocalStorage = (key: string) => {
    localStorage.removeItem(key);
};

// Sanitize helper functions
export const sanitizeHTML = (value: string) => {
    const purify = DOMPurify(window);
    return purify.sanitize(value);
};