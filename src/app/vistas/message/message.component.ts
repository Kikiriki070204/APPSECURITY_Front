import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() sender: any;
  @Input() recipient: any;
  @Input() content: any;
  sender_id: any = null

  constructor(protected cookie: AuthService){}

  getId()
  {
    let current_user = this.cookie.getId()
    this.sender_id = parseInt(current_user, 10);
  }


}
