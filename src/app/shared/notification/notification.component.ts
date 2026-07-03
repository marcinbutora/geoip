import { Component, OnDestroy } from '@angular/core';
import { NotificationService, Notification } from './notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  template: `
    <div
      *ngIf="notification"
      class="notification"
      [class.notification-error]="notification.type === 'error'"
      [class.notification-success]="notification.type === 'success'"
    >
      <span>{{ notification.message }}</span>
      <button
        type="button"
        class="notification-close"
        (click)="notification = null"
      >
        ✕
      </button>
    </div>
  `,
  styles: [
    `
      .notification {
        position: fixed;
        top: 4rem;
        left: 50%;
        transform: translateX(-50%);
        z-index: 10000;
        padding: 0.75rem 1.25rem;
        border-radius: 8px;
        font-size: 0.85rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        max-width: 90vw;
      }
      .notification-error {
        background: #e94560;
        color: #fff;
      }
      .notification-success {
        background: #2ecc71;
        color: #fff;
      }
      .notification-close {
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        font-size: 0.85rem;
        opacity: 0.7;
        padding: 0;
        line-height: 1;
      }
      .notification-close:hover {
        opacity: 1;
      }
    `,
  ],
})
export class NotificationComponent implements OnDestroy {
  notification: Notification | null = null;
  private sub: Subscription;
  private timeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private service: NotificationService) {
    this.sub = service.notifications$.subscribe((n) => {
      this.notification = n;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => (this.notification = null), 5000);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
