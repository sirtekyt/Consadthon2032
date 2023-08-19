import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ProgressBarModule} from "primeng/progressbar";
import { ToastModule } from 'primeng/toast';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { WinnersComponent } from './winners/winners.component';

@NgModule({
  declarations: [
    AppComponent,
    WinnersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ProgressBarModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
