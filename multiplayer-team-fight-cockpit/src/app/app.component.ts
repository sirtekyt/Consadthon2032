import {Component, OnInit} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Message} from "./Message";
import {Teams} from "./team-list";  // Import the socket.io-client library

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  socket: Socket;
  data: Message;
  progressBarValue;
  teams;
  gameEnd: boolean;
  winnersTeamName: string;
  players: any[];

  constructor() {
    this.socket = io('http://localhost:6969');

    this.data = <Message>{};

    this.teams = Teams;

    this.progressBarValue = 0;

    this.gameEnd = false;

  }

  startGameBtn() {
    this.data.source = "localhost";
    this.data.type = "gameStart";
    this.socket.send(this.data);
  }

  ngOnInit() {
    this.socket.on('teamScoreUpdate', (data) => {
      const updatedTeam = this.teams.find((team) => team.id === data.teamId);

      if (updatedTeam) {
        updatedTeam.progress = data.teams[data.teamId].score;
        this.progressBarValue = updatedTeam.progress;
      }
    });

    this.socket.on('endGame', (data) => {
      console.log(data);
      this.gameEnd = true;
      this.winnersTeamName = Teams.find((team) => team.id === data.teamId).name;
      this.players = data.team.players;
    });
  }

}
