import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class EliteApi {
  private baseUrl='https://elite-sched-app-ion2.firebaseio.com/';
  private currentTourney: any = {};
  constructor(public http: Http) {  }

  getTournaments(){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`).subscribe(res => resolve(res.json()));
    });
  }

  getTournamentData(tourneyId) : Observable<any>{
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
    .map(response => {
      this.currentTourney = response.json();
    return this.currentTourney;
    })
  }

  getCurrentTourney(){
    return this.currentTourney;
  }
}
