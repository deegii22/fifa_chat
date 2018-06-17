import { Component, OnInit } from '@angular/core';
import { MatchServiceService } from './service/match-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})  
export class MatchComponent implements OnInit {

  private matches;
  private type;

  constructor(private matchService: MatchServiceService, private route: ActivatedRoute) {

    route.params.subscribe(params => {
      this.type = params['type'];
      this.matchService.getMatches(this.type).subscribe(data => {
        this.matches = data;
      });
    })
    
  }

  ngOnInit() {
  }

}
