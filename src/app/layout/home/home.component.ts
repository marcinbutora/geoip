import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  ipForm = new FormGroup({
    ip: new FormControl('', Validators.required)
  })

  constructor(private router: Router) {
  }

  onCheck = () => {
    this.router.navigate([`/ip/${this.ipForm.controls['ip'].value}`])
    console.log(this.ipForm.controls['ip'].value)
  }
}
