import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TeamParam, Teams} from "../teams-list";
import {Message} from "../message";
import {WebsocketService} from "../services/websocket.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
  providers: [WebsocketService]
})
export class StartComponent implements OnInit {
  teamList: any[] | undefined;
  selectedTeam: TeamParam;
  title = 'socketrv';
  content = '';
  received = [];
  sent = [];
  message: Message;

  constructor(private router: Router,
              private WebsocketService: WebsocketService) {
    WebsocketService.messages.subscribe(msg => {
      this.received.push(msg);
      console.log("Response from websocket: " + JSON.stringify(msg.team));
    });

  }

  ngOnInit() {
    this.teamList = Teams;
  }

  sendMsg() {
    this.message.source = 'localhost';
    this.message.content = this.content;
    this.sent.push(this.message);
    this.WebsocketService.messages.next(this.message);
  }
}
