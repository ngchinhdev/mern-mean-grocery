import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IResponseDataCommon } from '../models/shares.model';
import { ICreateProduct, IProduct } from '../models/products.model';
import { API_ENDPOINTS } from '../constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor(private http: HttpClient) { }

  getAllProducts(page?: number, limit?: number, sort?: string) {
    return this.http.get<IResponseDataCommon<IProduct[]>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_ALL_PRODUCTS + `?page=${page || 1}&limit=${limit || 10}&sort=${sort || '-createdAt'}`
    );
  }

  getHotProducts() {
    return this.http.get<IResponseDataCommon<IProduct[]>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_HOT_PRODUCTS
    );
  }

  getSearchProducts(name: string) {
    return this.http.get<IResponseDataCommon<IProduct[]>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_SEARCH_PRODUCTS + '?name=' + name
    );
  }

  getProductById(id: string) {
    return this.http.get<IResponseDataCommon<IProduct>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_PRODUCT_BY_ID + '/' + id
    );
  }

  getProductsByCategoryId(id: string) {
    return this.http.get<IResponseDataCommon<IProduct[]>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_PRODUCT_BY_CATEGORY_ID + '/' + id
    );
  }

  createProduct(product: ICreateProduct) {
    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('orgPrice', product.orgPrice.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append('description', product.description);
    formData.append('categoryId', product.categoryId);
    product.images.forEach((image) => {
      formData.append('images', image);
    });

    return this.http.post<IResponseDataCommon<IProduct>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.CREATE_PRODUCT,
      formData
    );
  }

  updateProduct(id: string, product: ICreateProduct) {
    const formData = new FormData();

    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('orgPrice', product.orgPrice.toString());
    formData.append('hot', product.hot.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append('description', product.description);
    formData.append('categoryId', product.categoryId);
    product.images.forEach((image) => {
      formData.append('images', image);
    });

    return this.http.put<IResponseDataCommon<IProduct>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.UPDATE_PRODUCT + '/' + id,
      formData
    );
  }

  deleteProduct(id: string) {
    return this.http.delete<IResponseDataCommon<IProduct>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.DELETE_PRODUCT + '/' + id
    );
  }
}
