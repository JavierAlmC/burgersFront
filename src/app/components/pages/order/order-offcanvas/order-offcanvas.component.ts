import { Component, TemplateRef, OnInit } from '@angular/core';
import { NgbOffcanvas, NgbOffcanvasConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductItem } from '../../../../models/order/productItem';
import { ProductsService } from '../../../../services/products.service';

@Component({
  selector: 'order-offcanvas',
  templateUrl: './order-offcanvas.component.html',
  styleUrl: './order-offcanvas.component.scss'
})
export class OrderOffcanvasComponent implements OnInit {
  productsAdded: ProductItem[] = [];
  totalPrice: number = 0;

  constructor(
    private offcanvasService: NgbOffcanvas,
    private productService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productService.products$.subscribe(products => {
      this.productsAdded = products;
      this.calculateOrderPrice();
    });
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end', backdrop: false });
  }

  removeProduct(index:number): void {
    this.productService.removeProduct(index);
  }

  private calculateOrderPrice(): void{
    this.totalPrice = this.productsAdded.reduce((total, product)=> total + parseFloat(product.price), 0.5);
  }
}
