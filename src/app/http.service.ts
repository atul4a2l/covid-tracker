import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
    latitude: number;
    longitude: number;
    constructor(private http: HttpClient, private geolocation: Geolocation) {
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getLocation(){
   return this.geolocation.getCurrentPosition()
  }

  getdistance(lat,long): Observable<any> {


    return this.http.get(`https://script.google.com/macros/s/AKfycbwqcrVhD9D6Oi2aIi9EG16ks3hLjbJqag_jznwxqpY88xdoBQun/exec?lat=${lat}&long=${long}`)
      .pipe(
        catchError(this.handleError('getdistance'))
      );
  }

  getCovidData(): Observable<any>{
    return this.http.get('https://api.covid19india.org/data.json').pipe(catchError(this.handleError('getCovidData')))
  }

}
