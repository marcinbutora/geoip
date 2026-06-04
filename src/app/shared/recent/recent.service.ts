import { Injectable } from '@angular/core';

export interface RecentSearch {
  ip: string;
  city: string;
  country: string;
}

@Injectable({ providedIn: 'root' })
export class RecentService {
  private readonly STORAGE_KEY = 'geoip_recent';
  private readonly MAX_ITEMS = 5;

  getRecent(): RecentSearch[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  addSearch(ip: string, city: string, country: string): void {
    const recent = this.getRecent().filter((r) => r.ip !== ip);
    recent.unshift({ ip, city, country });
    if (recent.length > this.MAX_ITEMS) {
      recent.pop();
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recent));
  }

  removeSearch(ip: string): void {
    const recent = this.getRecent().filter((r) => r.ip !== ip);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(recent));
  }
}
