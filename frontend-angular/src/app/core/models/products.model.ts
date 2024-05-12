interface ICategoryId {
    _id: string;
    name: string;
}

export interface ICreateProduct {
    name?: string;
    price?: number;
    orgPrice?: number;
    quantity?: number;
    images?: string[];
    hot?: boolean;
    description?: string;
    categoryId?: ICategoryId;
}

export interface IProduct extends Required<ICreateProduct> {
    _id: string;
}

