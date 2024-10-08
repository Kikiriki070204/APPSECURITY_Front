import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Register, User, UsuariosActivos } from '../interfaces/user';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) { }

  register (data: Register): Observable<User>{
    return this.http.post<User>(`${enviroment.api_url}/register`, data);
  }

  login (data: Login): Observable<User>{
    return this.http.post<User>(`${enviroment.api_url}/login`, data);
  }

  usuariosActivos(): Observable<UsuariosActivos>{
    return this.http.get<UsuariosActivos>(`${enviroment.api_url}/menu`);
  }
   logout(): Observable<any> {
    console.log(localStorage.getItem('access_token'));
    console.log("logout");

    const token = localStorage.getItem('access_token'); // Assuming you store the token in localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${enviroment.api_url}/logout`, {}, { headers });
  }
}
