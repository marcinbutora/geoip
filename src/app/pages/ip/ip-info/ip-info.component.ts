import {Component, OnInit} from '@angular/core';
import {IP} from "../ip-model/ip";
import {IpDataService} from "../ip-data.service";
import {ActivatedRoute} from "@angular/router";
import * as mapboxgl from 'mapbox-gl';
import {Map, Marker, Popup} from 'mapbox-gl';

@Component({
  selector: 'app-ip-info',
  templateUrl: './ip-info.component.html',
  styleUrls: ['./ip-info.component.scss']
})
export class IpInfoComponent implements OnInit {
  data!: IP;
  ip: string = '';
  lat!: number;
  lon!: number;

  constructor(private ipService: IpDataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.ip = this.route.snapshot.params['ip'];
    this.ipService.getDataByIP(this.ip).subscribe((data) => {
      this.data = data;
      this.lat = data.latitude;
      this.lon = data.longitude;

      const map = this.displayMap(data);
      this.addMarkerToMap(data, map);
      this.addPopupToMarker(data, map);
    })
  }

  private addMarkerToMap(data: IP, map: mapboxgl.Map) {
    this.ipService.marker = new Marker()
      .setLngLat([data.longitude, data.latitude])
      .addTo(map)
  }

  private addPopupToMarker(data: IP, map: mapboxgl.Map) {
    const flagReplace = data.country_tld.replace(".", "");
    this.ipService.popup = new Popup()
      .setLngLat([data.longitude, data.latitude])
      .setHTML(
      `<p><b><img src="https://flagcdn.com/16x12/${flagReplace}.png"> ${data.country_name}</b>
        <br>Capital: ${data.country_capital}
        <br>${data.city}
        <br>IP address: ${data.ip}
        <br>GPS: ${data.latitude}, ${data.longitude}
       </p>`)
      .addTo(map)
  }

  private displayMap(data: IP) {
    return new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 12,
      center: [data.longitude, data.latitude]
    });
  }
}

