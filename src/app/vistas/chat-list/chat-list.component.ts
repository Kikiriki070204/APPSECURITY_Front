// src/app/chat-list/chat-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatService, Chat } from '../chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  chats: Chat[] = [];
  selectedChatId: number | null = null;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chats = this.chatService.getChats();
    this.chatService.getSelectedChat().subscribe(chatId => {
      this.selectedChatId = chatId;
    });
  }

  selectChat(chatId: number) {
    this.chatService.setSelectedChat(chatId);
  }
}
