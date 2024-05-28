import { Component } from '@angular/core';
import { userCredentials } from '../../../models/user/userCredentials.interface';
import { AuthService } from '../../../services/auth.service';
import { renderErrors } from '../../../utils/commonMethods';
import { Router } from '@angular/router';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  credentials: userCredentials = {
    username: '',
    password: ''
  };
  errorMessages: { [key: string]: string } = {};

  constructor(private authService: AuthService, private router: Router, private toastService: ToastService) { }

  login() {
    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.toastService.showToast('Login was succesful');
      },
      error: (error) => {
        this.errorMessages = renderErrors(error)
      }
    });
  }
}