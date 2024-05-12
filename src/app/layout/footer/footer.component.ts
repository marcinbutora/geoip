import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  authorMail: string = 'mbutora@gmail.com';
  actualYear = new Date().getFullYear();
}
