import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOffcanvasComponent } from './order-offcanvas.component';

describe('OrderOffcanvasComponent', () => {
  let component: OrderOffcanvasComponent;
  let fixture: ComponentFixture<OrderOffcanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderOffcanvasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
