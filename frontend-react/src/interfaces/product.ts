export interface ICategoryId {
    _id: string;
    name: string;
}

export interface ICreateProduct {
    name?: string,
    description?: string,
    price?: number,
    orgPrice?: number,
    quantity?: number,
    categoryId?: string,
    images?: string[],
}

export interface IProduct extends Required<Omit<ICreateProduct, 'categoryId'>> {
    _id: string,
    categoryId: ICategoryId,
}

