import { Component, Input, OnInit } from '@angular/core';
import { IP } from '../ip-model/ip';
import { IpDataService } from '../ip-data.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IpWeather } from '../ip-model/ipweather';
import { IpTimeZone } from '../ip-model/iptimezone';

@Component({
  selector: 'app-ip-info',
  templateUrl: './ip-info.component.html',
  styleUrls: ['./ip-info.component.scss'],
})
export class IpInfoComponent implements OnInit {
  @Input() data: IP | undefined;
  @Input() weatherData!: IpWeather;
  @Input() timezoneData!: IpTimeZone;
  timezone: string = '';
  ip: string = '';

  constructor(
    private ipService: IpDataService,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.ip = this.route.snapshot.params['ip'];
    this.ipService.getDataByIP(this.ip).subscribe((data) => {
      this.data = data;
      const map = this.ipService.displayMap(data);
      this.ipService.addMarkerToMap(data, map);
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
            .subscribe((timeZF) => {
              console.log('timezone ipInfo', timeZF.formatted);
              this.timezoneData = timeZF;
              this.timezone = timeZF.formatted;
            });
        });
    });
  }
}
