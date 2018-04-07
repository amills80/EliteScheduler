import { StandingsPage } from './../standings/standings';
import { GamePage } from './../game/game';
import { EliteApi } from './../../providers/elite-api/elite-api';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import moment from 'moment';

import * as _ from 'lodash';

@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {
  public dateFilter: string;
  private allGames: any[]; 
  public team: any = {};
  public games: any[];
  public teamStanding: any = {};
  private tourneyData: any;
  public useDateFilter: false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public eliteApi: EliteApi) {  }

  ionViewDidLoad() {
    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();
    this.games = _.chain(this.tourneyData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                    let isTeam1 = (g.team1Id === this.team.id);
                    let opponentName = isTeam1 ? g.team2 : g.team1;
                    let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                    return {
                      gameId: g.id,
                      opponent: opponentName,
                      flag: isTeam1,
                      time: Date.parse(g.time),
                      location: g.location,
                      locationUrl: g.locationUrl,
                      scoreDisplay: scoreDisplay,
                      homeAway: (isTeam1 ? "vs." : "at")
                    };
                  })
                .value();
    this.allGames = this.games;
    this.teamStanding = _.find(this.tourneyData.standings, {'teamId': this.team.id });
  }

 dateChanged() {
   if(this.useDateFilter){
    this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
   } else {
    this.games = this.allGames;
   }
 }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) { 
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    else {
      return "";
    }
  }
  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  getScoreWorL(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : ''
  }

  getScoreDisplayBadgeClass(game) {
    return game.scoreDisplay.indexOf('W:')  === 0 ? 'primary' : 'danger';
  }

}
