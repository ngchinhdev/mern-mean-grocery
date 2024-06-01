import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IResponseDataCommon } from '../models/shares.model';
import { API_ENDPOINTS } from '../constants/urls';
import { ICreateUser, ILoginUser, IResponseLogin, IUpdateProfile, IUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  private userProfile = new BehaviorSubject<IUser | null>(null);
  userProfile$ = this.userProfile.asObservable();

  accessToken: string = '';

  constructor(private http: HttpClient) { }

  setUserProfile(user: IUser | null) {
    this.userProfile.next(user);
  }

  getAllUsers(page?: number, limit?: number): Observable<IResponseDataCommon<IUser[]>> {
    return this.http.get<IResponseDataCommon<IUser[]>>(
      API_ENDPOINTS.USERS_ENDPOINTS.GET_ALL_USERS + `?page=${page || 1}&limit=${limit || 10}`
    );
  }

  getUserProfile(): Observable<IResponseDataCommon<IUser>> {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`
    });

    if (!accessToken) return new Observable();

    return this.http.get<IResponseDataCommon<IUser>>(
      API_ENDPOINTS.USERS_ENDPOINTS.GET_USER_PROFILE,
      { headers: headers, withCredentials: true }
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

  logoutUser() {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'authorization': `Bearer ${accessToken}`
    });

    return this.http.post(
      API_ENDPOINTS.USERS_ENDPOINTS.LOGOUT_USER,
      {},
      { headers: headers }
    );
  }

  updateUserProfile(id: string, user: IUpdateProfile): Observable<IResponseDataCommon<IUser>> {
    const formData = new FormData();

    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('phone', user.phone || '');
    formData.append('address', user.address || '');
    formData.append('avatar', user.avatar || '');

    return this.http.put<IResponseDataCommon<IUser>>(
      API_ENDPOINTS.USERS_ENDPOINTS.UPDATE_USER_PROFILE + '/' + id,
      formData
    );
  }

  deleteUser(id: string): Observable<IResponseDataCommon<IUser>> {
    return this.http.delete<IResponseDataCommon<IUser>>(
      API_ENDPOINTS.USERS_ENDPOINTS.DELETE_USER + '/' + id
    );
  }
}
