export interface ICreateCategory {
    name: string,
    image: File,
}

export interface ICategory extends ICreateCategory {
    _id: string,
}


