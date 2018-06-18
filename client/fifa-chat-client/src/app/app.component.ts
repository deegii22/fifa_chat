import { Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from './auth/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private navLinks = [
    { path: "matches/current", label: "Current" },
    { path: "matches/today", label: "Today" },
    { path: "matches/tomorrow", label: "Tomorrow" },
    { path: "matches", label: "All Matches" },
    // { path: "teams/results", label: "Team Result" },
    // { path: "teams/group-results", label: "Group Result" },
  ];
  
  constructor(public auth: AuthenticationService){ }
}
