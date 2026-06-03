import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Map, Marker } from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { IP } from 'src/app/pages/ip/ip-model/ip';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private currentMap: Map | null = null;

  constructor() {
    (mapboxgl as any).accessToken = environment.api.mapbox.token;
  }

  displayMap(data: IP, paddingLeft = 0): Map {
    const options: any = {
      container: 'map',
      style: environment.api.mapbox.style,
      zoom: 12,
      center: [data.longitude, data.latitude],
    };
    if (paddingLeft) {
      options.padding = { top: 0, bottom: 0, left: paddingLeft, right: 0 };
    }
    this.currentMap = new Map(options);
    return this.currentMap;
  }

  addMarkerToMap(data: IP, map: Map): Marker {
    return new Marker().setLngLat([data.longitude, data.latitude]).addTo(map);
  }

  updatePadding(left: number): void {
    if (this.currentMap) {
      (this.currentMap as any).setPadding({ top: 0, bottom: 0, left, right: 0 });
    }
  }
}
