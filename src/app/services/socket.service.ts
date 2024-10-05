import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket 
  constructor() { 
    this.socket = io('http://localhost:5000');
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }

  on(event: string, p0: (rooms: any) => void): Observable<any> {
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

  joinRoom(userId: string) {
    this.socket.emit('join', { userId });
  }

  onNewMessage(callback: (data: any) => void) {
    this.socket.on('new_message', callback);
  }
  disconnect() {
    this.socket.disconnect();
  }

  checkRooms() {
    this.socket.emit('check_rooms');
  }
  
}
