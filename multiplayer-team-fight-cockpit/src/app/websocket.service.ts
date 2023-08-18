import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket;
  private readonly url = 'ws://localhost:5000'; // Replace with your WebSocket server URL

  constructor() {}

  connect(): Observable<MessageEvent> {
    this.socket = new WebSocket(this.url);

    return new Observable((observer: Observer<MessageEvent>) => {
      this.socket.onmessage = event => {
        observer.next(event);
      };

      this.socket.onerror = event => {
        observer.error(event);
      };

      this.socket.onclose = () => {
        observer.complete();
      };
    });
  }

  sendMessage(message: any) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }
}
