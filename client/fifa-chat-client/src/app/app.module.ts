import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ChatModule } from './chat/chat.module';
import { MatchComponent } from './match/match.component';
import { MatchServiceService } from './match/service/match-service.service';
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    MatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ChatModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [MatchServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
