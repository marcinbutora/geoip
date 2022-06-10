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
  ipGet: string = '';

  ipForm = new FormGroup({
    ip: new FormControl('', Validators.required),
  });

  constructor(private router: Router, private service: IpDataService) {
    this.ipGet = '';
  }

  ngOnInit(): void {
    this.service.getClientIP().subscribe((v) => (this.ipGet = v.ip));
  }

  onCheck = () => {
    this.router.navigate([`/ip/${this.ipForm.controls['ip'].value}`]);
  };

  isFormNotValid = (): boolean =>
    this.ipForm.controls['ip'].invalid && this.ipForm.controls['ip'].touched;
}
