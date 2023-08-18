import {Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TeamParam, Teams, TeamsList} from "../teams-list";
import {Message} from "../message";
import {WebsocketService} from "../services/websocket.service";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {
  teamList: any[] | undefined;
  selectedTeam: TeamParam;
  username: string='';
  content = '';
  message: Message;

  constructor(private router: Router,
              private socketService: WebsocketService
              ) {
    this.message = <Message>{};
  }

  ngOnInit() {
    this.teamList = Teams;
  }

  async sendMsg() {
    this.message.username=this.username;
    this.message.team= this.selectedTeam;
    this.message.type= 'joinTeam';
    this.socketService.sendStartMessage(this.message);
    await this.socketService.getStartMessage();
  }
}
