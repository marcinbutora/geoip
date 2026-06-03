import { Component, Input } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { IP } from 'src/app/pages/ip/ip-model/ip';

@Component({
  selector: 'app-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss'],
})
export class CopyButtonComponent {
  @Input() data!: IP;
  isCopied = false;

  constructor(private clipboard: Clipboard) {}

  copyToClipboard(text: string): void {
    this.clipboard.copy(text);
    this.isCopied = true;
    setTimeout(() => (this.isCopied = false), 2000);
  }
}
