import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service'; // Import SocketService

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent implements OnInit {
  @Input() sender: any;
  @Input() recipient: any;
  @Input() content: any;
  sender_id: any = null;

  constructor(protected cookie: AuthService, protected socket: SocketService) {} // Inject SocketService

  ngOnInit() {
    this.getId();
    // Subscribe to new message events (adjust to your SocketService implementation)
    this.socket.on('new_message', (message: any) => {
      if (message.sender_id === this.recipient || message.recipient_id === this.recipient) {
        this.sender=1;
      }
    });
  }

  getId() {
    let current_user = this.cookie.getId();
    this.sender_id = parseInt(current_user, 10);
  }
}
