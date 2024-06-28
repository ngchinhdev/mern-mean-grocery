export interface ICreateCategory {
    name: string,
    image: File,
}

export interface ICategory extends Pick<ICreateCategory, 'name'> {
    _id: string,
    image: string;
}


