import { Component } from '@angular/core';
import {WebsocketService} from "./websocket.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'multiplayer-team-fight-cockpit';
  formattedTime = '00:00'; // Initialize the timer display

  constructor(private websocketService: WebsocketService) {}

  startTimer() {
    this.websocketService.sendMessage({ type: 'startTimer' }); // Send start timer message
  }

  stopTimer() {
    this.websocketService.sendMessage({ type: 'stopTimer' }); // Send stop timer message
  }

  ngOnInit() {
    // Subscribe to WebSocket messages
    this.websocketService.connect().subscribe(
      message => {
        const parsedMessage = JSON.parse(message.data);

        if (parsedMessage.type === 'timerUpdate') {
          this.formattedTime = this.formatTime(parsedMessage.time);
        } else if (parsedMessage.type === 'timerStopped') {
          this.formattedTime = 'Timer stopped';
        }

        // ... handle other message types
      },
      error => {
        console.error('WebSocket error:', error);
      }
    );
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
}
