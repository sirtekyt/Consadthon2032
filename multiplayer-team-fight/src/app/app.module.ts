import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SocketIoModule, SocketIoConfig } from "ngx-socket-io";
import { FormsModule } from '@angular/forms';
import { StartComponent } from './start/start.component';
import { EndComponent } from './end/end.component';
import { GameComponent } from './game/game.component';
import { ResultsComponent } from './results/results.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ClickButtonComponent } from './game/click-button/click-button.component';
import {DropdownModule} from "primeng/dropdown";
import { LobbyComponent } from './lobby/lobby.component';
import {ChipModule} from "primeng/chip";

const config: SocketIoConfig = {url: 'http://localhost:3000', options: {}}
@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    EndComponent,
    GameComponent,
    ResultsComponent,
    ClickButtonComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SocketIoModule.forRoot(config),
    DropdownModule,
    ChipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
