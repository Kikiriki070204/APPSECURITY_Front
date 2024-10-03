import { Component, OnInit } from '@angular/core';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [NgFor],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.css'
})
export class ChatsComponent implements OnInit {
usuarios: User[] = []

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
 
}
