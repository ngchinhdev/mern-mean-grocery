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

// Local storage helper functions
export const getLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
};

export const setLocalStorage = <T>(key: string, value: T): void => {
    localStorage.setItem(key, JSON.stringify(value));
};

// Sanitize helper functions
export const sanitizeHTML = (value: string) => {
    const purify = DOMPurify(window);
    return purify.sanitize(value);
};