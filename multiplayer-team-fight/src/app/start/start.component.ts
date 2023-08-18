import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TeamParam, Teams} from "../teams-list";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  teamList: any[] | undefined;
  selectedTeam: TeamParam;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.teamList = Teams;
  }
}
