import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { SentMessage } from '../interfaces/mensaje';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  leaveRoom(senderId: number, roomName: string) {
    throw new Error('Method not implemented.');
  }
  onNewMessage() {
    throw new Error('Method not implemented.');
  }
  sendMessage(newMessage: SentMessage) {
    throw new Error('Method not implemented.');
  }

  private socket: Socket
  constructor() {
    this.socket = io('http://localhost:5000');
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string, p0: (message: any) => void): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data) => {
        observer.next(data);
      });

      // Handle cleanup
      return () => {
        this.socket.off(event);
      };
    });
  }

  joinRoom(userId: string, room: string) {
    this.emit('join', { userId, room });
  }
}
