import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { renderErrors } from '../../../utils/commonMethods'
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  credentials: any = {
    username: '',
    email: '',
    password: '',
    password2: ''
  };
  errorMessages: { [key: string]: string } = {};

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) { }

  register() {
    this.authService.register(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.toastService.showToast('User registration was succesful');
      },
      error: (error) => {
        this.errorMessages = renderErrors(error);
      }
    });
  }

}
