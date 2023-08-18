import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EndComponent } from './end/end.component';
import { StartComponent } from './start/start.component';
import { GameComponent } from './game/game.component';
import {CockpitComponent} from "./cockpit/cockpit.component";
import {LobbyComponent} from "./lobby/lobby.component";

const routes: Routes = [
  { path: 'game-over', component: EndComponent },
  { path: 'game-start', component: StartComponent },
  { path: 'lobby', component: LobbyComponent },
  { path: 'game', component: GameComponent },
  { path: 'cockpit', component: CockpitComponent},
  { path: '', redirectTo: 'game-start', pathMatch: 'full' }, // Default route
  // ...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
