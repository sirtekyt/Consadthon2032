import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Player} from "../player-item";
import {TeamsList} from "../teams-list";
import {WebsocketService} from "../services/websocket.service";
import {async, Observable} from "rxjs";

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  players: Player[] = [];

  constructor(private ioService: WebsocketService) {
  }

  ngOnInit() {
    this.ioService.getStartGameMessage();

    this.players = [
      { name: 'Player 1', progress: 40 },
      { name: 'Player 2', progress: 70 },
      { name: 'Player 3', progress: 20 }
      // ... add more players as needed
    ];
  }
}
