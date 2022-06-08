import { Component, Input } from '@angular/core';
import { IP } from '../ip-model/ip';
import { IpWeather } from '../ip-model/ipweather';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  @Input() data: IP | undefined;
  @Input() weather!: IpWeather;

  getWeatherTime = () => {
    const dateTime = this.weather?.dt;
    const dateTimeConverted = new Date(dateTime * 1000);
    return dateTimeConverted.toLocaleString();
  };
}
