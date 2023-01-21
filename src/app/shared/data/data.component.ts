import { Component, Input } from '@angular/core';
import { IP } from 'src/app/pages/ip/ip-model/ip';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent {
  @Input() data!: IP;

  getFlagSourceUrl = (flagFileUrl: string) => {
    const flagFile = this.data.country_tld.replace('.', '');
    return flagFileUrl == 'uk'
      ? `https://flagcdn.com/40x30/gb.png`
      : `https://flagcdn.com/40x30/${flagFile}.png`;
  };
}
