import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  author: string = 'Marcin Butora';
  dateInfo: Date = new Date("2022-02-27 13:27:00");

}
