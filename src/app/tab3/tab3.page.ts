import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl} from '@angular/platform-browser'
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  srcLink: SafeResourceUrl;
  constructor(private sanitizer: DomSanitizer) {
    this.srcLink = sanitizer.bypassSecurityTrustResourceUrl('https://www.worldometers.info/coronavirus/')
  }
  doRefresh() {
    console.log('Begin async operation');
    this.srcLink = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.worldometers.info/coronavirus/');
  }
}
