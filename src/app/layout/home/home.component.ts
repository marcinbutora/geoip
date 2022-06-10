import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IpDataService } from 'src/app/pages/ip/ip-data.service';
import { IP } from 'src/app/pages/ip/ip-model/ip';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  ipGet: string = '';
  lat: number = 0;
  lng: number = 0;

  ipForm = new FormGroup({
    ip: new FormControl('', Validators.required),
    lat: new FormControl(''),
    lng: new FormControl(''),
  });

  constructor(private router: Router, private service: IpDataService) {
    this.ipGet = '';
  }

  onCheck = () => {
    this.router.navigate([`/ip/${this.ipGet}/${this.lat}/${this.lng}`]);
  };

  isFormNotValid = (): boolean =>
    this.ipForm.controls['ip'].invalid && this.ipForm.controls['ip'].touched;

  ipGetAndChange = (ip: string) => {
    this.ipGet = ip;
    this.service.getDataByIP(this.ipGet).subscribe((val) => {
      this.lat = val.latitude;
      this.lng = val.longitude;
      this.service.displayMap(val);
    });
  };

  getMyIP = () => {
    this.service.getClientIP().subscribe((val) => {
      this.ipGet = val.ip;
    });
  };
}
