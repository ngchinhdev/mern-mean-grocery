import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IResponseDataCommon } from '../models/shares.model';
import { IProduct } from '../models/products.model';
import { API_ENDPOINTS } from '../constants/constants';
import { Observable } from 'rxjs';

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

  getProductById(id: string) {
    return this.http.get<IResponseDataCommon<IProduct>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.GET_PRODUCT_BY_ID + '/' + id
    );
  }

  createProduct(product: IProduct) {
    const formData = new FormData();

    if (!product.name || !product.price || !product.orgPrice || !product.description || !product.images || !product.categoryId._id) return new Observable(
      observer => observer.error('All fields are required!')
    );

    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('orgPrice', product.orgPrice.toString());
    formData.append('description', product.description);
    formData.append('category', product.categoryId._id);
    product.images.forEach((image) => {
      formData.append('images', image);
    });

    return this.http.post<IResponseDataCommon<IProduct>>(
      API_ENDPOINTS.PRODUCT_ENDPOINTS.CREATE_PRODUCT,
      formData
    );
  }
}
