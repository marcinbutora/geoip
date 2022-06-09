import { Component, Input, OnInit } from '@angular/core';
import { IP } from '../ip-model/ip';
import { IpDataService } from '../ip-data.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { IpWeather } from '../ip-model/ipweather';
import { IpTimeZone } from '../ip-model/iptimezone';
import { zip } from 'rxjs';

@Component({
  selector: 'app-ip-info',
  templateUrl: './ip-info.component.html',
  styleUrls: ['./ip-info.component.scss'],
})
export class IpInfoComponent implements OnInit {
  @Input() data: IP | undefined;
  @Input() weatherData: IpWeather | undefined;
  @Input() timezoneData: IpTimeZone | undefined;
  timezone: string = '';
  ip: string = '';
  lat: number = 0;
  lon: number = 0;

  constructor(
    private ipService: IpDataService,
    private route: ActivatedRoute,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData = () => {
    this.ip = this.route.snapshot.params['ip'];
    zip(
      this.ipService.getDataByIP(this.ip),
      this.ipService.getWeatherByIp(this.lat, this.lon),
      this.ipService.getTimeZoneByIp(this.lat, this.lon)
    ).subscribe(([responseDataIp, responseWeather, responseTimeZone]) => {
      this.ipService.getDataByIP(responseDataIp.ip);
      this.data = responseDataIp;
      const map = responseDataIp;
      const displayMap = this.ipService.displayMap(map);
      this.ipService.addMarkerToMap(responseDataIp, displayMap);
      this.title.setTitle(
        `${responseDataIp.ip} (${responseDataIp.country_name}) - GeoIP`
      );
      this.weatherData = responseWeather;
      this.weatherData.main.temp = Math.floor(responseWeather.main.temp);
      this.weatherData.main.feels_like = Math.floor(
        responseWeather.main.feels_like
      );
      this.timezoneData = responseTimeZone;
      this.timezone = responseTimeZone.formatted;
    });
  };
}
