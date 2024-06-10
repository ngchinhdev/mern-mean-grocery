export interface ICreateCoupon {
    code: string;
    discount: number;
    startTime: string;
    endTime: string;
}

export interface ICoupon extends ICreateCoupon {
    _id: string;
    createdAt: string;
}