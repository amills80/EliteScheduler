import { EliteApi } from './../../providers/elite-api/elite-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
public game: any = {};


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public eliteApi: EliteApi) {
  }

  ionViewDidLoad() {
    this.game = this.navParams.data;
  }

  teamTapped() {
    let tourneyData = this.eliteApi.getCurrentTourney();
  }
}
