import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { MatchComponent } from './match/match.component';

const routes: Routes = [
  { path: '', redirectTo: "matches/today", pathMatch:"full"},
  { path: 'matches', component: MatchComponent},
  { path: 'matches/:type', component: MatchComponent},
  { path: 'teams/:type', component: MatchComponent},
  { path: 'chat/:id', component: ChatComponent , canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
