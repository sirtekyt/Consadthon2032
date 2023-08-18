import {Component, OnDestroy, OnInit} from '@angular/core';
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
export class StartComponent implements OnInit, OnDestroy {
  teamList: any[] | undefined;
  selectedTeam: TeamParam;
  content = '';
  message: Message;

  constructor(private router: Router,
              private socketService: WebsocketService
              ) {
    this.message = <Message>{};
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }

  ngOnInit() {
    this.teamList = Teams;

    this.message.content="123";
    this.message.team= TeamsList.pop();
    this.message.type= 'joinTeam';
  }

  sendMsg() {
    this.router.navigate(['/lobby'])
  }
}
