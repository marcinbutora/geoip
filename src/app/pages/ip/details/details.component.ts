import { Component, Input } from '@angular/core';
import { IP } from '../ip-model/ip';
import { IpTimeZone } from '../ip-model/iptimezone';
import { IpWeather } from '../ip-model/ipweather';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  @Input() data: IP | undefined;
  @Input() weather: IpWeather | undefined;
  @Input() timezone: IpTimeZone | undefined;
  @Input() isLoading: boolean = false;
}
