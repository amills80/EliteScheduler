import { UserSettings } from './../../providers/user-settings/user-settings';
import { TeamHomePage } from './../team-home/team-home';
import { EliteApi } from './../../providers/elite-api/elite-api';
import { TournamentsPage } from './../tournaments/tournaments';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController } from "ionic-angular";

@Component({
    selector: 'page-my-teams',
    templateUrl: 'my-teams.html'
})

export class MyTeamsPage{

    favorites = [
        // {
        //     team:{ id: 6182, name: 'HC Elite 7th', coach: 'Michelotti' },
        //     tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63', 
        //     tournamentName: 'March Madness Tournament'
        // }
    ];

    constructor(
        private nav: NavController,
        private loadingController: LoadingController,
        private userSettings: UserSettings,
        private eliteApi: EliteApi) {}
        
    goToTournaments() {
        this.nav.push(TournamentsPage)
    }

    favoriteTapped($event, favorite){
        let loader = this.loadingController.create({
            content: "Getting data...",
            dismissOnPageChange: true
        });
        loader.present();
        this.eliteApi.getTournamentData(favorite.tournamentId)
            .subscribe(t => this.nav.push(TeamHomePage, favorite.team));
    }

    ionViewDidEnter() {
        this.favorites = this.userSettings.getAllFavorites();
    }
}
