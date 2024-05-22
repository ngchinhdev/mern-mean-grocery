export interface ICreateCategory {
    name: string;
    image: string;
}

export interface ICategory extends Required<ICreateCategory> {
    _id: string;
}
