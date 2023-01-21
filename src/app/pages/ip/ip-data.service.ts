import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IP } from './ip-model/ip';
import * as mapboxgl from 'mapbox-gl';
import { Map, Marker } from 'mapbox-gl';
import { IpClient } from './ip-model/ipclient';
import { IpWeather } from './ip-model/ipweather';
import { IpTimeZone } from './ip-model/iptimezone';
import { style } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class IpDataService {
  map!: mapboxgl.Map;
  markerToSet!: mapboxgl.Marker;
  popup!: mapboxgl.Popup;

  private readonly apiUrl: string = 'https://ipapi.co/';
  private readonly apiKey: string =
    'UwGCO4DZPD66kaS7nsXoC8mZEeeGP9AKjDgJGNOkREjmj3cMOO';
  private readonly apiClient: string = 'https://api.ipify.org/?format=json';
  private readonly apiWeatherUrl: string =
    'https://api.openweathermap.org/data/2.5/weather?';
  private readonly apiWeatherKey: string = '8d1da24a8faf953ff79f47841b4e5fef';
  private readonly apiTimeZoneKey: string = 'XHNH1YD4XKP2';
  private readonly apiTimeZoneUrl: string =
    'https://api.timezonedb.com/v2.1/get-time-zone';
  private readonly styleOfMap: string = 'mapbox://styles/mapbox/streets-v11';
  private readonly defaultZoom: number = 12;

  constructor(private http: HttpClient) {
    (mapboxgl as any).accessToken =
      'pk.eyJ1IjoibWI4M3BsIiwiYSI6ImNrenU2dmZqYzFhbmgybm9odWR3MW1zbGEifQ.FkK9NeB26U89mDa1q_DQkQ';
  }

  getDataByIP = (ip: string): Observable<IP> =>
    this.http.get<IP>(`${this.apiUrl}${ip}/json/?key=${this.apiKey}`);

  getClientIP = (): Observable<IpClient> =>
    this.http.get<IpClient>(`${this.apiClient}`);

  getWeatherByLatAndLon = (lat: number, lon: number): Observable<IpWeather> =>
    this.http.get<IpWeather>(
      `${this.apiWeatherUrl}lat=${lat}&lon=${lon}&appid=${this.apiWeatherKey}&units=metric`
    );

  getTimeZoneByLatAndLon = (lat: number, lng: number): Observable<IpTimeZone> =>
    this.http.get<IpTimeZone>(
      `${this.apiTimeZoneUrl}?key=${this.apiTimeZoneKey}&lat=${lat}&lng=${lng}&by=position&format=json`
    );

  addMarkerToMap = (data: IP, map: mapboxgl.Map) => {
    return (this.markerToSet = new Marker()
      .setLngLat([data.longitude, data.latitude])
      .addTo(map));
  };

  displayMap = (data: IP) =>
    new Map({
      container: 'map',
      style: this.styleOfMap,
      zoom: this.defaultZoom,
      center: [data.longitude, data.latitude],
    });
}
