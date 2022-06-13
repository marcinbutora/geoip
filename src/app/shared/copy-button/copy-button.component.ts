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
  isCopied: boolean = false;

  constructor(private service: Clipboard) {}

  copyToClipboard = (text: string) => {
    this.service.copy(text);
    this.isCopied = true;
  };
}
