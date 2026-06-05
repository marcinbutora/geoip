import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from './shared/translate/translate.service';
import { Lang } from './shared/translate/translations';
import { ThemeService } from './shared/theme/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  currentLang: Lang = 'en';
  private sub?: Subscription;
  theme = 'dark';

  constructor(
    private title: Title,
    private modalService: NgbModal,
    private translate: TranslateService,
    private themeService: ThemeService,
  ) {
    this.theme = themeService.currentTheme;
  }

  ngOnInit() {
    this.currentLang = this.translate.currentLang;
    this.sub = this.translate.lang$.subscribe((l) => {
      this.currentLang = l;
      this.title.setTitle(this.translate.translate('title'));
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggleLang(): void {
    this.translate.toggleLang();
  }

  toggleTheme(): void {
    this.themeService.toggle();
    this.theme = this.themeService.currentTheme;
  }

  openAboutModal(content: unknown): void {
    this.modalService.open(content, { centered: true, size: 'md' });
  }
}
