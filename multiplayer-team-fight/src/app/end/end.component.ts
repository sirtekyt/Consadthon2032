import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent {
  constructor(private router:Router) {
  }
  restartGame(){

  }
}
