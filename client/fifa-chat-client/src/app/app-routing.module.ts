import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { AuthenticationService } from './auth/authentication.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { HomeComponent } from './auth/home/home.component';
import { MatchComponent } from './match/match.component';

const routes: Routes = [
  { path: '', component: MatchComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationService, 
    AuthGuardService]
})
export class AppRoutingModule { }
