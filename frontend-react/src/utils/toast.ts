import { type ToastOptions, toast } from "react-toastify";

const options: ToastOptions = {
    position: 'top-center',
    closeOnClick: true,
    pauseOnHover: false,
    toastId: 'id-t'
};

export const toastUI = (message: string, type: 'success' | 'error' | 'warning') => {
    if (type === 'success') {
        toast.success(message, options);
    }

    if (type === 'error') {
        toast.error(message, options);
    }

    if (type === 'warning') {
        toast.warning(message, options);
    }
};