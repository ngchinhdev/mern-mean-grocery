import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IResponseDataCommon } from '../models/shares.model';
import { API_ENDPOINTS } from '../constants/urls';
import { ICreateUser, ILoginUser, IPasswordChange, IResponseLogin, IUpdateProfile, IUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  private userProfile = new BehaviorSubject<IUser | null>(null);
  userProfile$ = this.userProfile.asObservable();

  accessToken: string | null = null;

  constructor(private http: HttpClient) { }

  setUserProfile(user: IUser | null) {
    this.userProfile.next(user);
  }

  initializeAccessToken(): void {
    this.accessToken = localStorage.getItem('accessToken');
  }

  saveAccessToken(accessToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    this.accessToken = accessToken;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  clearAccessToken() {
    localStorage.removeItem('accessToken');
  }

  getAllUsers(page?: number, limit?: number): Observable<IResponseDataCommon<IUser[]>> {
    return this.http.get<IResponseDataCommon<IUser[]>>(
      API_ENDPOINTS.USERS_ENDPOINTS.GET_ALL_USERS + `?page=${page || 1}&limit=${limit || 10}`
    );
  }

  getUserProfile(): Observable<IResponseDataCommon<IUser>> {
    const accessToken = localStorage.getItem('accessToken');
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
      formData,
      { withCredentials: true }
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
      { headers: headers, withCredentials: true }
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

  changePassword(id: string, bodyPasswordChange: IPasswordChange): Observable<IResponseDataCommon<IUser>> {
    const accessToken = localStorage.getItem('accessToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<IResponseDataCommon<IUser>>(
      API_ENDPOINTS.USERS_ENDPOINTS.CHANGE_PASSWORD + '/' + id,
      { ...bodyPasswordChange },
      { headers: headers, }
    );
  }

  refreshToken(): Observable<any> {
    return this.http.post(
      API_ENDPOINTS.USERS_ENDPOINTS.REFRESH_TOKEN,
      {},
      { withCredentials: true }
    );
  }
}
