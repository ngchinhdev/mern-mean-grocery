import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseDataCommon } from '../models/shares.model';
import { IBestSelling, ICreateOrder, IOrder } from '../models/order.model';
import { API_ENDPOINTS } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  constructor(private http: HttpClient) { }

  getAllOrders(page?: number, limit?: number): Observable<IResponseDataCommon<IOrder[]>> {
    return this.http.get<IResponseDataCommon<IOrder[]>>(
      API_ENDPOINTS.ORDER_ENDPOINTS.GET_ALL_ORDERS + `?page=${page || 1}&limit=${limit || 10}&sort=-createdAt`
    );
  }

  getBestSelling(page?: number, limit?: number): Observable<IResponseDataCommon<IBestSelling[]>> {
    return this.http.get<IResponseDataCommon<IBestSelling[]>>(
      API_ENDPOINTS.ORDER_ENDPOINTS.GET_TOP_SELLING + `?page=${page || 1}&limit=${limit || 10}`
    );
  }

  getOrderById(id: string): Observable<IResponseDataCommon<IOrder>> {
    return this.http.get<IResponseDataCommon<IOrder>>(
      API_ENDPOINTS.ORDER_ENDPOINTS.GET_ORDER_BY_ID + '/' + id
    );
  }

  getOrdersByUserId(id: string): Observable<IResponseDataCommon<IOrder[]>> {
    return this.http.get<IResponseDataCommon<IOrder[]>>(
      API_ENDPOINTS.ORDER_ENDPOINTS.GET_ORDER_BY_USER_ID + '/' + id
    );
  }

  createOrder(order: ICreateOrder): Observable<IResponseDataCommon<IOrder>> {
    return this.http.post<IResponseDataCommon<IOrder>>(
      API_ENDPOINTS.ORDER_ENDPOINTS.CREATE_ORDER,
      order,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  updateOrder(id: string, body: any): Observable<IResponseDataCommon<IOrder>> {
    return this.http.put<IResponseDataCommon<IOrder>>(
      API_ENDPOINTS.ORDER_ENDPOINTS.UPDATE_ORDER + '/' + id,
      body,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  cancelOrder(id: string): Observable<IResponseDataCommon<IOrder>> {
    return this.http.put<IResponseDataCommon<IOrder>>(
      API_ENDPOINTS.ORDER_ENDPOINTS.CANCEL_ORDER + '/' + id,
      {},
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  sendInvoice(order: IOrder): Observable<IResponseDataCommon<any>> {
    return this.http.post<IResponseDataCommon<any>>(
      API_ENDPOINTS.ORDER_ENDPOINTS.SEND_INVOICE,
      { order },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
}
