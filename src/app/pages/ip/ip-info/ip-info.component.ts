import { Component, Input, OnInit } from '@angular/core';
import { IP } from '../ip-model/ip';
import { IpDataService } from '../ip-data.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { IpWeather } from '../ip-model/ipweather';
import { IpTimeZone } from '../ip-model/iptimezone';
import { zip } from 'rxjs';

@Component({
  selector: 'app-ip-info',
  templateUrl: './ip-info.component.html',
  styleUrls: ['./ip-info.component.scss'],
})
export class IpInfoComponent implements OnInit {
  @Input() data!: IP;
  @Input() weatherData!: IpWeather;
  @Input() timezoneData: IpTimeZone | undefined;
  @Input() isLoading: boolean = false;

  timezone: string = '';
  ip: string = '';
  lat: number = 0;
  lon: number = 0;

  constructor(
    private ipService: IpDataService,
    private route: ActivatedRoute,
    private title: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.getParamsFromUrl();
    this.isLoading = true;
    this.subscribeDataFromAPI();
    zip(
      this.ipService.getDataByIP(this.ip),
      this.ipService.getWeatherByLatAndLon(this.lat, this.lon),
      this.ipService.getTimeZoneByLatAndLon(this.lat, this.lon)
    ).subscribe(([responseData, responseWeather, responseTimezone]) => {
      this.data = responseData;
      this.isLoading = false;
      this.title.setTitle(
        this.setTitleForPage(
          responseData.ip,
          responseData.city,
          responseData.country,
          responseData.country_name
        )
      );
      this.extractMetaTags(responseData);
      this.responseWeatherAndTimezone(responseWeather, responseTimezone);
    });
  }

  private responseWeatherAndTimezone(
    responseWeather: IpWeather,
    responseTimezone: IpTimeZone
  ) {
    const map = this.ipService.displayMap(this.data);
    this.ipService.addMarkerToMap(this.data, map);
    this.weatherData = responseWeather;
    this.timezoneData = responseTimezone;
    this.timezone = responseTimezone.formatted;
  }

  private extractMetaTags(responseData: IP) {
    this.metaService.addTags([
      {
        name: 'description',
        content: `${responseData.ip}, ${responseData.city}, ${responseData.country}, ${responseData.country_name}`,
      },
      { name: 'robots', content: 'index, follow' },
      {
        property: 'og:title',
        content: this.setTitleForPage(
          responseData.ip,
          responseData.city,
          responseData.country,
          responseData.country_name
        ),
      },
    ]);
  }

  private subscribeDataFromAPI(): void {
    this.ipService.getDataByIP(this.ip).subscribe((val) => {
      this.lat = val.latitude;
      this.lon = val.longitude;
    });
  }

  private getParamsFromUrl(): void {
    this.ip = this.route.snapshot.params['ip'];
    this.lat = this.route.snapshot.params['lat'];
    this.lon = this.route.snapshot.params['lon'];
  }

  private setTitleForPage = (
    ip: string,
    city: string,
    country: string,
    country_code: string
  ) => {
    return `${ip} - ${city}, ${country}, ${country_code} - GeoIP`;
  };
}
