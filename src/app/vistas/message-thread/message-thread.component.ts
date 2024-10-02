import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../../chat.service';

@Component({
  selector: 'app-message-thread',
  templateUrl: './message-thread.component.html',
  styleUrls: ['./message-thread.component.css']
})
export class MessageThreadComponent implements OnInit {
  messages: Message[] = [];
  selectedChatId: number | null = null;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.getSelectedChat().subscribe(chatId => {
      this.selectedChatId = chatId;
      if (chatId !== null) {
        this.messages = this.chatService.getMessages(chatId);
      } else {
        this.messages = [];
      }
    });
  }
}
