import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(protected http: HttpClient) { }
  getToken(): string {
    return localStorage.getItem('access_token') ?? '';
  }
}
