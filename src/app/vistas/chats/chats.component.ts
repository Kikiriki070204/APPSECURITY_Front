import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { UserChatComponent } from '../user-chat/user-chat.component';
import { SocketService } from '../../services/socket.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [NgFor, NgIf, UserChatComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit {
usuarios: User[] = []
selectedUser: any = null
user_id: any = null

constructor(protected userService: UserService, protected socket: SocketService, protected cookie: AuthService){}

ngOnInit(): void {
this.usuariosActivos()
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
  console.log("start chatting with: ", this.selectedUser.name);

  this.socket.joinRoom(this.user_id);

}
}
