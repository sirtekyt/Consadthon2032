import {Injectable} from "@angular/core";
import {Observable, Observer} from 'rxjs';
import {AnonymousSubject} from 'rxjs/internal/Subject';
import {Subject} from 'rxjs';
import {Message} from "../message";
import {io, Socket} from 'socket.io-client';


@Injectable()
export class WebsocketService {
  public messages: Subject<Message>;
  private socket: Socket;

  constructor() {
    this.messages = new Subject<Message>();

    this.socket = io('http://localhost:6969');
  }

  disconnect(): void {
    this.socket.close();
  }
}
