import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { IP } from '../ip-model/ip';
import { IpDataService } from '../ip-data.service';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { IpWeather } from '../ip-model/ipweather';
import { IpTimeZone } from '../ip-model/iptimezone';
import { MapService } from 'src/app/shared/map/map.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { forkJoin, of, fromEvent, Subscription } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { gsap } from 'gsap';

@Component({
  selector: 'app-ip-info',
  templateUrl: './ip-info.component.html',
  styleUrls: ['./ip-info.component.scss'],
})
export class IpInfoComponent implements OnInit, OnDestroy, AfterViewInit {
  data!: IP;
  weatherData!: IpWeather;
  timezoneData: IpTimeZone | undefined;
  isLoading = false;
  dataLoaded = false;

  private resizeSub?: Subscription;

  errorMessage: string | null = null;

  constructor(
    private ipService: IpDataService,
    private mapService: MapService,
    private route: ActivatedRoute,
    private title: Title,
    private metaService: Meta,
    private notification: NotificationService
  ) {}

  ngAfterViewInit(): void {
    gsap.from('.info-panel', { x: -60, opacity: 0, duration: 0.6, ease: 'power2.out' });
  }

  ngOnInit(): void {
    this.resizeSub = fromEvent(window, 'resize').subscribe(() => this.syncPadding());

    const ip = this.route.snapshot.params['ip'];

    if (!ip) {
      return;
    }

    this.isLoading = true;

    this.ipService.getDataByIP(ip).pipe(
      catchError(() => {
        this.isLoading = false;
        this.errorMessage = 'errorIpLookup';
        this.notification.show('errorIpLookup');
        return of(undefined);
      }),
      switchMap((ipData) => {
        if (!ipData) {
          return of({ ipData: undefined, weather: undefined, timezone: undefined });
        }
        return forkJoin({
          ipData: of(ipData),
          weather: this.ipService.getWeatherByLatAndLon(ipData.latitude, ipData.longitude).pipe(
            catchError(() => of(undefined))
          ),
          timezone: this.ipService.getTimeZoneByLatAndLon(ipData.latitude, ipData.longitude).pipe(
            catchError(() => of(undefined))
          ),
        });
      })
    ).subscribe(({ ipData, weather, timezone }) => {
      if (!ipData) {
        return;
      }
      this.data = ipData;
      this.weatherData = weather as IpWeather;
      this.timezoneData = timezone as IpTimeZone;
      this.isLoading = false;
      this.dataLoaded = true;

      this.title.setTitle(this.setTitle(ipData));
      this.setMetaTags(ipData);

      const map = this.mapService.displayMap(ipData);
      this.syncPadding();
      this.mapService.addMarkerToMap(ipData, map);

      setTimeout(() => {
        gsap.from('.flag-wrapper', { scale: 0.5, opacity: 0, duration: 0.5, ease: 'back.out(2)' });
        gsap.from('.ip-row', { y: -10, opacity: 0, duration: 0.4, delay: 0.15, ease: 'power2.out' });
        gsap.from('.location, .sub-location', { y: 10, opacity: 0, duration: 0.3, delay: 0.25, ease: 'power2.out' });
        gsap.from('.info-card', { y: 20, opacity: 0, duration: 0.35, stagger: 0.05, delay: 0.35, ease: 'power2.out' });
        gsap.from('.extra-sections .section-card', { y: 20, opacity: 0, duration: 0.4, stagger: 0.1, delay: 0.5, ease: 'power2.out' });
      }, 100);
    });
  }

  ngOnDestroy(): void {
    this.resizeSub?.unsubscribe();
  }

  private syncPadding(): void {
    if (window.innerWidth <= 768) {
      this.mapService.updatePadding(0);
      return;
    }
    const el = document.querySelector('.info-panel');
    if (el) {
      this.mapService.updatePadding(el.getBoundingClientRect().width);
    }
  }

  private setTitle(data: IP): string {
    return `${data.ip} - ${data.city}, ${data.country}, ${data.country_name} - GeoIP`;
  }

  private setMetaTags(data: IP): void {
    this.metaService.addTags([
      {
        name: 'description',
        content: `${data.ip}, ${data.city}, ${data.country}, ${data.country_name}`,
      },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: this.setTitle(data) },
    ]);
  }
}
