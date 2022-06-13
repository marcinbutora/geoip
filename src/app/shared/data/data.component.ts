import { Component, Input } from '@angular/core';
import { IP } from 'src/app/pages/ip/ip-model/ip';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent {
  @Input() data!: IP;
  ipToCopy: string = '';
  isCopied: boolean = false;

  constructor(private service: Clipboard) {}

  getFlag = () => {
    const flagFile = this.data.country_tld.replace('.', '');
    if (flagFile == 'uk') {
      return `https://flagcdn.com/40x30/gb.png`;
    }
    return `https://flagcdn.com/40x30/${flagFile}.png`;
  };

  copyToClipboard = (text: string) => {
    this.service.copy(text);
    this.isCopied = true;
  };
}
