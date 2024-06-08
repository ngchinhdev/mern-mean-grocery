interface ICustomerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

interface IShippingInfo {
    address: string;
    city: string;
    country: string;
    zipCode: string;
    cost?: number;
}

interface IPaymentInfo {
    paymentMethod: 'Cash' | 'Credit Card';
    isPaid: boolean;
}

interface IOrderItem {
    quantity: number;
    product: {
        name: string;
        price: number;
        images: string[];
    };
}

interface ICreateOrderItem {
    quantity: number;
    product: string;
}

export type TOrderStatus = 'Pending' | 'Confirmed' | 'Delivered' | 'Cancelled';

export interface IBestSelling {
    _id: string;
    totalQuantity: number;
    productDetails: {
        name: string;
        price: number;
        images: string[];
    };
}

export interface ICreateOrder {
    userId: string | null;
    customerInfo: ICustomerInfo;
    shippingInfo: IShippingInfo;
    paymentInfo: IPaymentInfo;
    discount?: number;
    status?: TOrderStatus;
    orderItems: ICreateOrderItem[];
    totalPrice: number;
}

export interface IOrder extends Required<Omit<ICreateOrder, 'orderItems'>> {
    _id: string;
    createdAt: string;
    invoiceNo: number;
    orderItems: IOrderItem[];
}