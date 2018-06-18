import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';
import { AuthenticationService } from './auth/authentication.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { ProfileComponent } from './auth/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './auth/home/home.component';
import { MatchComponent } from './match/match.component';
import { MatchServiceService } from './match/service/match-service.service';
import { ReactiveFormsModule } from '@angular/forms';

import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ChatModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTooltipModule,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService, AuthGuardService, MatchServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
