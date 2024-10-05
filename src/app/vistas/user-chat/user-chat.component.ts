import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SentMessage } from '../../interfaces/mensaje';
import { MensajesService } from '../../services/mensajes.service';
import { Mensaje } from '../../interfaces/mensaje';
import { MessageComponent } from '../message/message.component';
import { NgFor, NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { Socket } from 'socket.io-client';
import { SocketService } from '../../services/socket.service';
import { User } from '../../interfaces/user';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MessageComponent, NgIf, NgFor],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css'
})
export class UserChatComponent {
  @Input() usuario: any;
  selectedUser: User | null = null;
  message = new FormControl('',Validators.required)
  messages: { sender: any, recipient: any, content: any }[] = [];
  sender: any = null
  recipient: any = null
  content: any = null
  message_sent: boolean = false
  mensaje: any = null
  sender_id: any = null

  constructor(protected messageservice: MensajesService, 
    protected cookie: AuthService, protected socket: SocketService,
    private chatService: ChatService
  ){}
  ngOnInit(): void {
    this.chatService.selectedUser$.subscribe(user => {
      if (user) {
        this.selectedUser = user;
        this.loadMessages();
      }
    });
  }

  loadMessages(): void {
    if (this.selectedUser) {
      this.messageservice.getMessages(this.usuario.id).subscribe({
        next: (mensajes) => {
          console.log("Mensajes cargados:", mensajes);
          this.messages = mensajes.map(mensaje => ({
            sender: mensaje.sender_id,
            recipient: this.usuario.id,
            content: mensaje.content
          }));
        },
        error: (err) => {
          console.error("Error al cargar los mensajes:", err);
        }
      });
    }
  }
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
      next: (value: Mensaje) => {
        const roomName = `chat_${Math.min(this.sender_id, this.usuario.id)}_${Math.max(this.sender_id, this.usuario.id)}`;
        
        this.socket.emit('send_message', {
          sender_id: this.sender_id,
          recipient_id: this.usuario.id,
          content: this.message.value,
          room_name: roomName
        });
    
        this.messages.push({
          sender: this.sender_id,
          recipient: this.usuario.id,
          content: this.message.value
        });
    
        this.message.reset();
      },
      error: (err) => {
        console.log(err);
      },
    })

  }


}
