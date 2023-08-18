import { Component } from '@angular/core';
import { WebsocketService } from "./services/websocket.service";
import { Message } from "./message";
import {Router} from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [WebsocketService]
})

export class AppComponent {
  title = 'socketrv';
  content = '';
  received = [];
  sent = [];
  message: Message;

  constructor(private WebsocketService: WebsocketService) {
    WebsocketService.messages.subscribe(msg => {
      this.received.push(msg);
      console.log("Response from websocket: " + JSON.stringify(msg.team));
    });
  }

  sendMsg() {
    this.message.source = 'localhost';
    this.message.content = this.content;
    this.sent.push(this.message);
    this.WebsocketService.messages.next(this.message);
  }
}
