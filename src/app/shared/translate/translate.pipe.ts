import {
  Pipe,
  PipeTransform,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from './translate.service';

@Pipe({
  name: 'translate',
  pure: false,
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private sub?: Subscription;
  private lastKey = '';
  private lastValue = '';

  constructor(
    private service: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {
    this.sub = this.service.lang$.subscribe(() => {
      if (this.lastKey) {
        this.lastValue = this.service.translate(this.lastKey);
        this.cdr.markForCheck();
      }
    });
  }

  transform(key: string): string {
    if (key !== this.lastKey) {
      this.lastKey = key;
      this.lastValue = this.service.translate(key);
    }
    return this.lastValue;
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
