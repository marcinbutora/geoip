import { Component, Input } from '@angular/core';
import { IP } from 'src/app/pages/ip/ip-model/ip';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent {
  @Input() data!: IP;

  getFlagUrl(): string {
    const code = this.data.country_tld.replace('.', '');
    const cc = code === 'uk' ? 'gb' : code;
    return `https://flagcdn.com/w320/${cc}.png`;
  }

  get continent(): string {
    const names: Record<string, string> = {
      AF: 'Africa', AS: 'Asia', EU: 'Europe', NA: 'North America',
      SA: 'South America', OC: 'Oceania', AN: 'Antarctica',
    };
    return names[this.data.continent_code] || this.data.continent_code;
  }

  formatNumber(n: number): string {
    return n.toLocaleString('en-US');
  }

  get regionDisplay(): string {
    return this.data.region
      ? `${this.data.region}${this.data.region_code ? ` (${this.data.region_code})` : ''}`
      : '';
  }
}
