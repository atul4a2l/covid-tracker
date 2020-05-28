import { Component } from '@angular/core';

import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  srcLink: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {
    this.srcLink = sanitizer.bypassSecurityTrustResourceUrl('https://www.covid19india.org/')
  }

  doRefresh() {
    console.log('Begin async operation');
    this.srcLink = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.covid19india.org/');
  }
}
