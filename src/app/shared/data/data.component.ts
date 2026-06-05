import { Component, Input, inject } from '@angular/core';
import { IP } from 'src/app/pages/ip/ip-model/ip';
import { Clipboard } from '@angular/cdk/clipboard';
import { TranslateService } from '../translate/translate.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent {
  @Input() data!: IP;
  linkCopied = false;

  private clipboard = inject(Clipboard);
  private translate = inject(TranslateService);

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

  get proxyDisplay(): string {
    if (this.data.proxy === undefined) return '';
    return this.data.proxy ? this.translate.translate('yes') : this.translate.translate('no');
  }

  get hostingDisplay(): string {
    if (this.data.hosting === undefined) return '';
    return this.data.hosting ? this.translate.translate('yes') : this.translate.translate('no');
  }

  copyLink(): void {
    const url = `${window.location.origin}/ip/${this.data.ip}/${this.slugify(this.data.city)}/${this.slugify(this.data.country)}`;
    this.clipboard.copy(url);
    this.linkCopied = true;
    setTimeout(() => (this.linkCopied = false), 2000);
  }

  private slugify(text: string): string {
    return text.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }
}
