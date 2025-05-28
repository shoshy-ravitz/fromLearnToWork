import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponseModel } from '../models/auth.model';
import { RegisterModel } from '../models/user.model';
import { LoginModel } from '../models/user.model';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl =`${environment.apiUrl}/Auth` ;

  constructor(private http: HttpClient) { }

  register(user: RegisterModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${this.apiUrl}/register`, user);
  }

  login(user: LoginModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${this.apiUrl}/login`, user);
  }

  logout(): void {
    localStorage.removeItem('token'); // Assuming token is stored in local storage
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Check if token exists
  }
  getToken(): string | null {
    return localStorage.getItem('token'); // Retrieve token from local storage
  }
}