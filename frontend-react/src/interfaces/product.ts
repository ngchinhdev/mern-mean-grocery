export interface ICategoryId {
    _id: string;
    name: string;
}

export interface ICreateProduct {
    name: string,
    description: string,
    price: number,
    orgPrice: number,
    quantity: number,
    categoryId: string,
    hot: boolean;
    images: string[],
}

export interface IProduct extends Omit<ICreateProduct, 'categoryId'> {
    _id: string,
    categoryId: ICategoryId,
}

