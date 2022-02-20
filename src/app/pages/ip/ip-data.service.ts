import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IP} from "./ip-model/ip";
import * as mapboxgl from "mapbox-gl";

@Injectable({
  providedIn: 'root'
})
export class IpDataService {

  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  popup!: mapboxgl.Popup;
  private apiKey: string =  'f577ff8593a1996b1fa69b1a15951700';

  constructor(private http: HttpClient) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoibWI4M3BsIiwiYSI6ImNrenU2dmZqYzFhbmgybm9odWR3MW1zbGEifQ.FkK9NeB26U89mDa1q_DQkQ';
  }

  getDataByIP = (ip: string): Observable<IP> => {
    return this.http.get<IP>(`https://ipapi.co/${ip}/json/`)
  }


}
