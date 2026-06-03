import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lang, translations } from './translations';

const STORAGE_KEY = 'geoip-lang';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  private langSubject = new BehaviorSubject<Lang>(this.loadLang());

  get lang$(): Observable<Lang> {
    return this.langSubject.asObservable();
  }

  get lang(): Lang {
    return this.langSubject.value;
  }

  get currentLang(): Lang {
    return this.langSubject.value;
  }

  translate(key: string): string {
    const dict = translations[this.lang];
    return dict[key] ?? key;
  }

  switchLang(lang: Lang): void {
    localStorage.setItem(STORAGE_KEY, lang);
    this.langSubject.next(lang);
  }

  toggleLang(): void {
    const next = this.lang === 'en' ? 'pl' : 'en';
    this.switchLang(next);
  }

  private loadLang(): Lang {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'pl') return stored;
    const browser = navigator.language?.slice(0, 2);
    return browser === 'pl' ? 'pl' : 'en';
  }
}
