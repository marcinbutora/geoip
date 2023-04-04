import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IpDataService } from 'src/app/pages/ip/ip-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  ipAddressGetFromApi: string = '';
  latitude: number = 0;
  longitude: number = 0;
  city: string = "";
  country: string = "";

  ipForm = new FormGroup({
    ip: new FormControl('', Validators.required),
    lat: new FormControl(''),
    lng: new FormControl(''),
  });

  constructor(private router: Router, private service: IpDataService) {
    this.ipAddressGetFromApi = '';
  }

  onCheck = () => this.router.navigate([`/ip/${this.ipAddressGetFromApi}/${this.latitude}/${this.longitude}`]);

  isFormNotValid = (): boolean =>
    this.ipForm.controls['ip'].invalid && this.ipForm.controls['ip'].touched;

  ipGetAndChange = (ip: string) => {
    this.ipAddressGetFromApi = ip;
    this.service.getDataByIP(this.ipAddressGetFromApi).subscribe((val) => {
      this.latitude = val.latitude;
      this.longitude = val.longitude;
      this.city = val.city;
      this.country = val.country;
      this.service.displayMap(val);
    });
  };

  getMyIP = () => {
    this.service.getClientIP().subscribe((val) => {
      this.ipAddressGetFromApi = val.ip;
    });
  };
}
