import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../../../services/api-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent{
  selectedProduct: boolean = false;
  products: any[] = [];

  constructor(public apiService: ApiServiceService) { }

  
  selectProductType(type: string){
    this.selectedProduct = true;
    this.apiService.getProductsByType(type).subscribe((data)=>{
      data.forEach((product: any) => {
        product.image = this.apiService.getApiUrl() + product.image;
      });
      this.products=data;
    });
  }
}
