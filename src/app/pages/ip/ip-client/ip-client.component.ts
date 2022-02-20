import {Component, Input, OnInit} from '@angular/core';
import {IpClient} from "../ip-model/ipclient";
import {IpDataService} from "../ip-data.service";
import {IP} from "../ip-model/ip";

@Component({
  selector: 'app-ip-client',
  templateUrl: './ip-client.component.html',
  styleUrls: ['./ip-client.component.scss']
})
export class IpClientComponent implements OnInit {
  @Input() data!: IpClient;
  @Input() data2!: IP;
  ip!: string;

  constructor(private ipService: IpDataService) { }

  ngOnInit(): void {
    this.ipService.getClientIP().subscribe((dat) => {
      this.data = dat;
      this.ipService.getDataByIP(dat.ip).subscribe((d) => {
        this.data2 = d;
        const map = this.ipService.displayMap(d);
        this.ipService.addMarkerToMap(d, map);
        this.ipService.addPopupToMarker(d, map);
        console.log(d.country_tld)
      })
      })
  }

}
