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

  getFlag = () => {
    const flagFile = this.data?.country_tld.replace('.', '');
    if (flagFile == 'uk') {
      return `https://flagcdn.com/40x30/gb.png`;
    }
    return `https://flagcdn.com/40x30/${flagFile}.png`;
  };

  getWeatherIcon = () => {
    const weatherIconFile = this.weather?.weather?.[0]?.icon;
    return `https://openweathermap.org/img/w/${weatherIconFile}.png`;
  };
}
