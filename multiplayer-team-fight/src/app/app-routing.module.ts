import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EndComponent} from "./end/end.component";

const routes: Routes = [
  { path: 'game-over', component: EndComponent },
  // ...
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
