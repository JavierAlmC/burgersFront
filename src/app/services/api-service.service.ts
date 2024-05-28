import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderItem } from '../models/order/orderItem';
import { AuthService } from './auth.service';

const API_URL = `http://127.0.0.1:8000`;
const PRODUCTS = `/products/`;
const ORDERS = `/orders/`;
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient,  
    private authService: AuthService,) { }

  getApiUrl(): string {
    return API_URL;
  }

  getProductsByType(type: string): Observable<any> {
    const url = API_URL + PRODUCTS + `?productType=${type}`
    return this.http.get(url);
  }

  getProductById(id:number): Observable<any>{
    const url = API_URL + PRODUCTS + `${id}`;
    return this.http.get(url);
  }

  createNewOrder(order: OrderItem): Observable<any>{
    const url = API_URL + ORDERS
    const userCredentials = this.authService.getUserCredentials();
    
    order.orderDayHour = this.buildDateFormat(order.orderDayHour);
    return this.http.post(url, order, { withCredentials: true } );
  }

  private buildDateFormat(date:string){
    const d = new Date();
    return `${d.getFullYear()}-0${d.getMonth()}-${d.getDay()}T${date}:00Z`
  }

}
