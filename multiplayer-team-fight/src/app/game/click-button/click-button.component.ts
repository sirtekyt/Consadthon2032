import { Component } from '@angular/core';
import {WebsocketService} from "../../services/websocket.service";
import {PlayerDataService} from "../../services/player.service";

@Component({
  selector: 'app-click-button',
  templateUrl: './click-button.component.html',
  styleUrls: ['./click-button.component.css']
})
export class ClickButtonComponent {
  clickCount: number = 0;

  constructor(private webSocketService: WebsocketService,
              private player: PlayerDataService) {
  }

  handleButtonClick() {
    this.clickCount++;
    if (this.clickCount % 10 === 0) {
      this.webSocketService.sendClick(this.clickCount);
    }
  }
}
