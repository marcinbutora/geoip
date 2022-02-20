import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() data: IP | undefined;
  @Input() ip: string = '';
  lat!: number;
  flagReplace: string = '';

  constructor(private ipService: IpDataService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.ip = this.route.snapshot.params['ip'];
    this.ipService.getDataByIP(this.ip).subscribe((data) => {
      this.data = data;

      const map = this.displayMap(data);
      this.addMarkerToMap(data, map);
      this.addPopupToMarker(data, map);
      this.flagReplace = data.country_tld.replace(".", "");
    })
  }

  private addMarkerToMap(data: IP, map: mapboxgl.Map) {
    this.ipService.marker = new Marker()
      .setLngLat([data.longitude, data.latitude])
      .addTo(map)
  }

  private addPopupToMarker(data: IP, map: mapboxgl.Map) {
    this.ipService.popup = new Popup()
      .setLngLat([data.longitude, data.latitude])
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

