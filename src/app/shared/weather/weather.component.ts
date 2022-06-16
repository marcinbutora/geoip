import { Component, Input } from '@angular/core';
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

  convert = (dateString: number, offset: number) => {
    const unixTime = new Date((dateString + offset) * 1000);
    const hours = unixTime.getHours();
    const minutes = unixTime.getMinutes();
    return `${hours}:${minutes}`;
  };
}
