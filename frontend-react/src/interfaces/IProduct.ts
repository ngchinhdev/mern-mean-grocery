export interface ICreateProduct {
    name?: string,
    description?: string,
    price?: number,
    orgPrice?: number,
    quantity?: number,
    categoryId?: string,
    images?: string[],
}

export interface IProduct extends Required<ICreateProduct> {
    _id: string,
}