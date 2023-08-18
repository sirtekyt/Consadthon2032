import { Component, OnDestroy } from '@angular/core';
import {Router} from "@angular/router";
import {WebsocketService} from "./services/websocket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [WebsocketService]
})

export class AppComponent implements OnDestroy{
  constructor(private socketService: WebsocketService) {
  }

  ngOnDestroy(): void {
    this.socketService.disconnect();
  }
}
