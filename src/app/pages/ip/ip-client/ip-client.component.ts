import {Component, Input, OnInit} from '@angular/core';
import {IpClient} from "../ip-model/ipclient";
import {IpDataService} from "../ip-data.service";
import {IP} from "../ip-model/ip";
import {Title} from "@angular/platform-browser";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ip-client',
  templateUrl: './ip-client.component.html',
  styleUrls: ['./ip-client.component.scss']
})
export class IpClientComponent implements OnInit {
  @Input() data!: IpClient;
  @Input() data2!: IP;
  ip!: string;

  constructor(private ipService: IpDataService, private title: Title, private router: Router) { }

  ngOnInit(): void {
    this.ipService.getClientIP().subscribe((data) => {
      this.data = data;
      this.ipService.getDataByIP(data.ip).subscribe((data) => {
        this.data2 = data;
        const map = this.ipService.displayMap(data);
        this.ipService.addMarkerToMap(data, map);
        this.router.navigate([`/ip/${data.ip}`]);
        this.title.setTitle(`${data.ip} (${data.country_name}) - GeoIP`)
      })
      })
  }

}
