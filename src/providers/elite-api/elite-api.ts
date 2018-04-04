import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';



@Injectable()
export class EliteApi {

  private baseUrl='https://elite-sched-app-ion2.firebaseio.com/';

  constructor(public http: Http) {
  }

  getTournaments(){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`).subscribe(res => resolve(res.json()));
    });
  }
}
