import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { enviroment } from '../enviroment/enviroment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient, protected cookie: CookieService) { }

  getToken(): string {
    return localStorage.getItem('access_token') ?? '';
  }


  isAuthenticated(): boolean {
    return !!this.getToken();
  }


  getUser(): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`
    });

    return this.http.get<User>(`${enviroment.api_url}/user`, { headers });
  }

  getId(): string {
    return this.cookie.get('id') ?? '';
  }
  logout(): Observable<any> {
    // Perform any necessary logout actions (e.g., clearing tokens)
    // Then make an HTTP request to your backend logout endpoint
    return this.http.post(`${enviroment.api_url}/logout`, {});
  }
}
