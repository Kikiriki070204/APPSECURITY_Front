import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mensaje, SentMessage } from '../interfaces/mensaje';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor(protected http: HttpClient) { }

  sendMessage(data: SentMessage): Observable<Mensaje>{
    return this.http.post<Mensaje>(`${enviroment.api_url}/messages`, data);
  }
}
