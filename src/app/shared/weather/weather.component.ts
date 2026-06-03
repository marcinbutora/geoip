import { Component, Input } from '@angular/core';
import { IpWeather } from 'src/app/pages/ip/ip-model/ipweather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  @Input() weather!: IpWeather;

  get iconUrl(): string {
    const icon = this.weather?.weather?.[0]?.icon;
    return `https://openweathermap.org/img/w/${icon}.png`;
  }

  get description(): string {
    return this.weather?.weather?.[0]?.description || '';
  }

  convert(unixTimestamp: number, offset: number): string {
    const date = new Date((unixTimestamp + offset) * 1000);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
}
