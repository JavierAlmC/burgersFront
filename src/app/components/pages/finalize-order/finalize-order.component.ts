import { Component, OnInit } from '@angular/core';
import { HoursRange } from '../../../utils/enums/hours-range.enum';
import { ProductItem } from '../../../models/order/productItem';
import { ApiServiceService } from '../../../services/api-service.service';
import { ProductsService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { OrderItem } from '../../../models/order/orderItem';
import { ToastService } from '../../../services/toast.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-finalize-order',
  templateUrl: './finalize-order.component.html',
  styleUrl: './finalize-order.component.scss'
})
export class FinalizeOrderComponent implements OnInit{
  hoursRange = Object.keys(HoursRange);
  productsAdded: ProductItem[] = [];
  order: OrderItem = {
    orderDayHour: '',
    orderType: '',
    adress: '',
    info: '',
    products: []
  };

  constructor(
    private apiService: ApiServiceService,
    private productsService: ProductsService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.productsAdded = this.productsService.getProducts();
  }

  getOrderValue(key: string) {
    return HoursRange[key as keyof typeof HoursRange];
  }

  finalizeOrder() {
    this.productsAdded.forEach((product)=>{
      this.order.products.push(product.id)
    });
    
    this.apiService.createNewOrder(this.order).subscribe({
      next: response => {
        this.toastService.showToast('Order sent!')
        this.productsService.resetOrder();
        this.router.navigate(['/']);
      }
    });
  }

}
