import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  @Input() sender: any;
  @Input() recipient: any;
  @Input() content: any;
  sender_id: number = 0;

  constructor(protected cookie: AuthService){
    this.sender_id = parseInt(this.cookie.getId(), 10);
  }
  ngOnInit() {
    this.getId(); 
  }
  getId()
  {
    let current_user = this.cookie.getId()
    this.sender_id = parseInt(current_user, 10);
  }


}
