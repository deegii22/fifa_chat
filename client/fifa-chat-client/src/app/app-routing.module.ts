import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { MatchComponent } from './match/match.component';

const routes: Routes = [
  { path: 'matches', component: MatchComponent},
  { path: 'matches/:type', component: MatchComponent},
  { path: 'teams/:type', component: MatchComponent},
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
