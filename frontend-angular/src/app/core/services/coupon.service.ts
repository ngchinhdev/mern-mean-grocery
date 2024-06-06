import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IResponseDataCommon } from '../models/shares.model';
import { API_ENDPOINTS } from '../constants/urls';
import { ICoupon, ICreateCoupon } from '../models/coupon.model';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }

  getAllCoupons(page?: number, limit?: number): Observable<IResponseDataCommon<ICoupon[]>> {
    return this.http.get<IResponseDataCommon<ICoupon[]>>(
      API_ENDPOINTS.COUPON_ENDPOINTS.GET_ALL_COUPONS + `?page=${page || 1}&limit=${limit || 10}`
    );
  }

  getCouponById(id: string): Observable<IResponseDataCommon<ICoupon>> {
    return this.http.get<IResponseDataCommon<ICoupon>>(
      API_ENDPOINTS.COUPON_ENDPOINTS.GET_COUPON_BY_ID + '/' + id
    );
  }

  getCouponByCode(code: string): Observable<IResponseDataCommon<ICoupon>> {
    return this.http.get<IResponseDataCommon<ICoupon>>(
      API_ENDPOINTS.COUPON_ENDPOINTS.GET_COUPON_BY_CODE + '/' + code
    );
  }

  createCoupon(coupon: ICoupon): Observable<IResponseDataCommon<ICreateCoupon>> {
    return this.http.post<IResponseDataCommon<ICreateCoupon>>(
      API_ENDPOINTS.COUPON_ENDPOINTS.CREATE_COUPON,
      coupon,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  updateCoupon(id: string, coupon: ICoupon): Observable<IResponseDataCommon<ICreateCoupon>> {
    return this.http.put<IResponseDataCommon<ICreateCoupon>>(
      API_ENDPOINTS.COUPON_ENDPOINTS.UPDATE_COUPON + '/' + id,
      coupon,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  deleteCoupon(id: string): Observable<IResponseDataCommon<ICoupon>> {
    return this.http.delete<IResponseDataCommon<ICoupon>>(
      API_ENDPOINTS.COUPON_ENDPOINTS.DELETE_COUPON + '/' + id
    );
  }
}
