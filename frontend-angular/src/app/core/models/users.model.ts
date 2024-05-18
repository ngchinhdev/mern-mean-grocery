export interface ICreateUser {
    name?: string;
    email?: string;
    password?: string;
}

export interface IUser extends Required<ICreateUser> {
    _id: string;
    phone: string;
    address: string;
    avatar: string;
}
