import { EliteApi } from './../../providers/elite-api/elite-api';
import { TeamsPage } from './../teams/teams';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {
  public tournaments: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    this.eliteApi.getTournaments().then(data => this.tournaments = data);
  }

  itemTapped($event, tourney) {
    this.navCtrl.push(TeamsPage, tourney);
  }
}
