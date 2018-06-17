import { Component, OnInit } from '@angular/core';
import { MatchServiceService } from './service/match-service.service';
import { ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material';
import { map } from 'rxjs/operators';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})  
export class MatchComponent{

  loading: boolean = true;
  matches;
  type;
  dataSource;

  displayedColumns = ['date','hour', 'homeCountry','goals', 'awayCountry', 'status'];

  constructor(private matchService: MatchServiceService, private route: ActivatedRoute) {

    route.params.subscribe(params => {
      this.type = params['type'];
      this.matchService.getMatches(this.type).subscribe(data => {
        this.matches = data;
        
        if(this.type == null){
          const ELEMENT_DATA: PeriodicElement[] = [];
          for(let m of this.matches){
            ELEMENT_DATA.push({date: m.datetime.substring(0,10),hour: m.datetime.substring(11,16), homeCountry: m.home_team.country, goals: m.home_team.goals + ' : ' + m.away_team.goals, awayCountry: m.away_team.country,  status: m.status})
          }
          this.dataSource = new MatTableDataSource(ELEMENT_DATA);
        }

        this.loading=false;
      });
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export interface PeriodicElement {
  date: string;
  hour: string;
  homeCountry: string;
  awayCountry: string;
  goals: string;
  status: string;
}

