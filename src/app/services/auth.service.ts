import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { userCredentials } from '../models/user/userCredentials.interface.js'

const API_URL = `http://127.0.0.1:8000`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogged = new BehaviorSubject<boolean>(false);
  currentUser: string | null = null;

  private userCredentialsSubject = new BehaviorSubject<{ username: string, password: string } | null>(null);
  userCredentials$ = this.userCredentialsSubject.asObservable();


  constructor(private http: HttpClient) {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    this.isLogged.next(isLoggedIn === 'true');
    this.currentUser = currentUser;
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  register(user: any) {
    return this.http.post(`${API_URL}/register/`, user);
  }

  login(credentials: userCredentials): Observable<any> {
    return this.http.post(`${API_URL}/login/`, credentials, { withCredentials: true }).pipe(
      tap(() => {
        this.isLogged.next(true);
        this.currentUser = credentials.username;
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', credentials.username);

        this.userCredentialsSubject.next(credentials);
        localStorage.setItem('userCredentials', JSON.stringify(credentials));
      })
    );
  }

  logout() {
    return this.http.post(`${API_URL}/logout/`, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.isLogged.next(false);
        this.currentUser = null;
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('currentUser');

        this.userCredentialsSubject.next(null);
        localStorage.removeItem('userCredentials');
      })
    );
  }

  getUserCredentials(): { username: string, password: string } | null {
    const storedCredentials = localStorage.getItem('userCredentials');
    return this.userCredentialsSubject.value || (storedCredentials ? JSON.parse(storedCredentials) : null);
  }

  private checkAuthStatus(): void {
    // Make an API call to check if the user is authenticated
    this.http.get(`${API_URL}/auth-status`, { withCredentials: true }).subscribe({
      next: () => this.isLogged.next(true),
      error: () => this.isLogged.next(false)
    });
  }
}
