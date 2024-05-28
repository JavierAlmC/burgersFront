import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap'
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'toast-component',
  templateUrl: './toast-component.component.html',
  styleUrl: './toast-component.component.scss'
})
export class ToastComponentComponent implements OnInit {
  message: string | null = null;
  type: string = 'success';

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.toast$.subscribe(toast => {
      if (toast) {
        this.message = toast.message;
        this.type = toast.type;
        this.showToast();
      }
    });
  }

  showToast() {
    const toastElement = document.getElementById('liveToast');
    if (toastElement) {
      const toast = new bootstrap.Toast(toastElement);
      toast.show();
    }
  }

}
