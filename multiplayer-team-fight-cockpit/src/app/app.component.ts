import {Component, OnInit} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Message} from "./Message";
import {TeamParam, Teams, TeamsList} from "./team-list";  // Import the socket.io-client library

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  formattedTime = '00:30';
  timerInterval: any;
  socket: Socket;
  data: Message;
  progressBarValue;
  teams;

  constructor() {
    this.socket = io('http://localhost:6969');

    this.data = <Message> {};

    this.teams=Teams;

    this.progressBarValue = 0;

  }


  startGameBtn() {
    this.data.source = "localhost";
    this.data.type = "gameStart";
    this.socket.send(this.data);


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
    this.socket.on('teamScoreUpdate', (data) => {

      const teamIdToUpdate = data.length - 1;
      const updatedTeam = this.teams.find((team) => team.id === teamIdToUpdate);

      if (updatedTeam) {
        // Update the team's progress
        updatedTeam.progress = data[teamIdToUpdate].score;
        this.progressBarValue = updatedTeam.progress;
        console.log(updatedTeam);
      }
    });
  }

}
