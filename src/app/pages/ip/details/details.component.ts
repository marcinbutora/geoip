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

  convertNumberToDate = (numberToConvert: number) => {
    let changeTimestamp = new Date(numberToConvert * 1000);
    let hours = changeTimestamp.getHours();
    let minutes = changeTimestamp.getUTCMinutes();
    let year = changeTimestamp.getFullYear();
    let day = changeTimestamp.getDate();
    let month = changeTimestamp.getMonth() + 1;
    let ampm = hours >= 12 ? 'AM' : 'PM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    let converted = `${year}/${month}/${day} ${hours}:${minutes} ${ampm}`;
    return converted;
  };
}
