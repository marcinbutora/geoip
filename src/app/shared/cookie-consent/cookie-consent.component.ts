import { Component } from '@angular/core';

const STORAGE_KEY = 'geoip-gdpr-consent';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent {
  visible = !localStorage.getItem(STORAGE_KEY);

  accept(): void {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    this.visible = false;
    this.loadAnalytics();
  }

  reject(): void {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    this.visible = false;
  }

  private loadAnalytics(): void {
    const win = window as any;
    win.dataLayer = win.dataLayer || [];
    win.gtag = function () { win.dataLayer.push(arguments); };
    win.gtag('js', new Date());
    win.gtag('config', 'G-9Y0BBKLVQY');

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-9Y0BBKLVQY';
    document.head.appendChild(script);
  }
}
