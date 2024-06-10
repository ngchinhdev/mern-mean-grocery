import { AuthFormType } from "src/constants/constants";

export interface IResponseLogin {
    accessToken: string;
}

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
}

export interface IUser extends ICreateUser {
    _id: string;
    phone: string;
    address: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
}

export interface IUpdateUser extends Pick<IUser, 'name' | 'address' | 'phone' | 'email'> { }

export interface IChangePassword {
    email: string;
    currentPassword: string;
    newPassword: string;
}

export interface ILoginUser extends Omit<ICreateUser, 'name'> { }

export interface IForgotPassword extends Pick<ICreateUser, 'email'> { }

export interface IRefreshTokenResponse {
    newAccessToken: string;
}

export interface IAuthState {
    currentFormActive: AuthFormType;
    user: IUser | null;
}