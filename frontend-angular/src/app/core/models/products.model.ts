export interface ICreateProduct {
    name?: string;
    price?: number;
    orgPrice?: number;
    quantity?: number;
    images?: string[];
    description?: string;
    category?: string;
}

export interface IProduct extends Required<ICreateProduct> {
    _id: string;
}

