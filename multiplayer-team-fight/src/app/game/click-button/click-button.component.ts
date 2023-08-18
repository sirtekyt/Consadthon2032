import { Component } from '@angular/core';

@Component({
  selector: 'app-click-button',
  templateUrl: './click-button.component.html',
  styleUrls: ['./click-button.component.css']
})
export class ClickButtonComponent {
  clickCount: number = 0;

  handleButtonClick() {
    this.clickCount++;
  }
}
