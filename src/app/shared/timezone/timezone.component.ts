import { Component, Input, OnInit } from '@angular/core';
import { IpTimeZone } from 'src/app/pages/ip/ip-model/iptimezone';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.scss'],
})
export class TimezoneComponent {
  @Input() timezone: IpTimeZone | undefined;
}
