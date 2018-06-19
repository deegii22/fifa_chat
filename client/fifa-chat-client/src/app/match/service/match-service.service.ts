import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(public http: HttpClient) { }

  getMatches(type: string) {

    if (type != null) {
      return this.http.get('http://worldcup.sfg.io/matches/' + type);
    } else {
      return this.http.get('http://worldcup.sfg.io/matches/?by_date=ASC');
    }

  }

  getTeams(type: string) {

    return this.http.get('http://worldcup.sfg.io/teams/' + type);

  }

  getMatch(fifa_id: string) {
    return this.http.get('http://worldcup.sfg.io/matches/' + fifa_id);
  }
}
