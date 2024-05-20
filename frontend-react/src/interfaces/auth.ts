import { AuthFormType } from "src/constants/constants";

export interface ICreateUser {
    name: string;
    email: string;
    password: string;
}

export interface ILoginUser extends Omit<ICreateUser, 'name'> { }

export interface IAuthState {
    currentFormActive: AuthFormType;
}