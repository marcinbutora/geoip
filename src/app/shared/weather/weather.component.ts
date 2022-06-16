import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { IpWeather } from 'src/app/pages/ip/ip-model/ipweather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  @Input() weather!: IpWeather;

  getWeatherIcon = () => {
    const weatherIconFile = this.weather?.weather?.[0]?.icon;
    return `https://openweathermap.org/img/w/${weatherIconFile}.png`;
  };

  convert = (dateString: string, offset: number) => {
    const unixTime = moment
      .utc(dateString, 'X')
      .add(offset, 'seconds')
      .format('hh:mm a');
    return `${unixTime}`;
  };
}
