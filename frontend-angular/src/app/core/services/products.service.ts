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

  getAllProducts(page?: number, limit?: number) {
    return this.http.get<IResponseDataCommon<IProduct[]>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_ALL_PRODUCTS + `?page=${page || 1}&limit=${limit || 10}`
    );
  }

  getHotProducts() {
    return this.http.get<IResponseDataCommon<IProduct[]>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_HOT_PRODUCTS
    );
  }

  getProductById(id: string) {
    return this.http.get<IResponseDataCommon<IProduct>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_PRODUCT_BY_ID + '/' + id
    );
  }

  createProduct(product: ICreateProduct) {
    const formData = new FormData();

    if (!product.name || !product.price || !product.orgPrice || !product.quantity || !product.description || !product.images?.length || !product.categoryId) return new Observable(
      observer => observer.error('All fields are required!')
    );

    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('orgPrice', product.orgPrice.toString());
    formData.append('quantity', product.quantity.toString());
    formData.append('description', product.description);
    formData.append('categoryId', product.categoryId);
    console.log(product.images);
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

    if (!product.name || !product.price || !product.orgPrice || !product.quantity || !product.description || !product.images?.length || !product.categoryId) return new Observable(
      observer => observer.error('All fields are required!')
    );

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
