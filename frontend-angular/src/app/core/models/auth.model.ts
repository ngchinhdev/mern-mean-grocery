export interface ICreateUser {
    name: string;
    email: string;
    password: string;
}

export interface ILoginUser extends Pick<ICreateUser, 'email' | 'password'> { }

export interface IForgotPassword extends Pick<ICreateUser, 'email'> { }

export interface IUser extends Required<ICreateUser> {
    _id: string;
    phone: string;
    address: string;
    avatar: string;
}

export interface IResponseLogin {
    accessToken: string;
}
