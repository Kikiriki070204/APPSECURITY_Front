import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SentMessage } from '../../interfaces/mensaje';
import { MensajesService } from '../../services/mensajes.service';
import { Mensaje } from '../../interfaces/mensaje';
import { MessageComponent } from '../message/message.component';
import { NgFor, NgIf } from '@angular/common';

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

  constructor(protected messageservice: MensajesService){}
  sendMessage(){
    let self = this
    let mensaje: SentMessage = {
      sender_id: 1, //john, este 1 es debido a que aun no existe una ruta me, cuando exista esa ruta me, debemos
      //crear un método (puede ser dentro del auth.service.ts) que guarde como cookie el id del usuario, este metodo 
      //debemos implementarlo en el momento del login <}:=0), aqui unicamente lo mandas a llamar y guardas
      //en alguna variable este valor :=D
      recipient_id: this.usuario.id,
      content: this.message.value ?? ''
    }
    this.messageservice.sendMessage(mensaje).subscribe({
      next(value: Mensaje) {
        self.messages.push({
          sender: 1,
          recipient: self.usuario.id,
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
