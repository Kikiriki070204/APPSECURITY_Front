import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private selectedUserSource = new BehaviorSubject<any>(null);
  selectedUser$ = this.selectedUserSource.asObservable();

  setSelectedUser(user: any): void {
    this.selectedUserSource.next(user);
  }
}
