import { SqlStorage } from './../sql-storage/sql-storage';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const win: any = window;

@Injectable()
export class UserSettings {
  private sqlMode = false;

  constructor(private storage: Storage, private sql: SqlStorage) {
    if (win.sqllitePlugin) {
      this.sqlMode = true;
    } else {
      console.warn('SQLite plugin not installed. Falling back to local, ionic storage.');
    }
  }

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = { team: team, tournamentId: tournamentId, tournamentName: tournamentName };
    // **OG local storage script
    // this.storage.set(team.id.toString(), JSON.stringify(item));

    if (this.sqlMode) {
      this.sql.set(team.id.toString(), JSON.stringify(item));
    } else {
      this.storage.set(team.id.toString(), JSON.stringify(item));
    }
  }

  unfavoriteTeam(team) {
    // **OG script
    // this.storage.remove(team.id.toString());

    if (this.sqlMode) {
      this.sql.remove(team.id.toString());
    } else {
      this.storage.remove(team.id.toString());
    }
  }

  isFavoriteTeam(teamId: string) : Promise<boolean> {
    // return this.storage.get(teamId).then(value => value ? true : false);
    if (this.sqlMode) {
      return this.sql.get(teamId.toString()).then(value => value ? true : false);
    } else {
      return new Promise(resolve => resolve(this.storage.get(teamId).then(value => value ? true : false)));
    }
  }

  getAllFavorites(): Promise<any> {
    // let results =  [];
    // this.storage.forEach(data => {
    //   console.log('inside foreach', data);
    //   results.push(JSON.parse(data));
    // });
    // return results;

    if (this.sqlMode) {
      return this.sql.getAll();
    } else {
      return new Promise(resolve => {
        let results = [];
        this.storage.forEach(data => {
          console.log('inside foreach', data);
          results.push(JSON.parse(data));
        });
        return resolve(results);
      });
    }
  }

  initStorage(): Promise<any> {
    if (this.sqlMode) {
      return this.sql.InitializeDatabase();
    } else {
      return new Promise(resolve => resolve());
    }
  }
}
