import {Injectable} from "@angular/core";
import {Subject} from 'rxjs';
import {Message} from "../message";
import {io, Socket} from 'socket.io-client';
import { Router } from '@angular/router';

@Injectable()
export class WebsocketService {
  public messages: Subject<Message>;
  private socket: Socket;

  constructor(private router:Router) {
    this.messages = new Subject<Message>();

    this.socket = io('http://localhost:6969');
  }

  sendStartMessage(data: Message): void {
    this.socket.send(data);
  }

  getStartMessage() {
    this.socket.on('startGame', (result) => {

      console.log(JSON.stringify(result.result));
      console.log(result);
      if (result.result === 1) {
        // Redirect to 'lobby' route
        this.router.navigate(['/lobby']);
      }
    });
  }

  getNewPlayersForLobby() {
    return this.socket.on('updatePlayers', (result) => {

      // TODO: lobby players view
      // this.items$.subscribe(items => this.itemsPool.push(result));
    });
  }

  disconnect(): void {
    this.socket.close();
  }
}
