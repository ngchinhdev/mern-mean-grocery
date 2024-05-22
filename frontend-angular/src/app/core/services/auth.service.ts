import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IResponseDataCommon } from '../models/shares.model';
import { API_ENDPOINTS } from '../constants/urls';
import { ICreateUser, ILoginUser, IResponseLogin, IUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(private http: HttpClient) { }

  getAllUsers(page?: number, limit?: number): Observable<IResponseDataCommon<IUser[]>> {
    return this.http.get<IResponseDataCommon<IUser[]>>(
      API_ENDPOINTS.USERS_ENDPOINTS.GET_ALL_USERS + `?page=${page || 1}&limit=${limit || 10}`
    );
  }

  getUserById(id: string): Observable<IResponseDataCommon<IUser>> {
    return this.http.get<IResponseDataCommon<IUser>>(
      API_ENDPOINTS.USERS_ENDPOINTS.GET_USER_BY_ID + '/' + id
    );
  }

  createUser(user: ICreateUser): Observable<IResponseDataCommon<IUser>> {
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);

    return this.http.post<IResponseDataCommon<IUser>>(
      API_ENDPOINTS.USERS_ENDPOINTS.CREATE_USER,
      formData
    );
  }

  loginUser(user: ILoginUser): Observable<IResponseDataCommon<IResponseLogin>> {
    const formData = new FormData();

    formData.append('email', user.email);
    formData.append('password', user.password);

    return this.http.post<IResponseDataCommon<IResponseLogin>>(
      API_ENDPOINTS.USERS_ENDPOINTS.LOGIN_USER,
      formData
    );
  }

  updateUser(id: string, user: ICreateUser): Observable<IResponseDataCommon<IUser>> {
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);

    return this.http.put<IResponseDataCommon<IUser>>(
      API_ENDPOINTS.USERS_ENDPOINTS.UPDATE_USER + '/' + id,
      formData
    );
  }

  deleteUser(id: string): Observable<IResponseDataCommon<IUser>> {
    return this.http.delete<IResponseDataCommon<IUser>>(
      API_ENDPOINTS.USERS_ENDPOINTS.DELETE_USER + '/' + id
    );
  }
}
