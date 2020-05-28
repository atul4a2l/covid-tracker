import { Component, OnInit } from '@angular/core';

import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {
  srcLink: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {
    this.srcLink = sanitizer.bypassSecurityTrustResourceUrl('https://www.who.int/health-topics/coronavirus#tab=tab_1')
  }
  ngOnInit() {
  }
  doRefresh() {
    console.log('Begin async operation');
    this.srcLink = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.who.int/health-topics/coronavirus#tab=tab_1');
  }

}
