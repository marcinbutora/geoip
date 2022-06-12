import { Component, Input, OnInit } from '@angular/core';
import { IpWeather } from 'src/app/pages/ip/ip-model/ipweather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  @Input() weather: IpWeather | undefined;

  getWeatherIcon = () => {
    const weatherIconFile = this.weather?.weather?.[0]?.icon;
    return `https://openweathermap.org/img/w/${weatherIconFile}.png`;
  };
}
