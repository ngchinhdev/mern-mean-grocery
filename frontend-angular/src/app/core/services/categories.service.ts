import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/urls';
import { ICategory, ICreateCategory } from '../models/categories.model';
import { IResponseDataCommon } from '../models/shares.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) { }

  getAllCategories(page?: number, limit?: number): Observable<IResponseDataCommon<ICategory[]>> {
    return this.http.get<IResponseDataCommon<ICategory[]>>(
      API_ENDPOINTS.CATEGORY_ENDPOINTS.GET_ALL_CATEGORIES + `?page=${page || 1}&limit=${limit || 10}&sort=-createdAt`
    );
  }

  getCategoryById(id: string): Observable<IResponseDataCommon<ICategory>> {
    return this.http.get<IResponseDataCommon<ICategory>>(
      API_ENDPOINTS.CATEGORY_ENDPOINTS.GET_CATEGORY_BY_ID + '/' + id
    );
  }

  createCategory(category: ICreateCategory): Observable<IResponseDataCommon<ICategory>> {
    const formData = new FormData();

    formData.append('name', category.name);
    formData.append('image', category.image);

    return this.http.post<IResponseDataCommon<ICategory>>(
      API_ENDPOINTS.CATEGORY_ENDPOINTS.CREATE_CATEGORY,
      formData
    );
  }

  updateCategory(id: string, category: ICreateCategory): Observable<IResponseDataCommon<ICategory>> {
    const formData = new FormData();

    if (category.image) {
      formData.append('image', category.image);
    }

    formData.append('name', category.name);

    return this.http.put<IResponseDataCommon<ICategory>>(
      API_ENDPOINTS.CATEGORY_ENDPOINTS.UPDATE_CATEGORY + '/' + id,
      formData
    );
  }

  deleteCategory(id: string): Observable<IResponseDataCommon<ICategory>> {
    return this.http.delete<IResponseDataCommon<ICategory>>(
      API_ENDPOINTS.CATEGORY_ENDPOINTS.DELETE_CATEGORY + '/' + id
    );
  }
}
