import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TeamParam, Teams, TeamsList} from "../teams-list";
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
    this.message = <Message>{};
  }

  ngOnInit() {
    this.teamList = Teams;

    this.message.content="123";
    this.message.team= TeamsList.pop();
    this.message.type= 'joinTeam';
  }

  sendMsg() {
    this.message.source = 'localhost';
    this.message.content = this.content;
    this.sent.push(this.message);
    this.WebsocketService.messages.next(this.message);
    this.router.navigate(['/lobby'])
  }
}
