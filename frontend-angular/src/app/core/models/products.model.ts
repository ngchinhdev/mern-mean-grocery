interface ICategoryId {
    _id?: string;
    name?: string;
}

export interface ICreateProduct {
    name?: string;
    price?: number;
    orgPrice?: number;
    quantity?: number;
    images?: string[];
    hot: boolean;
    description?: string;
    categoryId: string;
}

export interface IProduct extends Required<Omit<ICreateProduct, 'categoryId'>> {
    _id: string;
    categoryId: ICategoryId;
}

