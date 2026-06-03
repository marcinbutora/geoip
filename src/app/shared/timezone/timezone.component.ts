import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IpTimeZone } from 'src/app/pages/ip/ip-model/iptimezone';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss'],
})
export class TimezoneComponent implements OnInit, OnDestroy {
  @Input() timezone: IpTimeZone | undefined;
  currentTime = '';
  currentDate = '';
  private sub?: Subscription;

  ngOnInit(): void {
    this.sub = timer(0, 1000).subscribe(() => this.tick());
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private tick(): void {
    if (!this.timezone?.zoneName) return;
    const opts: Intl.DateTimeFormatOptions = {
      timeZone: this.timezone.zoneName,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', opts);
    this.currentDate = now.toLocaleDateString('en-US', {
      timeZone: this.timezone.zoneName,
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
