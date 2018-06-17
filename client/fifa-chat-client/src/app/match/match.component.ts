import { Component, OnInit } from '@angular/core';
import { MatchServiceService } from './service/match-service.service';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  private matches;
  private matches1;
  constructor(private matchService: MatchServiceService) {
    this.matchService.getMatches('today').subscribe(data => {
      this.matches = data;
    });
    this.matchService.getMatches('tomorrow').subscribe(data => {
      this.matches1 = data;
    });
  }

  ngOnInit() {
  }

}
