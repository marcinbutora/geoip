import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private title: Title, private modalService: NgbModal) {}

  ngOnInit() {
    this.title.setTitle('GeoIP - localize your IP address on Map!');
  }

  openAboutModal(content: unknown): void {
    this.modalService.open(content, { centered: true, size: 'md' });
  }
}
