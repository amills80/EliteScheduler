import { LoadingController } from 'ionic-angular';
import { EliteApi } from './../../providers/elite-api/elite-api';
import { TeamHomePage } from './../team-home/team-home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {
  public teams = [ ];
  private allTeams: any;
  private allTeamDivisions: any;
  public queryText: string

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private loadingController: LoadingController,
    private eliteApi: EliteApi 
  ) {  }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    let loader = this.loadingController.create({
      content: "Getting data..."
    });

    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivisions = 
          _.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();
  
        this.teams = this.allTeamDivisions;
    
      loader.dismiss();
      });
    });
  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }

  updateTeams() {
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];
    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
      if (teams.length) {
        filteredTeams.push({
          divisionName: td.divisionName, 
          divisionTeams: teams
        });
      }
    });
    this.teams = filteredTeams;
  }
}
