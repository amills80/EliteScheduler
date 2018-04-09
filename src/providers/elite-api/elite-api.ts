import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';


@Injectable()
export class EliteApi {
  private baseUrl='https://elite-sched-app-ion2.firebaseio.com/';
  private currentTourney: any = {};
  private tourneyData = {};
  constructor(public http: Http) {  }

  getTournaments(){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`).subscribe(res => resolve(res.json()));
    });
  }

  getTournamentData(tourneyId, forceRefresh: boolean = false): Observable<any> {
    if(!forceRefresh && this.tourneyData[tourneyId]) {
      this.currentTourney = this.tourneyData[tourneyId];
      console.log("No need to HTTP call. Just return the data");
      return Observable.of(this.currentTourney);
    }
    // Don't have data yet
    let requestThread = `${this.baseUrl}tournaments-data/${tourneyId}.json`;
    console.log("About to make THIS HTTP call+++ ", requestThread);
    return this.http.get(requestThread)
      .map(response => {
        this.tourneyData[tourneyId] = response.json();
        this.currentTourney = this.tourneyData[tourneyId];
        return this.currentTourney;
      });
  }

  getCurrentTourney(){
    return this.currentTourney;
  }

  refreshCurrentTourney() {
    return this.getTournamentData(this.currentTourney.tournament.id, true);
  }
  
}
