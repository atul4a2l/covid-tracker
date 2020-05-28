import { Component } from '@angular/core';
import {HttpService} from '../http.service'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page{
  isLoading: boolean = false;
  totalDistance: number;
  constructor(private http: HttpService) { 
    console.log('constructor')
  }
  locateMe(){
    this.isLoading = true
    this.http.getLocation().then(resp => {
      this.http.getdistance(resp.coords.latitude,resp.coords.longitude).subscribe((response) => {
        this.isLoading = false;
        this.totalDistance = response;
   })
  }).catch((error) => {
     console.log('Error getting location', error);
})
  }
  ionViewWillEnter(){
    this.locateMe();
  }

}
