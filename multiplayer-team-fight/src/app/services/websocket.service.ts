import { Injectable } from "@angular/core";
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import {Message} from "../message";

const CHAT_URL = "ws://localhost:5000";

export interface teams {
  A: any[];
  B: any[];
  C: any[];
}

@Injectable()
export class WebsocketService {
  private subject: AnonymousSubject<MessageEvent>;
  public messages: Subject<Message>;

  constructor() {
    this.messages = new Subject<Message>();
    this.connect(CHAT_URL);
  }

  private connect(url): void {
    if (!this.subject || this.subject.closed) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
    }
  }

  private create(url): AnonymousSubject<MessageEvent> {
    let ws = new WebSocket(url);
    let observable = new Observable((obs: Observer<any>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return () => {
        ws.close();
      };
    });
    let observer = {
      error: (err: any) => {
        console.error(`WebSocket error: ${err.content}`, err.error );
      },
      complete: () => {
        console.log('WebSocket connection closed.');
      },
      next: (data: any) => {
        console.log('Message sent to websocket: ', data);
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return new AnonymousSubject<MessageEvent<any>>(observer, observable);
  }
}
