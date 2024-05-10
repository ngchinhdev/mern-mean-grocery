import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ENDPOINTS } from '../constants/constants';
import { Observable } from 'rxjs';
import { ICategory } from '../models/categories.model';
import { IResponseDataCommon } from '../models/shares.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<IResponseDataCommon<ICategory[]>> {
    return this.http.get<IResponseDataCommon<ICategory[]>>(
      API_ENDPOINTS.CATEGORY_ENDPOINTS.GET_ALL_CATEGORIES
    );
  }
}
