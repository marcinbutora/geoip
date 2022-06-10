import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IpDataService } from 'src/app/pages/ip/ip-data.service';

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
  });

  constructor(
    private router: Router,
    private service: IpDataService,
    private route: ActivatedRoute
  ) {
    this.ipGet = '';
  }

  ngOnInit(): void {
    this.service.getDataByIP(this.ipGet).subscribe((val) => {
      this.ipGet = val.ip;
      this.lat = val.latitude;
      this.lng = val.longitude;
    });
  }

  onCheck = () => {
    this.router.navigate([
      `/ip/${this.ipForm.controls['ip'].value}/${this.lat}/${this.lng}`,
    ]);
  };

  isFormNotValid = (): boolean =>
    this.ipForm.controls['ip'].invalid && this.ipForm.controls['ip'].touched;
}
