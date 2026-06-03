import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements AfterViewInit {
  authorMail = 'mbutora@gmail.com';
  actualYear = new Date().getFullYear();

  ngAfterViewInit(): void {
    gsap.from('footer', { y: 20, opacity: 0, duration: 0.5, delay: 0.8, ease: 'power2.out' });
  }
}
