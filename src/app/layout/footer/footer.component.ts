import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  authorMail = 'mbutora@gmail.com';
  actualYear = new Date().getFullYear();
}
