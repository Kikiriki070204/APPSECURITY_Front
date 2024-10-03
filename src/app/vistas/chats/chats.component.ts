import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { NgFor, NgIf } from '@angular/common';
import { UserChatComponent } from '../user-chat/user-chat.component';

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

constructor(protected userService: UserService){}

ngOnInit(): void {
this.usuariosActivos()
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
 
selectedUserChat(usuario: User){
this.selectedUser = usuario
console.log("start chatting with: ", this.selectedUser.name)
}

}
