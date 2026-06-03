import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IP } from './ip-model/ip';
import { IpClient } from './ip-model/ipclient';
import { IpWeather } from './ip-model/ipweather';
import { IpTimeZone } from './ip-model/iptimezone';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IpDataService {
  constructor(private http: HttpClient) {}

  getDataByIP(ip: string): Observable<IP> {
    return this.http.get<IP>(
      `${environment.api.ipApi.url}${ip}/json/?key=${environment.api.ipApi.key}`
    );
  }

  getClientIP(): Observable<IpClient> {
    return this.http.get<IpClient>(environment.api.ipClient);
  }

  getWeatherByLatAndLon(lat: number, lon: number): Observable<IpWeather> {
    return this.http.get<IpWeather>(
      `${environment.api.weather.url}lat=${lat}&lon=${lon}&appid=${environment.api.weather.key}&units=metric`
    );
  }

  getTimeZoneByLatAndLon(lat: number, lng: number): Observable<IpTimeZone> {
    return this.http.get<IpTimeZone>(
      `${environment.api.timeZone.url}?key=${environment.api.timeZone.key}&lat=${lat}&lng=${lng}&by=position&format=json`
    );
  }
}
