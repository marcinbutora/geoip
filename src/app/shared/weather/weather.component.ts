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

  // dateDiff = (dateString: string, offset: number) => {
  //   const unixTime = moment.utc(dateString, 'X').add(offset, 'seconds');
  //   const actualTime = moment.utc().add(offset, 'seconds');
  //   const diff = unixTime.diff(actualTime, 'minutes');
  //   const convert = moment.duration(diff, 'minutes').humanize();
  //   if (actualTime <= unixTime) {
  //     return `in ~ ${convert}`;
  //   } else {
  //     return `~ ${convert} ago`;
  //   }
  // };
}
