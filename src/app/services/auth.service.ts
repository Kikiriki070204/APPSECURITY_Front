import { HttpClient } from '@angular/common/http';
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

  me(): Observable<User> {
    return this.http.get<User>(`${enviroment.api_url}/user`)
  }

  getId(): string{
    return this.cookie.get('id') ?? '';
  }
}
