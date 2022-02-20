import {Component, Input, OnInit} from '@angular/core';
import {IpClient} from "../ip-model/ipclient";
import {IpDataService} from "../ip-data.service";

@Component({
  selector: 'app-ip-client',
  templateUrl: './ip-client.component.html',
  styleUrls: ['./ip-client.component.scss']
})
export class IpClientComponent implements OnInit {
  @Input() data!: IpClient;

  constructor(private ipService: IpDataService) { }

  ngOnInit(): void {
    this.ipService.getClientIP().subscribe((data) => {
      this.data = data;
    })
  }

}
