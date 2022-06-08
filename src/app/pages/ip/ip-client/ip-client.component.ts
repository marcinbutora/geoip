import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IpDataService } from '../ip-data.service';
import { IP } from '../ip-model/ip';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IpWeather } from '../ip-model/ipweather';
import { IpTimeZone } from '../ip-model/iptimezone';

@Component({
  selector: 'app-ip-client',
  templateUrl: './ip-client.component.html',
  styleUrls: ['./ip-client.component.scss'],
})
export class IpClientComponent implements OnInit {
  @Input() data2: IP | undefined;
  @Input() weatherData!: IpWeather;
  @Input() timezoneData!: IpTimeZone;
  timezone: string = '';
  ip!: string;

  constructor(
    private ipService: IpDataService,
    private title: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ipService.getClientIP().subscribe((data) => {
      this.ipService.getDataByIP(data.ip).subscribe((data) => {
        this.data2 = data;
        const map = this.ipService.displayMap(data);
        this.ipService.addMarkerToMap(data, map);
        this.router.navigate([`/ip/${data.ip}`]);
        this.title.setTitle(`${data.ip} (${data.country_name}) - GeoIP`);
        this.ipService
          .getWeatherByIp(data.latitude, data.longitude)
          .subscribe((weather) => {
            this.weatherData = weather;
            this.weatherData.main.temp = Math.floor(weather.main.temp);
            this.weatherData.main.feels_like = Math.floor(
              weather.main.feels_like
            );
            this.ipService
              .getTimeZoneByIp(data.latitude, data.longitude)
              .subscribe((timezone) => {
                console.log('timezone ipClient', timezone.formatted);
                this.timezoneData = timezone;
                this.timezone = timezone.formatted;
              });
          });
      });
    });
  }
}
