import { Component, OnInit } from '@angular/core';
import { io, Socket } from 'socket.io-client';  // Import the socket.io-client library

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'multiplayer-team-fight-cockpit';
  formattedTime = '00:30'; // Initialize the timer display to 30 seconds
  timerInterval: any; // Variable to hold the interval reference
  socket: any; // Socket instance

  constructor() {
    // Connect to the WebSocket server
    this.socket = io('http://localhost:6969');

    // Listen for the 'startGame' event from the server
    this.socket.on('startGame', (data: any) => {
      if (data.result === 1) {
        this.startTimer();
      }
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

  ngOnInit() {}

}
