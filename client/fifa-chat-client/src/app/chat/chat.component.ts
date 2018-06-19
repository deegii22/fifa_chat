import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { MatDialog, MatList, MatListItem } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subscription, timer } from "rxjs";

import { Action } from './shared/model/action';
import { Message } from './shared/model/message';
import { User } from './shared/model/user';
import { AuthenticationService } from './../auth/authentication.service';
import { MatchService } from './../match/service/match-service.service';
import { SocketService } from './shared/services/socket.service';

const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {
  private subscription: Subscription;
  action = Action;
  user: User;
  fifa_id: string;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  matchesSubscription;
  timerSubscription;
  last_event_id;
  match;

  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(private socketService: SocketService, private activatedRoute: ActivatedRoute,
    public dialog: MatDialog, public auth: AuthenticationService, public matchService: MatchService) { }

  ngOnInit(): void {
    this.initModel();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.matListItems.changes.subscribe(elements => {
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  private initModel(): void {
    const randomId = this.getRandomId();
    this.subscription = this.activatedRoute.params.subscribe(
      (param: any) => this.fifa_id = param['id']
    );
    this.user = {
      id: randomId,
      avatar: `${AVATAR_URL}/${randomId}.png`,
      name: this.auth.getUsername(),
      match: this.fifa_id
    };
    this.initIoConnection();
    this.last_event_id = 0;
    this.refreshData();
    this.sendNotification(Action.JOINED, null);
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        if (message.from.match === this.user.match)
          this.messages.push(message);
      });
  }

  private getRandomId(): number {
    return Math.floor(Math.random() * (1000000)) + 1;
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message
    });
    this.messageContent = null;
  }

  public sendNotification(action: Action, event: any): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      }
    }
    else if (action === Action.EVENT) {
      message = {
        action: action,
        from: this.user,
        content: {
          event: event,
        }
      }
    }

    this.socketService.send(message);
  }

  refreshData() {
    this.matchesSubscription = this.matchService.getMatch(this.fifa_id).subscribe(match => {
      this.buildEvent(match[0]);
      if (match[0].status != 'completed') {
        console.log("calling subscription ...")
        this.subscribeToData();
      }
      this.match = match[0];
    });
  }

  subscribeToData(): void {
    this.timerSubscription = timer(20000).subscribe(() => this.refreshData());
  }

  buildEvent(match: any) {
    let home = match.home_team_events.filter(function (evt) { return evt.id > this.last_event_id }.bind(this));
    home = home.map((evt) => {
      evt.country = match.home_team.country;
      return evt;
    });
    let away = match.away_team_events.filter(function (evt) { return 1 > this.last_event_id }.bind(this));
    away = away.map((evt) => {
      evt.country = match.away_team.country;
      return evt;
    });
    let events = home.concat(away).sort(function (a, b) { return (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0); });

    for (let evt of events) {
      this.sendNotification(Action.EVENT, evt);
      this.last_event_id = evt.id;
    }
  }
}
