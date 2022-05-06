import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IP } from './ip-model/ip';
import * as mapboxgl from 'mapbox-gl';
import { Map, Marker } from 'mapbox-gl';
import { IpClient } from './ip-model/ipclient';
import { IpWeather } from './ip-model/ipweather';

@Injectable({
  providedIn: 'root',
})
export class IpDataService {
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  popup!: mapboxgl.Popup;

  apiUrl: string = 'https://ipapi.co/';
  apiClient: string = 'https://api.ipify.org/?format=json';
  apiWeatherUrl: string = 'https://api.openweathermap.org/data/2.5/weather?';
  apiWeatherKey: string = '8d1da24a8faf953ff79f47841b4e5fef';

  constructor(private http: HttpClient) {
    (mapboxgl as any).accessToken =
      'pk.eyJ1IjoibWI4M3BsIiwiYSI6ImNrenU2dmZqYzFhbmgybm9odWR3MW1zbGEifQ.FkK9NeB26U89mDa1q_DQkQ';
  }

  getDataByIP = (ip: string): Observable<IP> => {
    return this.http.get<IP>(`${this.apiUrl}${ip}/json/`);
  };

  getClientIP = (): Observable<IpClient> => {
    return this.http.get<IpClient>(`${this.apiClient}`);
  };

  getWeatherByIp = (lat: number, lon: number): Observable<IpWeather> => {
    return this.http.get<IpWeather>(
      `${this.apiWeatherUrl}lat=${lat}&lon=${lon}&appid=${this.apiWeatherKey}&units=metric`
    );
  };

  addMarkerToMap = (data: IP, map: mapboxgl.Map) => {
    this.marker = new Marker()
      .setLngLat([data.longitude, data.latitude])
      .addTo(map);
  }

  displayMap = (data: IP) => {
    return new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 12,
      center: [data.longitude, data.latitude],
    });
  }
}
