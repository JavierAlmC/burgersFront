import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private authService: AuthService) { }

  isLoggedIn(){
    return this.authService.isLoggedIn;
  }

  getUserName(){
    return this.authService.currentUser;
  }

  logout(event: MouseEvent){
    event.preventDefault();
    this.authService.logout().subscribe();
  }

}
