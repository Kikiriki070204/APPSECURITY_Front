import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { MensajesService } from '../../services/mensajes.service';
import { NgFor, NgIf } from '@angular/common';
import { UserChatComponent } from '../user-chat/user-chat.component';
import { SocketService } from '../../services/socket.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [NgFor, NgIf,
    UserChatComponent,


  ],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit {
usuarios: User[] = []
selectedUser: any = null
user_id: any = null
messages: any[] = []


constructor(protected userService: UserService,
  protected socket: SocketService, protected cookie: AuthService,
protected MensajesService: MensajesService,
protected chatService: ChatService,
protected cookiee: CookieService,
private HttpClient: HttpClient
){}

ngOnInit(): void {
this.usuariosActivos()
console.log("usuarios")
console.log(localStorage.getItem('access_token'))
let current_user = this.cookie.getId()
    this.user_id = parseInt(current_user, 10);
}

usuariosActivos(): void
{
  this.userService.usuariosActivos()
    .subscribe(users => {
      this.usuarios = users.usuarios;
      console.log("usuarios")
      console.log(this.usuarios)
    });
}

selectedUserChat(usuario: User): void {
  this.selectedUser = usuario;
  this.chatService.setSelectedUser(usuario);

  console.log("start chatting with: ", this.selectedUser.name);

  const roomName = `chat_${Math.min(this.user_id, this.selectedUser.id)}_${Math.max(this.user_id, this.selectedUser.id)}`;

  this.socket.emit('join_room', { user_id: this.user_id, room_name: roomName });

  this.socket.onNewMessage((data) => {
    console.log('Nuevo mensaje recibido:', data);
    this.messages.push(data); // Añadir el nuevo mensaje al array
  });

  this.socket.checkRooms();
}

logout(): void {
  console.log(localStorage.getItem('access_token'));
  this.userService.logout().subscribe(() => {
    this.cookiee.delete('id');
    localStorage.removeItem('access_token');
    this.socket.disconnect();
    window.location.href = '/';
    console.log("logout");
  }, error => {
    console.error('Logout failed', error);
  });
}


}
