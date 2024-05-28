import { Component, Output, EventEmitter } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';
import { ProductItem } from '../../../models/order/productItem';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  selectedProduct: boolean = false;
  productsList: ProductItem[] = [];

  constructor(private apiService: ApiServiceService, private productsService: ProductsService) { }

  
  selectProductType(type: string){
    this.selectedProduct = true;
    this.apiService.getProductsByType(type).subscribe((data)=>{
      data.forEach((product: ProductItem) => {
        product.image = this.apiService.getApiUrl() + product.image;
      });
      this.productsList=data;
    });
  }
  addProductToCart(product: ProductItem){
    this.productsService.addProduct(product)
  }
}
