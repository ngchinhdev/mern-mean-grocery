import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IResponseDataCommon } from '../models/shares.model';
import { IProduct } from '../models/products.model';
import { API_ENDPOINTS } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<IResponseDataCommon<IProduct[]>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_ALL_PRODUCTS
    );
  }

  getHotProducts() {
    return this.http.get<IResponseDataCommon<IProduct[]>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_HOT_PRODUCTS
    );
  }
}
