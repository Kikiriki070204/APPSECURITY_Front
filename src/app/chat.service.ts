// src/app/chat.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export interface Message {
  id: number;
  content: string;
  timestamp: string;
  isMine: boolean;
  sender: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private chats: Chat[] = [
    { id: 1, name: "Alice Johnson", avatar: "/avatar1.png", lastMessage: "Hey, how's it going?", timestamp: "10:30 AM", unread: 2 },
    { id: 2, name: "Bob Smith", avatar: "/avatar2.png", lastMessage: "Did you see the new movie?", timestamp: "Yesterday", unread: 0 },
    { id: 3, name: "Carol White", avatar: "/avatar3.png", lastMessage: "Meeting at 3 PM", timestamp: "Mon", unread: 1 },
    { id: 4, name: "David Brown", avatar: "/avatar4.png", lastMessage: "Thanks for your help!", timestamp: "Tue", unread: 0 },
  ];

  private messages: { [key: number]: Message[] } = {
    1: [
      { id: 1, content: "Hey, how's it going?", timestamp: "2023-09-29T10:30:00Z", isMine: false, sender: "Alice Johnson" },
      { id: 2, content: "I'm doing well, thanks! How about you?", timestamp: "2023-09-29T10:32:00Z", isMine: true, sender: "You" },
    ],
    2: [
      { id: 1, content: "Did you see the new movie?", timestamp: "2023-09-28T15:45:00Z", isMine: false, sender: "Bob Smith" },
      { id: 2, content: "Not yet, is it good?", timestamp: "2023-09-28T16:00:00Z", isMine: true, sender: "You" },
    ],
  };

  private selectedChatSubject = new BehaviorSubject<number | null>(null);

  getChats(): Chat[] {
    return this.chats;
  }

  getMessages(chatId: number): Message[] {
    return this.messages[chatId] || [];
  }

  setSelectedChat(chatId: number | null) {
    this.selectedChatSubject.next(chatId);
  }

  getSelectedChat(): Observable<number | null> {
    return this.selectedChatSubject.asObservable();
  }
}
