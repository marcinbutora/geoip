import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IpDataService } from 'src/app/pages/ip/ip-data.service';
import { MapService } from 'src/app/shared/map/map.service';
import { IP } from 'src/app/pages/ip/ip-model/ip';
import { fromEvent, Subscription } from 'rxjs';
import { gsap } from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  ipAddressGetFromApi = '';
  latitude = 0;
  longitude = 0;
  city = '';
  country = '';
  hasSearched = false;

  ipForm = new FormGroup({
    ip: new FormControl('', Validators.required),
    lat: new FormControl(''),
    lng: new FormControl(''),
  });

  private resizeSub?: Subscription;

  constructor(
    private router: Router,
    private service: IpDataService,
    private mapService: MapService
  ) {}

  ngAfterViewInit(): void {
    gsap.from('.home-panel', { x: -60, opacity: 0, duration: 0.6, ease: 'power2.out' });
    gsap.from('.panel-header', { y: -20, opacity: 0, duration: 0.5, delay: 0.3, ease: 'back.out(1.5)' });
  }

  ngOnInit(): void {
    this.resizeSub = fromEvent(window, 'resize').subscribe(() => this.syncPadding());
    this.service.getClientIP().subscribe((val) => {
      this.ipGetAndChange(val.ip);
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
    const el = document.querySelector('.home-panel');
    if (el) {
      this.mapService.updatePadding(el.getBoundingClientRect().width);
    }
  }

  onCheck(): void {
    this.router.navigate([
      `/ip/${this.ipAddressGetFromApi}/${this.latitude}/${this.longitude}`,
    ]);
  }

  isFormNotValid(): boolean {
    return this.ipForm.controls['ip'].invalid && this.ipForm.controls['ip'].touched;
  }

  private updateData(data: IP): void {
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.city = data.city;
    this.country = data.country;
    const map = this.mapService.displayMap(data);
    this.mapService.addMarkerToMap(data, map);
    this.syncPadding();
    gsap.from('.city-badge, .coord-grid', {
      y: 16, opacity: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out',
    });
  }

  ipGetAndChange(ip: string): void {
    this.hasSearched = true;
    this.ipAddressGetFromApi = ip;
    this.ipForm.patchValue({ ip });
    this.service.getDataByIP(ip).subscribe((val) => this.updateData(val));
  }

  getMyIP(): void {
    this.service.getClientIP().subscribe((val) => {
      this.ipGetAndChange(val.ip);
    });
  }

  onIpInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    if (value) {
      this.ipGetAndChange(value);
    }
  }
}
