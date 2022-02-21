import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IP} from "../ip-model/ip";
import {IpDataService} from "../ip-data.service";
import {ActivatedRoute} from "@angular/router";
import * as mapboxgl from 'mapbox-gl';
import {Map, Marker, Popup} from 'mapbox-gl';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-ip-info',
  templateUrl: './ip-info.component.html',
  styleUrls: ['./ip-info.component.scss']
})
export class IpInfoComponent implements OnInit {
  @Input() data: IP | undefined;
  ip: string = '';

  constructor(private ipService: IpDataService, private route: ActivatedRoute, private title: Title) {
  }

  ngOnInit(): void {
    this.ip = this.route.snapshot.params['ip'];
    this.ipService.getDataByIP(this.ip).subscribe((data) => {
      this.data = data;

      const map = this.ipService.displayMap(data);
      this.ipService.addMarkerToMap(data, map);
      this.title.setTitle(`${data.ip} (${data.country_name}) - GeoIP`)
    })
  }
}

