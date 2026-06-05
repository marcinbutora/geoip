import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'error' | 'success';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications$ = new Subject<Notification>();

  show(message: string, type: 'error' | 'success' = 'error'): void {
    this.notifications$.next({ message, type });
  }
}
