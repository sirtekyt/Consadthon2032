import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {TeamsList} from "../teams-list";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  teamList: TeamsList;
  constructor(private router: Router) {
  }
}
