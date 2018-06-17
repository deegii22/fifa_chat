import { Component, OnInit, ViewChildren, ViewChild, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { MatDialog, MatList, MatListItem } from '@angular/material';

import { Action } from './shared/model/action';
import { Message } from './shared/model/message';
import { User } from './shared/model/user';
import { AuthenticationService } from './../auth/authentication.service';
import { SocketService } from './shared/services/socket.service';

const AVATAR_URL = 'https://api.adorable.io/avatars/285';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements  OnInit, AfterViewInit  {
  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;

  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(private socketService: SocketService,
    public dialog: MatDialog, public auth: AuthenticationService) { }

  ngOnInit(): void {
    this.initModel();
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
    this.user = {
      id: randomId,
      avatar: `${AVATAR_URL}/${randomId}.png`,
      name: this.auth.getUsername()
    };
    this.initIoConnection();
    this.sendNotification(Action.JOINED);
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
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

  public sendNotification(action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        action: action
      }
    }

    this.socketService.send(message);
  }
}
