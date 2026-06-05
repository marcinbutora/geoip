import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private storageKey = 'geoip-theme';
  private _theme: Theme;
  theme$ = new BehaviorSubject<Theme>('dark');

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const stored = localStorage.getItem(this.storageKey) as Theme | null;
    this._theme = stored || 'dark';
    this.apply(this._theme);
  }

  get currentTheme(): Theme {
    return this._theme;
  }

  toggle(): void {
    this._theme = this._theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(this.storageKey, this._theme);
    this.apply(this._theme);
    this.theme$.next(this._theme);
  }

  private apply(theme: Theme): void {
    this.renderer.setAttribute(document.documentElement, 'data-theme', theme);
  }
}
