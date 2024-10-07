import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Mensaje, SentMessage } from '../interfaces/mensaje';
import { enviroment } from '../enviroment/enviroment';
@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private socket: Socket;
  private messagesSubject: BehaviorSubject<Mensaje[]> = new BehaviorSubject<Mensaje[]>([]);

  constructor(private http: HttpClient) {
    this.socket = io(enviroment.api_url);
    this.setupSocketListeners();
  }

  private setupSocketListeners(): void {
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('new_message', (message: Mensaje) => {
      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, message]);
    });
  }

  sendMessage(data: SentMessage): Observable<Mensaje> {
    this.socket.emit('send_message', data);
    return this.http.post<Mensaje>(`${enviroment.api_url}/messages`, data);
  }

  joinRoom(userId: string, roomName: string): void {
    this.socket.emit('join_room', { user_id: userId, room_name: roomName });
  }

  leaveRoom(userId: string, roomName: string): void {
    this.socket.emit('leave_room', { user_id: userId, room_name: roomName });
  }

  getMessages(id: any): Observable<Mensaje[]> {
    return this.messagesSubject.asObservable();
  }
}
