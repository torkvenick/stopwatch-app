import { ButtonServices } from './../services/buttons.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ButtonServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
