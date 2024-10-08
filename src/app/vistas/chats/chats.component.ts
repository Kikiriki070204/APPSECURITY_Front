import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { UserChatComponent } from '../user-chat/user-chat.component';
import { SocketService } from '../../services/socket.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [NgFor, NgIf, UserChatComponent],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
  providers: [SocketService]
})
export class ChatsComponent implements OnInit {
  usuarios: User[] = [];
  selectedUser: User | null = null;
  user_id: number | null = null;

  constructor(
    protected userService: UserService,
    protected socket: SocketService,
    protected authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuariosActivos();
    const current_user = this.authService.getId();
    this.user_id = current_user ? parseInt(current_user, 10) : null;
  }

  usuariosActivos(): void {
    this.userService.usuariosActivos().subscribe(
      users => {
        this.usuarios = users.usuarios;
        console.log("usuarios", this.usuarios);
      },
      error => {
        console.error("Error fetching active users:", error);
        // Handle error (e.g., show a notification to the user)
      }
    );
  }

  selectedUserChat(usuario: User): void {
    this.selectedUser = usuario;
    console.log("start chatting with:", this.selectedUser.name);

    if (this.user_id !== null) {
      this.socket.joinRoom(this.user_id.toString(), 'room');
    } else {
      console.error("User ID is null. Unable to join room.");
      // Handle error (e.g., show a notification to the user or redirect to login)
    }
  }

}
