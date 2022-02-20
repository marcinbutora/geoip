import {Component, Input, OnInit} from '@angular/core';
import {IP} from "../ip-model/ip";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  @Input() data: IP | undefined;
  @Input() flagReplace: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.flagReplace = this.data?.country_tld.replace(".", "");
  }

}
