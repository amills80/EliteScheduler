import { TeamHomePage } from './../team-home/team-home';
import { EliteApi } from './../../providers/elite-api/elite-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MapPage } from '../map/map';

import { Geolocation } from '@ionic-native/geolocation';

declare var window: any;

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})

export class GamePage {
  public game: any = {};
  public userLocation: { lat: number, lng: number };

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private geolocation: Geolocation,
    public eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId) {
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

  goToMap() {
    this.navCtrl.push(MapPage, this.game)
  }

  goToDirections() {
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[this.game.locationId];
    this.geolocation.getCurrentPosition().then((resp) => {
      this.userLocation = {
        lat: resp.coords.latitude,
        lng: resp.coords.longitude
      };
    });
     
    window.userLocation = `geo:${location.latitude},${location.longitude};u=35`;
    // console.log(window.location);
    // alert(window.location);
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2) ? 'primary' : 'danger';
  }
}
