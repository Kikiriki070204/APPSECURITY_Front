import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SentMessage, Mensaje } from '../../interfaces/mensaje';
import { MensajesService } from '../../services/mensajes.service';
import { MessageComponent } from '../message/message.component';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MessageComponent, NgIf, NgFor],
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {
  @Input() usuario: any;
  message = new FormControl('', Validators.required);
  messages: SentMessage[] = [];
  senderId: number;
  private newMessageSubscription: Subscription = new Subscription;

  constructor(
    private messageService: MensajesService,
    private authService: AuthService,
    private socketService: SocketService
  ) {
    this.senderId = parseInt(this.authService.getId(), 10);
  }

  ngOnInit() {
    this.joinRoom();
    this.receivedMessages()
  }

  // ngOnDestroy() {
  //   this.leaveRoom();
  //   if (this.newMessageSubscription) {
  //     this.newMessageSubscription.unsubscribe();
  //   }
  // }

  private joinRoom() {
    this.socketService.joinRoom(this.senderId.toString(), 'room'); //este string de room es temporal debemos hacer uno personalizado
  }

  // private leaveRoom() {
  //   const roomName = this.getRoomName();
  //   this.socketService.leaveRoom(this.senderId, roomName);
  // }

  // private getRoomName(): string {
  //   return `chat_${Math.min(this.senderId, this.usuario.id)}_${Math.max(this.senderId, this.usuario.id)}`;
  // }

  // private loadMessages() {
  //   this.messageService.getMessages(this.usuario.id).subscribe({
  //     next: (messages: Mensaje[]) => {
  //       this.messages = messages;
  //     },
  //     error: (err) => console.error('Error loading messages:', err)
  //   });
  // }


  receivedMessages(): void
  {
   
    this.messageService.getMessages(this.senderId)
    .subscribe(messages => {
    }); 
  }

  sendMessage(){
  let self = this
   let new_message: SentMessage = {
    sender_id: this.senderId,
    recipient_id: this.usuario.id,
    content: this.message.value ?? ""
   }

   this.messageService.sendMessage(new_message).subscribe({
    next(value: Mensaje){
      self.socketService.emit('send_message', new_message);
      console.log("mensaje enviado con éxito")
      self.messages.push({
        sender_id: self.senderId,
        recipient_id: self.usuario.id,
        content: self.message.value ?? ""
      });
      self.message.reset();

    }, error(err) {
      console.log(err)
      console.log("no se envio el mensaje")
    },
   })
  }
  // private listenForNewMessages() {
  //   this.newMessageSubscription = this.socketService.onNewMessage().subscribe({
  //     next: (message: Mensaje) => {
  //       if (
  //         (message.sender_id === this.senderId && message.recipient_id === this.usuario.id) ||
  //         (message.sender_id === this.usuario.id && message.recipient_id === this.senderId)
  //       ) {
  //         this.messages.push(message);
  //       }
  //     },
  //     error: (err) => console.error('Error receiving new message:', err)
  //   });
  // }

  //      sendMessage() {
  //     if (this.message.invalid) return;
    
  //     const newMessage: Mensaje = {
  //       sender_id: this.senderId,
  //       recipient_id: this.usuario.id,
  //       content: new Text(this.message.value ?? ''), // Convert string to Text
  //       timestamp: new Date(), // Assigning a Date object instead of a string
  //       id: Date.now() // Temporary ID
  //     };
    
  //     // Optimistically add the message to the UI
  //     this.messages.push(newMessage);
    
  //     // Send message via WebSocket
  //     this.socketService.sendMessage(newMessage);
    
  //     // Fallback: Send message via HTTP if WebSocket fails
  //     this.messageService.sendMessage(newMessage).subscribe({
  //       error: (err) => {
  //         console.error('Error sending message via HTTP:', err);
  //         // You might want to notify the user or retry
  //       }
  //     });
    
  //     this.message.reset();
  //   }
}