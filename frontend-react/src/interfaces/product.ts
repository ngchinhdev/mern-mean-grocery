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
    images: File[],
}

export interface IProduct extends Omit<ICreateProduct, 'categoryId' | 'images'> {
    _id: string,
    categoryId: ICategoryId,
    images: string[],
}

