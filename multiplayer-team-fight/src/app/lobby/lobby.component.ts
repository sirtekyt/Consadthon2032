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
export class LobbyComponent {

  constructor(private ioService: WebsocketService) {
  }
}
