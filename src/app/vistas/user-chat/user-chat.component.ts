import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [],
  templateUrl: './user-chat.component.html',
  styleUrl: './user-chat.component.css'
})
export class UserChatComponent {
  @Input() usuario: any;
}
