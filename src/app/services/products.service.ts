import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, debounceTime } from 'rxjs';
import { ProductItem } from '../models/order/productItem';
import { ToastService } from './toast.service';
import { AuthService } from './auth.service';

const LOCAL_STORAGE_KEY = 'products';
const HALF_HOUR_MILISECONDS = 30*60*1000;
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsSubject = new BehaviorSubject<ProductItem[]>(this.getProductsFromLocalStorage());
  products$ = this.productsSubject.asObservable();
  orderTime$ = new Subject<void>();

  constructor(private toastService: ToastService){
    this.startResetTimer();
  }

  addProduct(product: ProductItem) {
    const currentProducts = this.productsSubject.value;
    this.productsSubject.next([...currentProducts, product]);
    this.saveProductsToLocalStorage();
    this.orderTime$.next();
  }

  removeProduct(index: number) {
    const currentProducts = this.productsSubject.value;
    currentProducts.splice(index, 1);
    this.productsSubject.next([...currentProducts]);
    this.saveProductsToLocalStorage();
    this.orderTime$.next();
  }

  getProducts() {
    return this.productsSubject.value;
  }

  private saveProductsToLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.productsSubject.value));
  }

  private getProductsFromLocalStorage(): any[] {
    const storedProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedProducts ? JSON.parse(storedProducts) : [];
  }
  
  private startResetTimer(){
    this.orderTime$.pipe(debounceTime(HALF_HOUR_MILISECONDS)).subscribe(()=>{
      this.resetOrder();
      this.toastService.showToast('Order session has expired','error')
    });
  }

  resetOrder(){
    this.productsSubject.next([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }

  
}
