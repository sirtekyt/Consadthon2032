import {Component, OnInit} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Message} from "./Message";  // Import the socket.io-client library

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formattedTime = '00:30';
  timerInterval: any;
  socket: Socket;

  constructor() {
    this.socket = io('http://localhost:6969');

    this.socket.on('gameStart', (data: Message) => {
      // this.startTimer();
      data.source = "localhost";
      data.type = "gameStart";
      this.socket.send(data);

    });
  }

  startTimer() {
    let timeInSeconds = 30; // Initial time in seconds
    this.formattedTime = this.formatTime(timeInSeconds);

    this.timerInterval = setInterval(() => {
      timeInSeconds--;

      if (timeInSeconds <= 0) {
        clearInterval(this.timerInterval);
        this.formattedTime = '00:00';
      } else {
        this.formattedTime = this.formatTime(timeInSeconds);
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
  }

  formatTime(timeInSeconds: number): string {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  ngOnInit() {
  }

}
