import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IResponseDataCommon } from '../models/shares.model';
import { API_ENDPOINTS } from '../constants/constants';
import { IUser } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private http: HttpClient) { }

  getAllUsers(page?: number, limit?: number): Observable<IResponseDataCommon<IUser[]>> {
    return this.http.get<IResponseDataCommon<IUser[]>>(
      API_ENDPOINTS.USERS_ENDPOINTS.GET_ALL_USERS + `?page=${page || 1}&limit=${limit || 10}`
    );
  }
}
