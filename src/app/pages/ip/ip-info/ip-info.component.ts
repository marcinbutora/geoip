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
      this.lat = data.lon;
      this.lon = data.lon;

      const map = this.displayMap(data);
      this.addMarkerToMap(data, map);
      this.addPopupToMarker(data, map);
      this.ipService.map.addControl(new mapboxgl.NavigationControl());
    })
  }

  private addMarkerToMap(data: IP, map: mapboxgl.Map) {
    this.ipService.marker = new Marker()
      .setLngLat([data.lon, data.lat])
      .addTo(map)
  }

  private addPopupToMarker(data: IP, map: mapboxgl.Map) {
    this.ipService.popup = new Popup()
      .setLngLat([data.lon, data.lat])
      .setHTML(
      `<p><b>${data.country}</b>
        <br>${data.city}
        <br>${data.isp}
        <br>IP address: ${data.query}
        <br>GPS: ${data.lat}, ${data.lon}
       </p>`)
      .addTo(map)
  }

  private displayMap(data: IP) {
    return new Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 12,
      center: [data.lon, data.lat]
    });
  }
}

