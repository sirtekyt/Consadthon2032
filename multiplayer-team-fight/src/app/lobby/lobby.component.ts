import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Player} from "../player-item";
import {TeamsList} from "../teams-list";
import {WebsocketService} from "../services/websocket.service";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  items: Player[];
  @Input() playerDetails;

  constructor(private ioService: WebsocketService) {
  }
  ngOnInit() {
    // test users
    this.items = [{username: 'xasd', team: TeamsList.at(2)},
      {username: 'asdasdasda', team: TeamsList.at(1)},
      {username: '123123', team: TeamsList.at(4)}]

    this.ioService.getNewPlayersForLobby();
  }

}
