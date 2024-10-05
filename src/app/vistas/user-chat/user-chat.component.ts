import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SentMessage } from '../../interfaces/mensaje';
import { MensajesService } from '../../services/mensajes.service';
import { Mensaje } from '../../interfaces/mensaje';
import { MessageComponent } from '../message/message.component';
import { NgFor, NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MessageComponent, NgIf, NgFor],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css'
})
export class UserChatComponent {
  @Input() usuario: any;
  message = new FormControl('',Validators.required)
  messages: { sender: any, recipient: any, content: any }[] = [];
  sender: any = null
  recipient: any = null
  content: any = null
  message_sent: boolean = false
  sender_id: any = null

  constructor(protected messageservice: MensajesService, protected cookie: AuthService, protected socket: SocketService){}
  sendMessage(){
    let self = this
    let current_user = this.cookie.getId()
    this.sender_id = parseInt(current_user, 10);
    let mensaje: SentMessage = {
      sender_id: this.sender_id, //<}):o){| payaso
      recipient_id: this.usuario.id,
      content: this.message.value ?? ''
    }
    this.messageservice.sendMessage(mensaje).subscribe({
      next(value: Mensaje) {
        self.messages.push({
          sender: self.sender_id,
          recipient: self.usuario.id,
          content: self.message.value
        });

        self.socket.emit('new_message', {
          sender_id: self.sender_id,
          recipient_id: self.usuario.id,
          content: self.message.value
        });
        self.message.reset();
      },
      error(err) {
        console.log(err);
      },
    })

  }


}
