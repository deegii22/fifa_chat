import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchServiceService {

  constructor(public http: HttpClient) { }

  getMatches(type: string){

    return this.http.get('http://worldcup.sfg.io/matches/' + type);

  }
}
