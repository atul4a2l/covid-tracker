import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service'
import { MinLengthValidator } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  covidData= {
  active: null,
  confirmed: null,
  deaths: null,
  deltaconfirmed: null,
  deltadeaths: null,
  deltarecovered: null,
  lastupdatedtime: null,
  recovered: null,
  recoveryRate: null,
  deathRate: null
}
lastUpadtedOn:any;
covids:any;
covidRate:any;

  constructor(private router: Router, public http: HttpService) {}


  changeTab(url: string){
    this.router.navigate([url])
  }
  changeupto2Decimal(num){
    return parseFloat(num).toFixed(2);
  }
  strToDate(dtStr) {
    let dateParts = dtStr.split("/");
    let timeParts = dateParts[2].split(" ")[1].split(":");
    dateParts[2] = dateParts[2].split(" ")[0];
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0], timeParts[0], timeParts[1], timeParts[2]); 
}
  public timeDiff(){
    let currentTime:any = new Date();
    let lastupdatedtime:any  = new Date(this.strToDate(this.covidData.lastupdatedtime))
    let diff = currentTime - lastupdatedtime
    var hours   = Math.floor(diff / 3.6e6);
    var minutes = Math.floor((diff % 3.6e6) / 6e4);
    var seconds = Math.floor((diff % 6e4) / 1000);
    if(hours>0){
    this.lastUpadtedOn = hours+":"+minutes+":"+seconds+" Hrs";
    }
    if(minutes>0 && hours==0){
    this.lastUpadtedOn = minutes+":"+seconds+" Mins"
    }
    if(minutes<0 && hours==0) {
    this.lastUpadtedOn = seconds +" Secs"
    }
  }

  ionViewWillEnter() {
    this.http.getCovidData().subscribe((resp) => {
      this.covidData.active = resp.statewise[0].active;
      this.covidData.confirmed = resp.statewise[0].confirmed;
      this.covidData.deaths = resp.statewise[0].deaths;
      this.covidData.deltaconfirmed = resp.statewise[0].deltaconfirmed;
      this.covidData.deltadeaths = resp.statewise[0].deltadeaths;
      this.covidData.deltarecovered = resp.statewise[0].deltarecovered;
      this.covidData.lastupdatedtime = resp.statewise[0].lastupdatedtime;
      this.covidData.recovered = resp.statewise[0].recovered;
      this.covidData.recoveryRate = this.changeupto2Decimal((this.covidData.recovered *100)/this.covidData.confirmed);
      this.covidData.deathRate = this.changeupto2Decimal((this.covidData.deaths *100)/this.covidData.confirmed);
      this.timeDiff();
      this.covids=[
        {
          name:'Total Confirmed',
          data: this.covidData.confirmed,
          colorText : '#ff07ff'
        },
        {
          name: 'Total Active',
          data:this.covidData.active,
          colorText : '#9208f7'
        },
        {
          name: 'Total Deaths',
          data:this.covidData.deaths,
          colorText : '#e1306c'
        },
        {
          name: "Total Recovered",
          data: this.covidData.recovered,
          colorText : '#12ff12'
        },
        {
          name: 'Confirmed Today',
          data:this.covidData.deltaconfirmed,
          colorText : 'Yellow'
        },
        {
          name: 'Recovered Today',
          data: this.covidData.deltarecovered,
          colorText : 'Red'
        },  
        { 
          name: 'Deaths Today',
          data:this.covidData.deltadeaths,
          colorText : '#e1306c'
        }
      ]
      this.covidRate=[
        {
          name:'Recovery Rate',
          data: this.covidData.recoveryRate + '%',
          colorText : 'orange'
        },
        {
          name:'Death Rate',
          data: this.covidData.deathRate + '%',
          colorText : 'aqua'
        }
      ]
    })
    
  }
}
